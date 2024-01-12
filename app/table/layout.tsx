import React from 'react'
import './style.css'

const layout = ({children}) => {
  return (
    <html lang="en">
    <body>
      <nav className="navbar">
      <a href="#" className="nav-logo">NES</a>
      <ul className="nav-menu">
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">Contact</a></li>
        <li><a href="#">Login</a></li>
      </ul>
      </nav>
      
      {children}
      </body>
    </html>
  )
}

export default layout
