import axios from 'axios'
import { config } from '../config'

const API_V1 = '/api/v1/user/'

export const loginUserServiceApi = async (userData: any) => {
  const res = await axios.post(config.API_URL + API_V1 + 'login', userData)
  return res.data
}

export const registerUserServiceApi = async (userData: any) => {
  const res = await axios.post(config.API_URL + API_V1, userData)
  return res.data
}
