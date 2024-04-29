import { combineReducers } from 'redux';
import cart from './cart/cartReducer';
import data from './auth/userReducer';
const rootReducer = combineReducers({
  data,
  cart,
});

export default rootReducer;