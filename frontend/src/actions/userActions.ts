import { 
  USER_ALL_FAIL,
  USER_ALL_REQUEST,
  USER_ALL_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_LOGIN_FAIL, 
  USER_LOGIN_REQUEST, 
  USER_LOGIN_SUCCESS, 
  USER_LOGOUT, 
  USER_REGISTER_FAIL, 
  USER_REGISTER_REQUEST, 
  USER_REGISTER_SUCCESS, 
  USER_UPDATE_FAIL, 
  USER_UPDATE_REQUEST,
  USER_UPDATE_ROLE_FAIL,
  USER_UPDATE_ROLE_REQUEST,
  USER_UPDATE_ROLE_SUCCESS,
  USER_UPDATE_SUCCESS
} from "../constants/userConstants"
import { AppDispatch } from "../store"
import { IUser } from "../models/lebonson/User"
import axios from "axios"
import { config } from "../config"
import { headersConfig } from "../helpers/headersConfig"

const loginUser = (userData: IUser) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST, payload: null })    

    const res = await axios.post(`${config.API_URL}/api/v1/user/login`, userData)

    localStorage.setItem('user', JSON.stringify(res.data))

    dispatch({ type: USER_LOGIN_SUCCESS, payload: res.data })
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

    const res = await axios.post(`${config.API_URL}/api/v1/user`, userData)

    localStorage.setItem('user', JSON.stringify(res.data))

    dispatch({ type: USER_REGISTER_SUCCESS, payload: res.data })
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

    const res = await axios.put(`${config.API_URL}/api/v1/user/update/${userId}`, userData, headersConfig())

    localStorage.setItem('user', JSON.stringify(res.data))

    dispatch({ type: USER_UPDATE_SUCCESS, payload: res.data })
  } catch (error: any) {
    const message = (
      error.response && 
      error.response.data && 
      error.response.data.message
    ) || error.message || error.toString()
    
    dispatch({ type: USER_UPDATE_FAIL, payload: message })
  }
}

const updateUserRole = (role: {}, userId: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: USER_UPDATE_ROLE_REQUEST, payload: null })

    const res = await axios.put(`${config.API_URL}/api/v1/user/update/role/${userId}`, role, headersConfig())

    dispatch({ type: USER_UPDATE_ROLE_SUCCESS, payload: res.data.user })
  } catch (error: any) {
    const message = (
      error.response && 
      error.response.data && 
      error.response.data.message
    ) || error.message || error.toString()
    
    dispatch({ type: USER_UPDATE_ROLE_FAIL, payload: message })
  }
}

const logOutUser = () => async (dispatch: AppDispatch) => {
  localStorage.removeItem('user')

  dispatch({ type: USER_LOGOUT, payload: null })
}

const getAllUsers = () => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: USER_ALL_REQUEST, payload: null })    

    const res = await axios.get(`${config.API_URL}/api/v1/user`, headersConfig())

    dispatch({ type: USER_ALL_SUCCESS, payload: res.data.users })
  } catch (error: any) {
    const message = (
      error.response && 
      error.response.data && 
      error.response.data.message
    ) || error.message || error.toString()
    
    dispatch({ type: USER_ALL_FAIL, payload: message })
  }
}

const deleteUser = (userId: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: USER_DELETE_REQUEST })

    await axios.delete(`${config.API_URL}/api/v1/user/delete/${userId}`, headersConfig())

    dispatch({ type: USER_DELETE_SUCCESS })
  } catch (error: any) {
    const message = (
      error.response && 
      error.response.data && 
      error.response.data.message
    ) || error.message || error.toString()
    
    dispatch({ type: USER_DELETE_FAIL, payload: message })
  }
}

const userActions = {
  loginUser,
  logOutUser,
  registerUser,
  updateUser,
  getAllUsers,
  updateUserRole,
  deleteUser
}

export default userActions
