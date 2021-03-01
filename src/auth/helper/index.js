import {API} from "../../backend"
//API means ; localhost:8000/api

const signup = user => {
  console.log(user)
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
  .then(response => {
    return response.json()
  })
  .catch(err => console.log(err))
}


const signin = user => {
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
  .then(response => {
    return response.json()
  })
  .catch(err => console.log(err))
}


const authenticate = (data, next) => {
  if(typeof window !== "undefined")
  localStorage.setItem("jwt", JSON.stringify(data))
  next()
}


const signout = next => {
  if(typeof window !== "undefined"){
  localStorage.removeItem("jwt")
  next();

  return fetch(`${API}/signout`, {
    method: "GET",
  }).then(response => {
    console.log("Signout success")
  })
  .catch(err => console.log(err))
  }
};

const isAuthenticated = () => {
  if(typeof window == "undefined"){
    return false
  }
  if (localStorage.getItem("jwt")){
    return JSON.parse(localStorage.getItem("jwt"))
  }else{
    return false
  }
};


const UserService = {
  signup,
  signin,
  authenticate,
  signout,
  isAuthenticated
}

export default UserService