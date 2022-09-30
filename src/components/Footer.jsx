import React from 'react'
import Logo from "../img/smile.png"

const Footer = () => {
  return (
    <div className="footer">
      <img src={Logo} alt="" />
      <span>Made with <strong>React</strong></span>
    </div>
  )
}

export default Footer