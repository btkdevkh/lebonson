import { 
  PRODUCT_CREATE_IMAGE_FAIL, 
  PRODUCT_CREATE_IMAGE_REQUEST, 
  PRODUCT_CREATE_IMAGE_SUCCESS 
} from "../constants/uploadConstants";
import axios from "axios";
import { config } from "../config";
import { AppDispatch } from "../store";

const saveProductImage = (dataFile: File, imagName: any) => async (dispatch: AppDispatch) => {
  try {

    if(dataFile) {
      dispatch({ type: PRODUCT_CREATE_IMAGE_REQUEST })

      let formData = new FormData();
      formData.append('image', dataFile);
      formData.append('image_name', imagName);

      const res = await axios.post(`${config.API_URL}/api/v1/product/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        data: imagName
      })
      
      dispatch({ type: PRODUCT_CREATE_IMAGE_SUCCESS, payload: res.data.url })
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
