import { 
  BASKET_ADD_FAIL, 
  BASKET_ADD_REQUEST, 
  BASKET_ADD_SUCCESS, 
  BASKET_REMOVE_AFTER_PAID, 
  BASKET_REMOVE_FAIL, 
  BASKET_REMOVE_REQUEST, 
  BASKET_REMOVE_SUCCESS 
} from "../constants/basketConstants"
import { IProduct } from "../models/lebonson/Product"
import { AppDispatch } from "../store"

const addToBasket = (product: IProduct, selectedQty: number, baskets: IProduct[]) => async (dispatch: AppDispatch) => {  
  try {
    dispatch({ type: BASKET_ADD_REQUEST, payload: null})

    const productAlreadyExist = baskets.find(b => b.id === product.id)
    
    if(productAlreadyExist) {
      productAlreadyExist.selectedQuantity = selectedQty
    } else {
      product.selectedQuantity = selectedQty
      baskets.push(product)
    }

    dispatch({ type: BASKET_ADD_SUCCESS, payload: baskets })

    localStorage.setItem('baskets', JSON.stringify(baskets))
    
  } catch (error: any) {
    const message = (
      error.response && 
      error.response.data && 
      error.response.data.message
    ) || error.message || error.toString()
    
    dispatch({ type: BASKET_ADD_FAIL, payload: message})
  }
}

const removeFromBasket = (id: number, baskets: IProduct[]) => async (dispatch: AppDispatch) => {  
  try {
    dispatch({ type: BASKET_REMOVE_REQUEST, payload: null})

    const productToRemoveFromBaskets = baskets.filter(b => b.id !== id)

    localStorage.setItem('baskets', JSON.stringify(productToRemoveFromBaskets))

    dispatch({ type: BASKET_REMOVE_SUCCESS, payload: productToRemoveFromBaskets})
    
  } catch (error: any) {
    const message = (
      error.response && 
      error.response.data && 
      error.response.data.message
    ) || error.message || error.toString()
    
    dispatch({ type: BASKET_REMOVE_FAIL, payload: message})
  }
}

const removeFromBasketAfterPaid = () => async (dispatch: AppDispatch) => {  
  localStorage.removeItem('baskets')
  dispatch({ type: BASKET_REMOVE_AFTER_PAID, payload: null})
}

const basketActions = {
  addToBasket,
  removeFromBasket,
  removeFromBasketAfterPaid
}

export default basketActions
