import axios, { AxiosRequestHeaders } from 'axios'
import { config } from '../config'
import { IUser } from '../models/lebonson/User'

const API_V1 = '/api/v1/user/'

export const loginUserServiceApi = async (userData: IUser) => {
  const res = await axios.post(config.API_URL + API_V1 + 'login', userData)
  return res.data
}
