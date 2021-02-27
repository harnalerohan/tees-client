import React, { useEffect, useState } from 'react'
import {itemsInCart} from "./helper/cartHelper"
import Base from "../core/Base"
import Card from './Card'
import Payment from './Payment'

const Cart = () => {

  const [cartItems, setCartItmes] = useState([]);
  const [reload, setReload] = useState(false)

  useEffect(() => {
    setCartItmes(itemsInCart())
  }, [reload])

  const loadAllProducts = () => {
    return(
      <div>
        <h2>This section loads all the products</h2>
        {cartItems.map((value, index) => {
          return(
          <Card 
            key = {index} 
            product = {value} 
            isAddToCart={false} 
            isRemoveFromCart={true}
            setReload={setReload}
            reload={reload}
          />
          )
        })}
      </div>
    )
  }

  return (
    <Base title="Cart" description="Check your items and pay.">
      <div className="row text-center">
        <div className="col-6">
          {cartItems.length > 0 ? loadAllProducts() : (<h3>No products in cart</h3>)}
        </div>
        <div className="col-6">
          <Payment products = {cartItems} setReload={setReload}/>
        </div>
      </div>
    </Base>
  )
}

export default Cart
