import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {AuthContext} from "../context/authContext"

const Login = () => {
  const [showPW, setShowPW] = React.useState(false)
  const [inputs, setInputs] = React.useState({
    username: '',
    password: ''
  })

  const [err,setErr] = React.useState({
    status: false,
    msg: null
  })

  const navigate = useNavigate()

  const {currentUser, login} = React.useContext(AuthContext)

  const handleChange = (e) => {
    setInputs((prev) => ({...prev, [e.target.name]: e.target.value}))
    setErr({
      status: false,
      msg: null
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    try{
      login(inputs)
      navigate("/")
    }catch(err){
      console.log(err)
      setErr({
        status: true,
        msg: err.response.data
      })
    }
  }
  return (
    <div className='auth'>
      <h1>Login</h1>
      <form action="">
        <input type="text" placeholder='usuário' name="username" onChange={handleChange}/>
        <input type={showPW? "text" : "password"} name="password" placeholder='senha' onChange={handleChange}/>
        <div className="bottom">
          <div className="inner">
          <span>mostrar senha</span>
          <input type="checkbox" onChange={() => setShowPW(!showPW)}/>
          </div>
        <button onClick={handleSubmit}>Login</button>
        </div>
        {err.status && <span className="error">{err.response.data}</span>}
        {/* 
        <Link to="/register" className="link">Cadastre-se</Link>
        */}
      </form>
    </div>
  )
}

export default Login