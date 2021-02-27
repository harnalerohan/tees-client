import React from 'react'
import Menu from './Menu'
import "../styles.css"



const Base = ({
  title = "My Title",
  description = "My description",
  className = "custom bg-dark text-white p-4 pb-6",
  children
}) => {
  return (
  <div>
    <Menu/>
    <div className="container-fluid">
      <div className= "jumbotron bg-dark text-white text-center pb-3 pt-5">
        <h2 className = "display-5">{title}</h2>
        <p className = "lead">{description}</p>
      </div>

      <div className = {className}>{children}</div>

    </div>
      <footer className="footer bg-dark mt-auto py-3">
        <div className = "container-fluid bg-success text-white text-center py-3">
          <h4>If You got any questions, feel free to reach out!</h4>
          <button className = "btn btn-warning btn-lg">Contact Us</button>
        </div>
        <div className = "container">
          <span className = "text-muted">App created with<span className="text-white"> React </span>By <span className="text-white"> Rohan </span></span>
        </div>
      </footer>
  </div>
  )
}

export default Base
