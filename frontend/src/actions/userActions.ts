import { 
  USER_LOGIN_FAIL, 
  USER_LOGIN_REQUEST, 
  USER_LOGIN_SUCCESS, 
  USER_LOGOUT, 
  USER_REGISTER_FAIL, 
  USER_REGISTER_REQUEST, 
  USER_REGISTER_SUCCESS, 
  USER_UPDATE_FAIL, 
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS
} from "../constants/userConstants"
import { AppDispatch } from "../store"
import { IUser } from "../models/lebonson/User"
import { loginUserServiceApi, registerUserServiceApi, updateUserServiceApi } from '../api/userServiceApi'

const loginUser = (userData: IUser) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST, payload: null })    

    const data = await loginUserServiceApi(userData)    

    if(!data) return

    localStorage.setItem('user', JSON.stringify(data))

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data })

  } catch (error: any) {
    const message = (
      error.response && 
      error.response.data && 
      error.response.data.message
    ) || error.message || error.toString()
    
    dispatch({ type: USER_LOGIN_FAIL, payload: message })
  }
}

const registerUser = (userData: any) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST, payload: null })

    const data = await registerUserServiceApi(userData)    

    if(!data) return    

    localStorage.setItem('user', JSON.stringify(data))

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data })

  } catch (error: any) {
    const message = (
      error.response && 
      error.response.data && 
      error.response.data.message
    ) || error.message || error.toString()
    
    dispatch({ type: USER_REGISTER_FAIL, payload: message })
  }
}

const updateUser = (userData: any, userId: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST, payload: null })

    const data = await updateUserServiceApi(userData, userId)    

    if(!data) return    

    localStorage.setItem('user', JSON.stringify(data))

    dispatch({ type: USER_UPDATE_SUCCESS, payload: data })

  } catch (error: any) {
    const message = (
      error.response && 
      error.response.data && 
      error.response.data.message
    ) || error.message || error.toString()
    
    dispatch({ type: USER_UPDATE_FAIL, payload: message })
  }
}

const logOutUser = () => async (dispatch: AppDispatch) => {
  localStorage.removeItem('user')

  dispatch({ type: USER_LOGOUT, payload: null })
}

const userActions = {
  loginUser,
  logOutUser,
  registerUser,
  updateUser
}

export default userActions
