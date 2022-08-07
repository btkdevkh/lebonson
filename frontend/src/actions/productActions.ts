import { 
  PRODUCTS_LIST_FAIL, 
  PRODUCTS_LIST_REQUEST, 
  PRODUCTS_LIST_SUCCESS, 
  PRODUCT_CREATE_FAIL, 
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS
} from "../constants/productConstants"
import { AppDispatch } from "../store"
import { getProducts } from "../api/productServiceApi"
import { IProduct } from "../models/lebonson/Product"
import axios from "axios"
import { config } from "../config"

const loadProducts = () => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: PRODUCTS_LIST_REQUEST })

    const { products } = await getProducts()

    dispatch({ type: PRODUCTS_LIST_SUCCESS, payload: products })
    
  } catch (error: any) {
    const message = (
      error.response && 
      error.response.data && 
      error.response.data.message
    ) || error.message || error.toString()
    
    dispatch({ type: PRODUCTS_LIST_FAIL, payload: message})
  }
}

const createProduct = (product: IProduct) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REQUEST })

    const user = JSON.parse(localStorage.getItem("user")!);
    
    const res = await axios.post(`${config.API_URL}/api/v1/product/create`, product, {
      headers: { "x-access-token": user.token }
    })

    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: res.data.product })
    
  } catch (error: any) {
    const message = (
      error.response && 
      error.response.data && 
      error.response.data.message
    ) || error.message || error.toString()
    
    dispatch({ type: PRODUCT_CREATE_FAIL, payload: message})
  }
}

const updateProduct = (product: IProduct, id: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: PRODUCT_UPDATE_REQUEST })

    const user = JSON.parse(localStorage.getItem("user")!);
    
    const res = await axios.put(`${config.API_URL}/api/v1/product/update/${id}`, product, {
      headers: { "x-access-token": user.token }
    })

    console.log('RES', res);
    
    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: res.data.product })
    
  } catch (error: any) {
    const message = (
      error.response && 
      error.response.data && 
      error.response.data.message
    ) || error.message || error.toString()
    
    dispatch({ type: PRODUCT_UPDATE_FAIL, payload: message})
  }
}

const deleteProduct = (product: IProduct) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST })

    const user = JSON.parse(localStorage.getItem("user")!);
    
    await axios.delete(`${config.API_URL}/api/v1/product/delete/${product.id}`, {
      headers: { "x-access-token": user.token }
    })

    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: product })
  } catch (error: any) {
    const message = (
      error.response && 
      error.response.data && 
      error.response.data.message
    ) || error.message || error.toString()
    
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: message})
  }
}

const productActions = {
  loadProducts,
  createProduct,
  deleteProduct,
  updateProduct
}

export default productActions
