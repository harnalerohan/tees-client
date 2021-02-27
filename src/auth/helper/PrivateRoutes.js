import React from 'react'
import {Route, Redirect} from "react-router-dom"
import UserService from "./index"


const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        UserService.isAuthenticated() ? (
          <Component {...props}/>
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute