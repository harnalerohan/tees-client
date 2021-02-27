import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import UserService from '../auth/helper'
import Base from '../core/Base'
import { createCategory } from './helper/adminapicall'

const AddCategory = () => {

  const [name, setName] = useState("")
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const {user, token} = UserService.isAuthenticated();

  const goBack = () => (
    <div className="mt-5">
      <Link to="/admin/dashboard" className="btn btn-sm btn-success mb-3">Admin Home</Link>
    </div>
  )
  const handleChange = (e) => {
    setError("")
    setName(e.target.value)
  }

  const onClick = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false)

    //backend request fired
    createCategory(user._id, token, {name})
      .then(data => {
        if(data.error){
          setError(data.error)
        }else{
          setError("")
          setSuccess(true)
          setName("")
        }
      }).catch(err => console.log(err))
  };

  const successMessage = () => {
    if(success){
      return <h4 className="text-success">Category created succesfully</h4>
    }
  }

  const warningMessage = () => {
    if(error){
      return <h4 className="text-warning">Failed to create category</h4>
    }
  }

  const categoryForm = () => (
    <form>
      <div className="form-group">
        <label className="lead">Category Name:</label>
        <input 
          value={name} 
          onChange={handleChange} 
          type="text" 
          autoFocus
          required
          className="form-control my-3"
          placeholder="For Ex. Summer"
        />
      <button 
        className="btn btn-outline-info text-dark" 
        onClick={onClick}>Create Category</button>
      </div>
    </form>
  )

  return (
    <Base 
      title="Create category here" 
      description="Add new category for t-shirts" 
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {warningMessage()}
          {categoryForm()} 
          {goBack()}
        </div>
      </div>
    </Base>
  )
}

export default AddCategory
