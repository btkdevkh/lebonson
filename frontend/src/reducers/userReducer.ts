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
} from "../constants/userConstants";
import { IUser } from "../models/lebonson/User"

interface Action {
  type: string
  payload: any|IUser
}

interface AuthInitialState {
  users: IUser[]
  user: IUser | null
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
  message: string
}

const user = JSON.parse(localStorage.getItem('user') as string ?? null)

const initialState: AuthInitialState = {
  users: [],
  user: user ? user.user : null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: ""
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
        user: action.payload.user,
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
        ...state,
        user: action.payload,
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: 'Vous êtes bien déconnecté(e)'
      }

    case USER_REGISTER_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isLoading: false,
        isSuccess: true,
        message: action.payload.message
      }
    case USER_REGISTER_FAIL:
      return {
        ...state,
        user: null,
        isLoading: false,
        isError: true,
        isSuccess: false,
        message: action.payload
      }

    case USER_UPDATE_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case USER_UPDATE_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isLoading: false,
        isSuccess: true,
        message: action.payload.message
      }
    case USER_UPDATE_FAIL:
      return {
        ...state,
        user: null,
        isLoading: false,
        isError: true,
        isSuccess: false,
        message: action.payload
      }

    case USER_ALL_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case USER_ALL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        users: action.payload
      }
    case USER_ALL_FAIL:
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        user: action.payload,
      }
    
    case USER_UPDATE_ROLE_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case USER_UPDATE_ROLE_SUCCESS:
      const updatedUser = state.users.find(x => x.id === action.payload.id)

      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        users: [...state.users.filter((x: IUser) => (x.id !== updatedUser?.id)), action.payload] 
      }
    case USER_UPDATE_ROLE_FAIL:
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        user: action.payload,
      }

    case USER_DELETE_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case USER_DELETE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        user: null
      }
    case USER_DELETE_FAIL:
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        user: action.payload,
      }
    default:
      return state
  }
}

export default userReducer
