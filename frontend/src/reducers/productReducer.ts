import { 
  PRODUCTS_LIST_REQUEST,
  PRODUCTS_LIST_SUCCESS,
  PRODUCTS_LIST_FAIL
} from '../constants/productConstants'
import { IProduct } from '../models/lebonson/Product'

interface Action {
  type: string
  payload: IProduct
}

interface ProductInitialState {
  products: IProduct[]
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
}

const initialState: ProductInitialState = {
  products: [],
  isLoading: false,
  isError: false,
  isSuccess: false
}

const productReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case PRODUCTS_LIST_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case PRODUCTS_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        products: action.payload
      }
    case PRODUCTS_LIST_FAIL:
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        products: action.payload
      }
    default:
      return state
  }
}

export default productReducer
