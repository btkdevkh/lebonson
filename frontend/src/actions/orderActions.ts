import { getOrdersByUserIdServiceApi } from "../api/orderServiceApi";
import { 
  ORDERS_LIST_FAIL, 
  ORDERS_LIST_REQUEST, 
  ORDERS_LIST_SUCCESS 
} from "../constants/orderConstants";
import { AppDispatch } from "../store"

const getOrdersByUserId = (user_id: number) => async (dispatch: AppDispatch) => {  
  try {
    dispatch({ type: ORDERS_LIST_REQUEST, payload: null })

    const data = await getOrdersByUserIdServiceApi(user_id)
    
    dispatch({ type: ORDERS_LIST_SUCCESS, payload: data.ordersByUserId })
    
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
