import { 
  PRODUCT_CREATE_IMAGE_REQUEST,
  PRODUCT_CREATE_IMAGE_SUCCESS,
  PRODUCT_CREATE_IMAGE_FAIL
} from '../constants/uploadConstants'
import { IProduct } from '../models/lebonson/Product'

interface Action {
  type: string
  payload: IProduct
}

const initailState = {
  isLoading: false,
  isUploadSuccess: false
}

const uploadReducer = (state = initailState, action: Action) => {
  switch (action.type) {
    case PRODUCT_CREATE_IMAGE_REQUEST:
      return {
        isLoading: true
      }
    case PRODUCT_CREATE_IMAGE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isUploadSuccess: true,
      }
    case PRODUCT_CREATE_IMAGE_FAIL:
      return {
        ...state,
        isLoading: false,
        isUploadSuccess: false
      }
    default:
      return state
  }
}

export default uploadReducer
