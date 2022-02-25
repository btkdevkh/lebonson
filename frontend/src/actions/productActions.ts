import { getProducts } from "../api/productServiceApi"
import { PRODUCTS_LIST_FAIL, PRODUCTS_LIST_REQUEST, PRODUCTS_LIST_SUCCESS } from "../constants/productConstants"
import { AppDispatch } from "../store"

const loadProducts = () => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: PRODUCTS_LIST_REQUEST, payload: null})

    const { products } = await getProducts()

    dispatch({ type: PRODUCTS_LIST_SUCCESS, payload: products})
    
  } catch (error: any) {
    const message = (
      error.response && 
      error.response.data && 
      error.response.data.message
    ) || error.message || error.toString()
    
    dispatch({ type: PRODUCTS_LIST_FAIL, payload: message})
  }
}

const productActions = {
  loadProducts,
}

export default productActions
