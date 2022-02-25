import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import productActions from "../actions/productActions"
import { RootState } from "../store"

function useBaskets() {
  const dispatch = useDispatch()
  const { baskets, isLoading, isError, isSuccess } = useSelector((state: RootState) => state.basket)
  
  useEffect(() => {
    dispatch(productActions.loadProducts())
  }, [])

  return { baskets, isLoading, isError, isSuccess }
}

export default useBaskets
