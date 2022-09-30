import {Routes, Route} from "react-router-dom"
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Single from "./pages/Single";
import Write from "./pages/Write";
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import "./style.scss"

// put the children between nevbar and footer as a standard layout
const Layout = ({ children }) => {
  return (
    <>
    <Navbar />
    {children}
    <Footer />
    </>
  )
}

function App() {
  return (
    <div className="app">
    <div className="container">
    <Routes>
        <Route path="/" exact element={<Layout children={<Home />} />}/>
        <Route path="/login" exact element={<Login />}/>
        <Route path="/register" exact element={<Register />}/>
        <Route path="/post/:id" exact element={<Layout children={<Single />} />}/>
        <Route path="/write" exact element={<Layout children={<Write />} />}/>
    </Routes>
    </div>
    </div>
  );
}

export default App;
