import React from 'react'
import {BrowserRouter, Switch, Route} from "react-router-dom"
import Home from "./core/Home"
import Signup from "./user/Signup"
import Signin from "./user/Signin"
import AdminRoute from './auth/helper/AdminRoutes';
import PrivateRoute from "./auth/helper/PrivateRoutes"
import UserDashboard from './user/UserDashBoard'
import AdminDashboard from './user/AdminDashBoard'
import AddCategory from './admin/AddCategory'
import ManageCategories from './admin/ManageCategories'
import AddProduct from "./admin/AddProduct"
import ManageProducts from './admin/ManageProducts'
import UpdateProduct from './admin/UpdateProduct'
import UpdateCategory from './admin/UpdateCategory'
import Cart from "./core/Cart"
import Orders from './admin/Orders'


const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path = "/project/tees-store" exact component = {Home}/>
        <Route path = "/project/tees-store/signup" exact component = {Signup}/>
        <Route path = "/project/tees-store/signin" exact component = {Signin}/>
        <PrivateRoute path = "/project/tees-store/user/dashboard" exact component = {UserDashboard}/>
        <AdminRoute path = "/project/tees-store/admin/dashboard" exact component = {AdminDashboard}/>
        <AdminRoute path = "/project/tees-store/admin/create/category" exact component = {AddCategory}/>
        <AdminRoute path = "/project/tees-store/admin/categories" exact component = {ManageCategories}/>
        <AdminRoute path = "/project/tees-store/admin/create/product" exact component = {AddProduct}/>
        <AdminRoute path = "/project/tees-store/admin/products" exact component = {ManageProducts}/>
        <AdminRoute path = "/project/tees-store/admin/product/update/:productId" exact component = {UpdateProduct}/>
        <AdminRoute path = "/project/tees-store/admin/category/update/:categoryId" exact component = {UpdateCategory}/>
        <AdminRoute path = "/project/tees-store/admin/orders" exact component = {Orders}/>
        <Route path = "/project/tees-store/cart" exact component = {Cart}/>
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
