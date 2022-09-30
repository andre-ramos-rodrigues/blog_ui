import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const [showPW, setShowPW] = React.useState(false)
  const [inputs, setInputs] = React.useState({
    username: '',
    email: '',
    password: ''
  })

  const [err,setErr] = React.useState({
    status: false,
    msg: null
  })

  const navigate = useNavigate()

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
      await axios.post("https://afpoc-blog.herokuapp.com/api/auth/register", inputs)
      navigate("/login")
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
      <h1>Cadastrar</h1>
      <form action="">
        <input required type="text" placeholder='usuário' name="username" onChange={handleChange}/>
        <input required type="text" placeholder='email' name="email" onChange={handleChange}/>
        <input required type={showPW? "text" : "password"} name="password" placeholder='senha' onChange={handleChange}/>
        <div className="bottom">
          <div className="inner">
          <span>mostrar senha</span>
          <input type="checkbox" onChange={() => setShowPW(!showPW)}/>
          </div>
        <button onClick={handleSubmit}>Register</button>
        </div>
        {err.status && <span className="error">{err.msg}</span>}
        <Link to="/login" className="link">Login</Link>
      </form>
    </div>
  )
}

export default Register