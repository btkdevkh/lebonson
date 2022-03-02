import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store"

function useBasket() {
  const dispatch = useDispatch()
  const { baskets, isLoading, isError, isSuccess } = useSelector((state: RootState) => state.basket)
  return { baskets, isLoading, isError, isSuccess, dispatch }
}

export default useBasket
