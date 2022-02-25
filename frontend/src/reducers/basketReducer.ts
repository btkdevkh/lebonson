import { 
  BASKET_ADD_FAIL, 
  BASKET_ADD_REQUEST, 
  BASKET_ADD_SUCCESS, 
  BASKET_REMOVE_FAIL, 
  BASKET_REMOVE_REQUEST, 
  BASKET_REMOVE_SUCCESS 
} from '../constants/basketConstants'
import { IProduct } from '../models/lebonson/Product'

interface Action {
  type: string
  payload: IProduct
}

interface BasketInitialState {
  baskets: IProduct[]
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
}

const basketsLS: IProduct[]|null = JSON.parse(localStorage.getItem('baskets') as string ?? null)

const initialState: BasketInitialState = {
  baskets: basketsLS ?? [],
  isLoading: false,
  isError: false,
  isSuccess: false
}

const basketReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case BASKET_ADD_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case BASKET_ADD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        baskets: action.payload
      }
    case BASKET_ADD_FAIL:
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        baskets: action.payload
      }
    case BASKET_REMOVE_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case BASKET_REMOVE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        baskets: action.payload
      }
    case BASKET_REMOVE_FAIL:
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        baskets: action.payload
      }
    default:
      return state
  }
}

export default basketReducer
