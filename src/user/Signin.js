import React, {useState} from 'react'
import Base from "../core/Base";
import {Link, Redirect} from "react-router-dom";

import UserService from "../auth/helper" 


const Signin = () => {

  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false
  })

  const {email, password, error, loading, didRedirect} = values;
  const {user} = UserService.isAuthenticated()

  const handleChange = name => (e) => {
    // console.log(e.target)
    setValues({...values, error: false, [name]: e.target.value})
  }

  const onSubmit = (e) =>{
    e.preventDefault();

    setValues({...values, error: false, loading: true})
    UserService.signin({email, password})
      .then(data => {
        console.log(data.error)
        if(data.error){
          setValues({...values, error: data.error, loading: false})
        }else {
          UserService.authenticate(data, () => {
          console.log(data)
          setValues({...values, didRedirect: true})
          
        })
      }
      })
      .catch((err) => {
        setValues({...values, loading:false, error:"Cannot reach to server - 404"})
        console.log(err)
      })
  }

  const performRedirect = () => {
    if(didRedirect){
      if(user && user.role === 1){
        return <Redirect to="/admin/dashboard" />
      }else{
        return <Redirect to="/user/dashboard" />
      }
    }
    if (UserService.isAuthenticated()){
      return <Redirect to="/" />
    }
  }

  const loadingMessage = () => {
    return(
      loading && (
        <div className="alert alert-info">
          <h2>Loading.....</h2>
        </div>
      )
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

  const signInForm = () => {
    return(
        <div className="container">
        <div className="text-left">
          <form action="">

            <div className="form-group mt-3">
              <label className="text-light form-label">Email</label>
              <input value={email} onChange={handleChange("email")} className="form-control" type="email"/>
            </div>

            <div className="form-group mt-3">
              <label className="text-light form-label">Password</label>
              <input value={password} onChange={handleChange("password")} className="form-control" type="password"/>
            </div>

            <button onClick={onSubmit} className="btn btn-success col-12 mt-4 mb-5">Submit</button>

          </form>
        </div>
        </div>
    )
  }

  return (
    <Base title = "Sign In Page" description = "A page for user to sign In" className="container">
      {loadingMessage()}
      {signInForm()}
      {errorMessage()}
      {performRedirect()}
      {/* <p>{JSON.stringify(values)}</p> */}
    </Base>
  )
}

export default Signin
