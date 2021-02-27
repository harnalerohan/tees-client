import React, {useEffect, useState} from 'react'
import "../styles.css"
import {API} from "../backend"
import Base from "./Base";
import Card from './Card';
import {getProducts} from "./helper/coreapicalls"

const Home = () => {

  const [products, setProducts] = useState([])
  const [error, setError] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false);


  const preload = () => {
    getProducts().then(data => {
      if(data.error){
        setError(data.error)
      }else{
        setProducts(data)
      }
    }).catch(err => {
      console.log(err)
    })
  }

  const showMessage = () => {
    if(addedToCart){
      return(
        <div className="alert alert-info">
          <h2>Item added to cart</h2>
        </div>
      )
    }
  }

  useEffect(() => {
    preload()
  }, [])

  return (
    <Base title="Home Page" description="Welcome to the t-shirt store">
      {showMessage()}
      <div className = "row text-center">
        <h1 className = "text-white">All of the t-shirts</h1>
        <div className = "row">
        {products.map((value, index) => {
          return(
          <div key={index} className="col-md-4 mb-4">
            <Card addToCart="true" product = {value} setAddedToCart = {setAddedToCart}/>
          </div>  
          )
        })}
        </div>
      </div>
    </Base>
  );
}

export default Home
