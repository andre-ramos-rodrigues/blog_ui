import React from 'react'
import Logo from "../img/smile.png"
import {Link, useNavigate} from "react-router-dom"
import {AuthContext} from "../context/authContext"

const Navbar = () => {
  const navigate = useNavigate()

const {currentUser, logout} = React.useContext(AuthContext)

  const Logout = () => {
    logout()
    navigate("/")
  }

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <img src={Logo} alt="logo" onClick={() =>{navigate("/")}}/>
        </div>
        <div className="links">
          <Link className="link" to="/?cat=festa"><h6>FESTAS</h6></Link>
          <Link className="link" to="/?cat=reuniao"><h6>REUNIÕES</h6></Link>
          <Link className="link" to="/?cat=evento"><h6>EVENTOS</h6></Link>
          <Link className="link" to="/?cat=diretoria"><h6>DIRETORIA</h6></Link>  
          <Link className="link" to="/?cat=novidade"><h6>NOVIDADES</h6></Link>
          <div className="userOptions">
            {currentUser && <span>{currentUser.username}</span>}
            {currentUser ? <span onClick={Logout}>Logout</span> : <Link to="/login" className="link">Login</Link>}
          </div>
          
          {currentUser && (
            <Link className="link" to="/write">
            <span className="writeBtn">
              Escrever
            </span>
          </Link>
          )}
          
        </div>
      </div>
    </div>
  )
}

export default Navbar