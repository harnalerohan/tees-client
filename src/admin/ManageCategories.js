import React, {useState, useEffect} from 'react'
import Base from '../core/Base'
import {getCategories, deleteCategory} from "./helper/adminapicall"
import {Link} from "react-router-dom"
import UserService from "../auth/helper/index"


const ManageCategories = () => {

  const [categories, setCategories] = useState([])
  const {user, token} = UserService.isAuthenticated()

  const preload = () => {
    getCategories().then(data => {
      if(data.error){
        console.log(data.error)
      }else{
        setCategories(data)
      }
    }).catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    preload()
  }, [])

  const deleteThisCategory = (categoryId) => {
    deleteCategory(categoryId, token, user._id).then(data => {
      if(data.error){
        console.log(data.error)
      }else{
        preload()
      }
    })
  }

  return (
    <Base title="Welcome admin" description="Manage products here">
      <h2 className="mb-4">All products:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">Total {categories.length} categories</h2>
          {categories.map((category, index) => {
            return(
            <div key={index} className="row  text-center mb-2 ">
              <div className="col-4">
                <h3 className="text-white text-left">{category.name}</h3>
              </div>
              <div className="col-4">
                <Link
                  className="btn btn-success"
                  to={`/admin/category/update/${category._id}`}
                >
                  <span className="">Update</span>
                </Link>
              </div>
              <div className="col-4">
                <button onClick={() => {deleteThisCategory(category._id)}} className="btn btn-danger">
                  Delete
                </button>
              </div>
            </div>
            )
          })}
        </div>
      </div>
    </Base>
  )
}

export default ManageCategories
