import axios from "axios";
import { config } from "../config";
import { 
  PRODUCT_CREATE_IMAGE_FAIL, 
  PRODUCT_CREATE_IMAGE_REQUEST, 
  PRODUCT_CREATE_IMAGE_SUCCESS 
} from "../constants/uploadConstants";
import { AppDispatch } from "../store";

const saveProductImage = (dataFile: File) => async (dispatch: AppDispatch) => {
  try {

    if(dataFile) {
      dispatch({ type: PRODUCT_CREATE_IMAGE_REQUEST })

      let formData = new FormData();
      formData.append('image', dataFile);

      const response = await axios.post(`${config.API_URL}/api/v1/product/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      
      dispatch({ type: PRODUCT_CREATE_IMAGE_SUCCESS, payload: response })
    }
    
    return
    
  } catch (error: any) {
    const message = (
      error.response && 
      error.response.data && 
      error.response.data.message
    ) || error.message || error.toString()
    
    dispatch({ type: PRODUCT_CREATE_IMAGE_FAIL, payload: message })
  }
}

const uploadActions = {
  saveProductImage,
}

export default uploadActions
