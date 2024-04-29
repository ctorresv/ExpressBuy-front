import { combineReducers, configureStore } from '@reduxjs/toolkit'
import user from './user/rootReducer'
import menu from './menu/menuReducer'
const store = configureStore({

  reducer: {
    user,
    menu
  }
})

export default store
