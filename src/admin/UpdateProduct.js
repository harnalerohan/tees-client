import React, {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import UserService from '../auth/helper';
import Base from '../core/Base';
import {getCategories, getProduct, updateProduct } from './helper/adminapicall';



const UpdateProduct = () => {
  const {user, token} = UserService.isAuthenticated();
  const {productId} = useParams()

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getRedirect: false,
    formData: ""
  });

  const {
    name, 
    description, 
    price, 
    stock, 
    categories, 
    category,
    loading, 
    error, 
    createdProduct, 
    getRedirect, 
    formData
  } = values

  const preload = () => {
    getProduct(productId).then(data => {
      console.log(data)
      if(data.error){
        setValues({...values, error: data.error})
      }else{

        preloadCategories();
        setValues({
          ...values, 
          name: data.name, 
          description: data.description, 
          price: data.price, 
          category:data.category._id,
          stock: data.stock,
          formData: new FormData(),
        })
      }
    })
  }

  const preloadCategories = () => {
    getCategories().then(data => {
      if(data.error){
        setValues({...values, error: data.error})
      }else{
        console.log(data)
        setValues({
          categories: data,
          formData: new FormData()
        })
      }
    })
  }

  useEffect(() => {
    preload()
  }, [])

  const onUpdate = (e) => {
    e.preventDefault();
    setValues({...values, error: "", loading: true})

    updateProduct(productId, user._id, token, formData)
      .then(data => {
        if(data.error){
          setValues({...values, error: data.error})
        }else{
          setValues({
            ...values,
            name:"",
            description: "",
            price: "",
            photo: "",
            stock: "",
            loading: false,
            createdProduct: data.name
          })
          console.log(values)
        }
      })
  }

  const handleChange = name => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value

    formData.set(name, value);

    setValues({...values, [name]: value})
  }

  const successMessage = () => (
    <div 
      className="alert alert-success mt-3" 
      style = {{display : createdProduct ? "" : "none"}}
    >
      <h4>{createdProduct} updated succesfully</h4>
    </div>
  )

  const errorMessage = () => (
    <div 
      className="alert alert-success mt-3" 
      style = {{display : error ? "" : "none"}}
    >
      <h4>Failed with error: {error}</h4>
    </div>
  )


  const createProductForm = () => (
    <form >
      <span>Post photo</span>
      <div className="mb-3">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="mb-3">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="mb-3">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="mb-3">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="mb-3">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          {categories && 
            categories.map((cate, index) => {
              return(
                <option key={index} value={cate._id}>{cate.name}</option>
              )
            })
          }
        </select>
      </div>
      <div className="mb-3">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={stock}
        />
      </div>
      
      <button type="submit" onClick={onUpdate} className="btn btn-outline-success mb-3">
        Update Product
      </button>
    </form>
  );

  return (
    <Base title="Add a product here" description="Welcome to product creation section" className="container bg-info p-4">
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">Admin Home</Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {errorMessage()}
          {createProductForm()}
        </div>
      </div>
    </Base>
  )
}

export default UpdateProduct
