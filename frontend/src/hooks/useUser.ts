import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store"

const useUser = () => {
  const dispatch = useDispatch()
  const { user, isLoading, isError, isSuccess, message } = useSelector((state: RootState) => state.user)
  return { user, isLoading, isError, isSuccess, message, dispatch }
}

export default useUser
