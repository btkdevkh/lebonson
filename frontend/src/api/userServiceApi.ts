import axios from 'axios'
import { config } from '../config'

const API_V1 = '/api/v1/user'

export const loginUserServiceApi = async (userData: any) => {
  const res = await axios.post(config.API_URL + API_V1 + '/login', userData)
  return res.data
}

export const registerUserServiceApi = async (userData: any) => {
  const res = await axios.post(config.API_URL + API_V1, userData)
  return res.data
}

export const updateUserServiceApi = async (userData: any, userId: number) => {
  const user = JSON.parse(localStorage.getItem('user') ?? ''); 
  const res = await axios.put(config.API_URL + API_V1 + '/update/' + userId, userData, {
    headers: {'x-access-token': user.token as string }
  })
  
  return res.data
}
