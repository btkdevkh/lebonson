import { 
  BASKET_ADD_FAIL, 
  BASKET_ADD_REQUEST, 
  BASKET_ADD_SUCCESS, 
  BASKET_REMOVE_FAIL, 
  BASKET_REMOVE_REQUEST, 
  BASKET_REMOVE_SUCCESS 
} from "../constants/basketConstants"
import { IProduct } from "../models/lebonson/Product"
import { AppDispatch } from "../store"

const addToBasket = (product: IProduct, selectedQty: number, baskets: IProduct[]) => async (dispatch: AppDispatch) => {  
  try {
    dispatch({ type: BASKET_ADD_REQUEST, payload: null})

    let isAlready = false;
    for(let i = 0; i < baskets.length; i++) {
      if(baskets[i].id === Number(product.id)) {
        baskets[i].selectedQuantity = selectedQty;
  
        isAlready = true;
      }
    }

    if(isAlready === false) {
      product.selectedQuantity = selectedQty;
      baskets.push(product)
    }

    dispatch({ type: BASKET_ADD_SUCCESS, payload: baskets})

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

    for(let i = 0; i < baskets.length; i++) {
      if(baskets[i].id === Number(id)) {
        baskets.splice(i, 1)
      }
    }

    localStorage.setItem('baskets', JSON.stringify(baskets))

    dispatch({ type: BASKET_REMOVE_SUCCESS, payload: baskets})
    
  } catch (error: any) {
    const message = (
      error.response && 
      error.response.data && 
      error.response.data.message
    ) || error.message || error.toString()
    
    dispatch({ type: BASKET_REMOVE_FAIL, payload: message})
  }
}

const basketActions = {
  addToBasket,
  removeFromBasket
}

export default basketActions
