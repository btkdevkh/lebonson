import { 
  ORDERS_LIST_FAIL, 
  ORDERS_LIST_REQUEST, 
  ORDERS_LIST_SUCCESS 
} from "../constants/orderConstants"


interface Action {
  type: string
  payload: any
}

interface OrderInitialState {
  orders: any[]
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
}

const initialState: OrderInitialState = {
  orders: [],
  isLoading: false,
  isError: false,
  isSuccess: false
}

const orderReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ORDERS_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case ORDERS_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        orders: action.payload
      }
    case ORDERS_LIST_FAIL:
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        orders: action.payload
      }
    default:
      return state
  }
}

export default orderReducer
