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
        <div className="col-md-6">
          {cartItems.length > 0 ? loadAllProducts() : (<h3>No products in cart</h3>)}
        </div>
        <div className="col-md-6">
          <Payment products = {cartItems} setReload={setReload}/>

          <div className="card mt-5 text-dark" style={{textAlign:'left'}}>
            <div className="card-header">
              <h4>Card Details</h4>
              <h6 class="card-subtitle mb-2 text-muted">(For testing purpose)</h6>
            </div>
            <div className="card-body">
              <ul className="list-group">
                <li className="list-group-item">Card Number: 36259600000004</li>
                <li className="list-group-item">Expiry Date: 12/26</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Base>
  )
}

export default Cart
