import axios from "axios"
import { config } from "../config"
import { headersConfig } from "../helpers/headersConfig";

const API_V1 = '/api/v1/order'

export const createOrder = async (order: any) => {  
  const res = await axios.post(config.API_URL + API_V1, order, headersConfig())
  return res.data
}

export const createCheckoutOrder = async (order: any) => {
  const res = await axios.post(config.API_URL + '/create-checkout-session', order, headersConfig())
  return res.data
}

export const validateOrderAfterSuccess = async (order: any) => {
  const res = await axios.put(config.API_URL + API_V1 + '/validate', order, headersConfig())
  return res.data
}
