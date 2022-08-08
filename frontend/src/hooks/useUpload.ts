import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store"

function useUpload() {
  const dispatch = useDispatch()
  const { imgUrl, isLoading, isUploadSuccess } = useSelector((state: RootState) => state.upload)

  return { imgUrl, isLoading, isUploadSuccess, dispatch }
}

export default useUpload
