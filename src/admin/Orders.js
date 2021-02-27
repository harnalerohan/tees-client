import React, {useState, useEffect} from 'react'
import UserService from '../auth/helper'
import Base from '../core/Base'
import { getAllOrders, cancelOrder } from '../core/helper/orderHelper'

const Orders = () => {

  const {user, token} = UserService.isAuthenticated();
  const [orders, setOrders] = useState([])
  const [error, setError] = useState("")

  const preload = () => {
    getAllOrders(user._id, token).then(data => {
      if(data.error){
        setError(data.error)
        console.log(data.error)
      }else{
        console.log(data)
        setOrders(data)
      }
    }).catch(err => console.log(err))
  }

  useEffect(() => {
    preload()
  }, [])

  const cancelTheOrder = (order) => {
    cancelOrder(user._id, token, order).then(data => {
      if(data.error){
        setError(data.error)
        console.log(data.error)
      }else{
        console.log(data)
        preload()
      }
    }).catch(err => console.log(err))
  }


  const userDetailsCard = (order) => {
    return(
      <div className="card text-dark">
        <div className="card-header">
          User Details
        </div>
        <ul className="list-group">
          <li className="list-group-item">
            User Name: {order.user.name}
          </li>
          <li className="list-group-item">
            User ID: {order.user._id}
          </li>
        </ul>
      </div>
    )
  }

  const paymentDetailsCard = (order) => {
    return(
      <div className="card text-dark mt-3">
      <div className="card-header">
        Payment Details
      </div>
      <ul className="list-group">
        <li className="list-group-item">
          Total Bill: {order.amount}
        </li>
        <li className="list-group-item">
          Transaction ID: {order.transaction_id}
        </li>
      </ul>                 
      </div>
    )
  }

  const bottomButtonRow = (order) => {
    return(
      <div className = "row mt-3">
      <div className="col-3">
      <button className={order.status === "Received" ? "disabled btn btn-block bg-warning" : "btn btn-block bg-danger"}>[Status: {order.status}]</button>
      </div>
      <div className="col-3">

      </div>
      <div className="col-3">

      </div>
      <div className="col-3">
      <button onClick={() => cancelTheOrder(order)} className="btn btn-block btn-danger">Cancel This order</button>
      </div>
    </div>
    )
  }


  return (
    <Base title="All Orders" description="This is where admin can manage and check all orders">
      {orders.map((order, i) => {
        return(
          <div key={i} className="card m-3 text-dark">
            <div className="card-header">
              Order Id : {order._id }
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-6">
                  <div className="card text-dark">
                    <div className="card-header">
                      Purchases
                    </div>
                    {order.products.map((product, i) => {
                      return(
                        <div key={i}>
                          <ul className="list-group">
                            <li className="list-group-item">{product.name}</li>
                          </ul>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* second card */}
                <div className="col-6">

                  {userDetailsCard(order)}
                  {paymentDetailsCard(order)}
                </div>
              </div>

              {/* //second card ends */}
                {bottomButtonRow(order)}
            </div>
          </div>
        )
      })}
    </Base>
  )
}

export default Orders