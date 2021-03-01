import React, {useState, useEffect} from 'react'
import { Redirect } from 'react-router-dom';
import { addItemToCart, removeItemFromCart} from './helper/cartHelper';
import { getProducts } from './helper/coreapicalls';
import ImageHelper from './helper/ImageHelper';

const Card = ({
  isAddToCart = true, 
  isRemoveFromCart = false, 
  product, 
  setReload = (f) => f,
  reload = undefined,
  setAddedToCart = (f) => f
}) => {

  const [count, setcount] = useState(product.count)

  const cartTittle = product ? product.name : "A photo from pexels"
  const cartDescription = product ? product.description : "A photo from pexels"
  const cartPrice = product ? product.price : "Default"

  const addToCart = () => {
    addItemToCart(product, () => {
      setAddedToCart(true)
      setTime()
    })
  }

  const setTime = () => {
    setTimeout(() => {
      setAddedToCart(false)
    }, 1000);
  }

  removeItemFromCart((productId) => {
      console.log("Hello")
  })

  const showAddToCart = () => {
    return(
  <div className="col-12">
    <button
      onClick={addToCart}
      className="btn btn-block btn-outline-success mt-2 mb-2"
    >
      Add to Cart
    </button>
  </div>
    )
  }

  const showRemoveFromCart = () => {
    return(
      <div className="col-12">
      <button
        onClick={
          () => {removeItemFromCart(product._id)
          setReload(!reload)
        }}
        className="btn btn-block btn-outline-danger mt-2 mb-2"
      >
        Remove from cart
      </button>
    </div>
    )
  }

  return (
    <div className="card text-white bg-dark border border-info ">
      <div className="card-header lead">{cartTittle}</div>
      <div className="card-body">
        <ImageHelper product={product}/>
        <p className="lead bg-success font-weight-normal text-wrap">
          {cartDescription}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">₹ {cartPrice}</p>
        <div className="row">
          {isAddToCart ? showAddToCart() : ""}
          {isRemoveFromCart ? showRemoveFromCart() : ""}
        </div>
      </div>
    </div>
  );
};

export default Card
