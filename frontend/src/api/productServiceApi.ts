import axios from 'axios'
import { config } from '../config'

const API_V1 = '/api/v1/product'

export const getProducts = async () => {
  const res = await axios.get(config.API_URL + API_V1)
  return res.data
}
