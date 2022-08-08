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
  imgUrl: null,
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
        imgUrl: action.payload
      }
    case PRODUCT_CREATE_IMAGE_FAIL:
      return {
        ...state,
        isLoading: false,
        isUploadSuccess: false,
        imgUrl: action.payload
      }
    default:
      return state
  }
}

export default uploadReducer
