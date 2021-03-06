import {API} from "../../backend"

export const getUserOrder = (userId, token) => {
  return fetch(`${API}/orders/user/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  }).then(response => {
    return response.json()
  }).catch(err => {
    console.log(err)
  })
}


export const cancelUserOrder = (userId, token, orderId) => {

  return fetch(`${API}/orders/cancel/${userId}/${orderId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  }).then(res => {
    return res.json()
  }).catch(err => {
    console.log(err)
  })

}