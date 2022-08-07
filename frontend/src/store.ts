import { createStore, applyMiddleware, combineReducers, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import basketReducer from './reducers/basketReducer';
import orderReducer from './reducers/orderReducer';
import productReducer from './reducers/productReducer';
import uploadReducer from './reducers/uploadReducer';
import userReducer from './reducers/userReducer';

const reducer = combineReducers({
  user: userReducer,
  product: productReducer,
  upload: uploadReducer,
  basket: basketReducer,
  order: orderReducer
})

const initialState = {}

const middleware = [thunk]

const store: Store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
