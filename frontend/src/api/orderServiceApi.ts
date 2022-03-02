import axios from "axios"
import { config } from "../config"

const API_V1 = '/api/v1/order'

export const createOrder = async (order: any) => {
  const user = JSON.parse(localStorage.getItem('user') ?? ''); 
  
  const res = await axios.post(config.API_URL + API_V1, order, {
    headers: {'x-access-token': user.token as string }
  })
  
  return res.data
}

export const createCheckoutOrder = async (order: any) => {
  const user = JSON.parse(localStorage.getItem('user') ?? ''); 
  const res = await axios.post(config.API_URL + '/create-checkout-session', order, { headers: {'x-access-token': user.token as string } })
  return res.data
}

export const validateOrderAfterSuccess = async (order: any) => {
  const user = JSON.parse(localStorage.getItem('user') ?? '');
  const res = await axios.put(config.API_URL + API_V1 + '/validate', order, { headers: {'x-access-token': user.token as string } })
  return res.data
}

export const getOrdersByUserIdServiceApi = async (user_id: number) => {
  const user = JSON.parse(localStorage.getItem('user') ?? '');
  const res = await axios.get(config.API_URL + API_V1 + '/user/' + user_id, { headers: {'x-access-token': user.token as string } })
  return res.data
}
