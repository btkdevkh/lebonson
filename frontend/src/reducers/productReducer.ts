import { 
  PRODUCTS_LIST_REQUEST,
  PRODUCTS_LIST_SUCCESS,
  PRODUCTS_LIST_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
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
    // List
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

    // Create
    case PRODUCT_CREATE_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case PRODUCT_CREATE_SUCCESS:
      const createdProduct = state.products.find(x => x.id === action.payload.id)

      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        products: [...state.products.filter(x => x.id !== createdProduct?.id), action.payload]
      }
    case PRODUCT_CREATE_FAIL:
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        products: action.payload
      }
    
    // Update
    case PRODUCT_UPDATE_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case PRODUCT_UPDATE_SUCCESS:
      const updatedProduct = state.products.find(x => x.id === action.payload.id)
      
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        products: [...state.products.filter((x: IProduct) => (x.id !== updatedProduct?.id)), action.payload]
      }
    case PRODUCT_UPDATE_FAIL:
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        products: action.payload
      }

    // Delete
    case PRODUCT_DELETE_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case PRODUCT_DELETE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        products: state.products.filter((x: IProduct) => (x.id !== action.payload.id))
      }
    case PRODUCT_DELETE_FAIL:
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
