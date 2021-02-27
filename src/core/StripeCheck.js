import React,{useState, useEffect} from 'react'
import {Link} from "react-router-dom"
import UserService from "../auth/helper/index"
import {cartEmpty, itemsInCart} from "./helper/cartHelper"

const StripeCheck = ({
  products, 
  setReload = f => f,
  reload = undefined
}) => {

  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: ""
  });

  const token = UserService.isAuthenticated() && UserService.isAuthenticated().token
  const userId = UserService.isAuthenticated() && UserService.isAuthenticated().user._id

  const getFinalPrice = () => {
    let amount = 0;
    products.map((p => {
      amount = amount + p.price
    }))

    return amount
  }

  const showStripeButton = () => {
    return UserService.isAuthenticated() ? (
      <button className="btn btn-success">
        Pay With Stripe
      </button>
    ) : (
      <Link to ="/signin">
        <button className="btn btn-warning">Sign IN</button>
      </Link>
    )
  }

  return (
    <div>
      <h3 className="text-white">Stripe{getFinalPrice()}</h3>
      {showStripeButton()}
    </div>
  )
}

export default StripeCheck
