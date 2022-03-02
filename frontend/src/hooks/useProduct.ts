import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import productActions from "../actions/productActions"
import { RootState } from "../store"

function useProduct() {
  const dispatch = useDispatch()
  const { products, isLoading, isError, isSuccess } = useSelector((state: RootState) => state.product)
  
  useEffect(() => {
    dispatch(productActions.loadProducts())
  }, [])

  return { products, isLoading, isError, isSuccess, dispatch }
}

export default useProduct
