import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { itemsInCart, cartEmpty } from './helper/cartHelper';
import { getMeToken, processPayment} from './helper/paymentHelper';
import {createOrder} from "./helper/orderHelper"
import UserService from '../auth/helper';
import DropIn from "braintree-web-drop-in-react"


const Payment = ({products, setReload = (f) => f, reload = undefined}) => {

  const [info, setinfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: ""
  })

  const contact = UserService.isAuthenticated().user.contact
  const userId = UserService.isAuthenticated().user._id
  const token = UserService.isAuthenticated().token

  const getToken = () => {
    getMeToken(userId, token).then(info => {
      if(info){
        setinfo({
          ...info,
          error: info.error
        })
      }else{
        const clientToken = info.clientToken
        setinfo({clientToken})
      }
    }).catch(err => {
      console.log(err)
    }) 
  }

  const showBrainTree = () => {
    return(
      <div>
        {info.clientToken !== null && products.length > 0 ? (
        <div>
          <DropIn
            options={{ authorization: info.clientToken }}
            onInstance={(instance) => (info.instance = instance)}
          />
          <button className="btn btn-block btn-success" onClick={() => {onPurchase()}}>Buy</button>
        </div>
        ) : (
          <h3>Please login or add some items in cart</h3>
        )}
      </div>
    )
  }

  useEffect(() => {
    getToken()
  },[])

  const onPurchase = () => {
    setinfo({loading: true})
    let nonce;
    let getnonce = info.instance
    .requestPaymentMethod()
    .then(data => {
      nonce = data.nonce
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getAmount()
      }
      processPayment(userId, token, paymentData)
      .then(response => {

        setinfo({...info, success: response.success, loading: false})

        console.log("PAYMENT SUCCESS")

        const orderData = {
          products: products,
          transaction_id: response.transaction.id,
          amount: response.transaction.amount
        }

        createOrder(userId, token, orderData);

        cartEmpty(() => {
          console.log("did we got a crash?");
        })

        //TODO: force reload
        setReload(!reload);
      })
      .catch(err => {
        setinfo({loading: false, success: false})
        console.log("PAYMENT FAILED", err)
      });
    });
  };

  const getAmount = () => {
    let amount = 0
    products.map((product) => {
      amount = amount + product.price
    })
    return amount
  }

  return (
    <div className="">
      <h3>Your bill is {getAmount()}</h3>
      {showBrainTree()}
    </div>
  )
}

export default Payment
