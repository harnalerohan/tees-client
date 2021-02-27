import React, { useState, useEffect } from 'react'
import Base from '../core/Base'
import UserService from "../auth/helper/index"
import { getUserOrder } from './helper/userapicalls'

const UserDashboard = () => {

  const {user, token} = UserService.isAuthenticated()
  const [userOrders, setUserOrders] = useState([])
  const [err, setErr] = useState("")

  const preload = () => {
    getUserOrder(user._id, token).then(response => {
      if(response.error){
        setErr(err)
      }else{
        setUserOrders(response)
      }
    }).catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    preload()
  }, [])

  const userLeft = () => {
    return(
      <div className="card">
        <h5 className="card-header text-dark">
          Your Dashboard
        </h5>
        <ul className="list-group">

          <li className="list-group-item">
            <h5 className="text-dark">First Name: {user.name}</h5>
          </li>

          <li className="list-group-item">
            <h5 className="text-dark">User Id: {user._id}</h5>
          </li>

          <li className="list-group-item">
            <h5 className="text-dark">Email: {user.email}</h5>
          </li>

          <li className="list-group-item">
            <h5 className="text-dark">Contact: {user.contact}</h5>
          </li>
          
        </ul>
      </div>
    )
  }

  return (
  <Base title={"Hello " + user.name} description="This is where you can manage your profile and orders">
  <div>
  {userLeft()}
  </div>

  <div className="mt-3">
    {userOrders.length !== 0 ? (
        userOrders.map((order, i) => {
          return(
          <div key={i} className="card">
          <h5 className="card-header text-dark">
            Your Orders
          </h5>
          <ul className="list-group">
            <div className="row">
            <div className="col-md-6">
              <li className="list-group-item bg-info">
                <h5 className="text-dark">Order Id: {order._id}</h5>
              </li>
              <li className="list-group-item">
                <h5 className="text-dark">Payment Status: {order.status}</h5>
              </li>
              <li className="list-group-item">
                <h5 className="text-dark">Order Placed on: {order.createdAt}</h5>
              </li>
              <li className="list-group-item">
                <h5 className="text-dark">Contact: {order.contact}</h5>
              </li>
              <li className="list-group-item">
                <h5 className="text-dark">Total Bill: {order.amount}</h5>
              </li>
            </div>
              {/* Item Card: */}
            <div className="col-md-6">
              <li className="list-group-item bg-info">
                <h5 className="text-dark">Items:</h5>
              </li>
              {order.products.map((product, i) => {
                return(
                <li key={i} className="list-group-item">
                  <div className="row">
                    <div className="col-6">
                      <h5 className="text-dark">{product.name}</h5>
                    </div>
                    <div className="col-6">
                      <h5 className="text-dark">{product.price}</h5>
                    </div>
                  </div>
                </li>
                )
              })}
            </div>
            </div>
          </ul>
        </div>
          )
        })
    ) : (
      <h1>You dont have any orders</h1>
    )}
  </div>
  </Base>
)}

export default UserDashboard
