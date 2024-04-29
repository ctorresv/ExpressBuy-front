import { createReducer } from '@reduxjs/toolkit'
import menuActions from './menuActions'

const { get_menu } = menuActions

const inicialState = {
  departments: null,
  categories: null,
  subcategories: null,
  loading: false,
  error: null
}

const reducer = createReducer(
  inicialState,
  (builder) => builder
    .addCase(
      get_menu.fulfilled,
      (state, action) => {
        const newState = {
          ...state,
          departments: action.payload.departments,
          categories: action.payload.categories,
          subcategories: action.payload.subcategories,
          loading: false
        }
        return newState
      }
    )
    .addCase(
      get_menu.pending,
      (state, action) => {
        const newState = {
          ...state,
          loading: true
        }
        return newState
      }
    )
    .addCase(
      get_menu.rejected,
      (state, action) => {
        const newState = {
          ...state,
          loading: false
        }
        return newState
      }
    )
)
export default reducer