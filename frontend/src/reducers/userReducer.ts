import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT } from "../constants/userConstants";
import { IUser } from "../models/lebonson/User"

interface Action {
  type: string
  payload: IUser
}

interface AuthInitialState {
  user: IUser | null
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
  message: string
}

const user = JSON.parse(localStorage.getItem('user') as string)

const initialState: AuthInitialState = {
  user: user ?? null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: ''
}

const userReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        isSuccess: true
      }
    case USER_LOGIN_FAIL:
      return {
        ...state,
        user: null,
        isLoading: false,
        isError: true,
        isSuccess: false,
        message: action.payload
      }

    case USER_LOGOUT:
      return {
        user: null,
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: ''
      }
    default:
      return state
  }
}

export default userReducer
