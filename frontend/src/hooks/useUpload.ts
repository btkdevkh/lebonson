import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store"

function useUpload() {
  const dispatch = useDispatch()
  const { isLoading, isUploadSuccess } = useSelector((state: RootState) => state.upload)

  return { isLoading, isUploadSuccess, dispatch }
}

export default useUpload
