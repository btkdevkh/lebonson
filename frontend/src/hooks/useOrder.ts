import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store"

function useOrder() {
  const dispatch = useDispatch()
  const { orders, isLoading, isError, isSuccess } = useSelector((state: RootState) => state.order)
  return { orders, isLoading, isError, isSuccess, dispatch }
}

export default useOrder
