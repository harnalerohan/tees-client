import React, {useState} from 'react'
import Base from "../core/Base";
import {Link} from "react-router-dom";
import UserService from "../auth/helper"



const Signup = () => {

  const [values,setValues] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    error: "",
    success: false
  });

  const {name, email, password, contact, error, success} = values;

  const handleChange = name => (e) => {
    setValues({...values, error: false, [name]: e.target.value})
  }

  const onSubmit = (e) => {
    e.preventDefault();

    setValues({...values, error: false, })
    UserService.signup({name, email, password, contact})
    .then(data => {
      if(data.error){
        setValues({...values, error: data.error, success: false})
      }else{
        setValues({
          ...values, 
          name: "",
          email: "",
          password: "",
          contact: "",
          error: "",
          success: true
        })
      }
    })
    .catch(err => {
      console.log(err)
      setValues({...values, error:"cannot reach server - 404", success: false})
    })
  }

  const signUpForm = () => {
    return(
      <div className="container">
        <div className="text-left">
          <form>

            <div className="form-group">
              <label className="text-light form-label">Name</label>
              <input value = {name} className="form-control" onChange = {handleChange("name")} type="text"/>
            </div>

            <div className="form-group mt-3">
              <label className="text-light form-label">Email</label>
              <input value = {email} className="form-control" onChange = {handleChange("email")} type="email"/>
            </div>

            <div className="form-group mt-3">
              <label className="text-light form-label">Password</label>
              <input value = {password} className="form-control" onChange = {handleChange("password")} type="password"/>
            </div>

            {/* <div className="form-group mt-3"> */}
              <label className="text-light form-label">Contact</label>
              <input required value = {contact} className="form-control" onChange = {handleChange("contact")} type="number"/>
            {/* </div> */}

            <button type="submit" onClick = {onSubmit} className="btn btn-success col-12 mt-4">Submit</button>

          </form>
        </div>
      </div>
    )
  }

  const successMessage = () => {
    return(
    <div className="row">
    <div className="col-md-6 offset-sm-3 text-left">
    <div className="alert alert-success" style = {{display:success ? "" : "none"}}>
      New Account was created succesfully. Please login 
      <Link to = "/signin"> here</Link>
    </div>
    </div> 
    </div> 
    )
  }

  const errorMessage = () => {
    return(
    <div className="row">
    <div className="col-md-6 offset-sm-3 text-left">
    <div className="alert alert-danger" style = {{display: error ? "" : "none"}}>
      {error}.
    </div>
    </div>
    </div>
    )
  }
  
  return (
    <Base title = "Sign up page" description = "A page for user to sign up">
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
    </Base>
  );
};

export default Signup

