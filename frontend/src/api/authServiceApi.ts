import axios from "axios";
import { config } from "../config";

const API_V1 = '/api/v1/auth/'

export const checkToken = async () => {
  const token = window.localStorage.getItem('token');    
  const res = await axios.get(config.API_URL + API_V1 + "checkToken", {
    headers: {'x-access-token': token as string }
  });

  return res.data;
}
