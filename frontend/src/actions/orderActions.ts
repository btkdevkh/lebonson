import { 
  ORDERS_LIST_FAIL, 
  ORDERS_LIST_REQUEST, 
  ORDERS_LIST_SUCCESS 
} from "../constants/orderConstants";
import axios from "axios";
import { config } from "../config";
import { AppDispatch } from "../store"
import { headersConfig } from "../helpers/headersConfig";

const getOrdersByUserId = (user_id: number) => async (dispatch: AppDispatch) => {  
  try {
    dispatch({ type: ORDERS_LIST_REQUEST, payload: null })

    const res = await axios.get(config.API_URL + '/api/v1/order/user/' + user_id, headersConfig())

    dispatch({ type: ORDERS_LIST_SUCCESS, payload: res.data.ordersByUserId })
  } catch (error: any) {
    const message = (
      error.response && 
      error.response.data && 
      error.response.data.message
    ) || error.message || error.toString()
    
    dispatch({ type: ORDERS_LIST_FAIL, payload: message})
  }
}

const orderActions = {
  getOrdersByUserId
}

export default orderActions
