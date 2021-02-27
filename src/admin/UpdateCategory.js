import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import UserService from '../auth/helper'
import Base from '../core/Base'
import {updateCategory, getCategory } from './helper/adminapicall'

const UpdateCategory = () => {

  const [name, setName] = useState("")
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const {categoryId} = useParams()


  const {user, token} = UserService.isAuthenticated();

  const handleChange = (e) => {
    setError("")
    setName(e.target.value)
    console.log(name)
  }

  const onUpdate = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false)

    //backend request fired
    updateCategory(categoryId, user._id, token, {name})
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

  const preload = () => {
    getCategory(categoryId).then(data => {
      setName(data.name)
    }).catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    preload()
  }, [])

  const goBack = () => (
    <div className="mt-5">
      <Link to="/admin/dashboard" className="btn btn-sm btn-success mb-3">Admin Home</Link>
    </div>
  )

  const successMessage = () => {
    if(success){
      return <h4 className="text-success">Category created succesfully</h4>
    }
  }

  const warningMessage = () => {
    if(error){
      return <h4 className="text-warning">{error}</h4>
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
        onClick={onUpdate}>Update Category</button>
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
          <p>{name}</p>
        </div>
      </div>
    </Base>
  )
}

export default UpdateCategory
