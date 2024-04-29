import { createReducer } from '@reduxjs/toolkit'
import authActions from '../auth/authActions'
import cartActions from './cartActions'




const { sign_in, sign_in_token, sign_out } = authActions
const { set_product, remove_product, clear_cart,add_product, add_address, checkout } = cartActions

const inicialState = {
  cart_id: null,
  address: null,
  products: null,
  loading: false
}

const reducer = createReducer(
  inicialState,
  (builder) => builder
    .addCase(
      sign_in.fulfilled,
      (state, action) => {
        const newState = {
          ...state,
          cart_id: action.payload.cart._id,
          products: action.payload.cart.products,
          address: action.payload.cart.address_id? action.payload.cart.address_id._id : null,
          loading: false
        }
        return newState
      }
    )
    .addCase(
      sign_in.pending,
      (state, action) => {
        const newState = {
          ...state,
          loading: true
        }
        return newState
      }
    )
    .addCase(
      sign_in.rejected,
      (state, action) => {
        const newState = {
          ...state,
          loading: false
        }
        return newState
      }
    )
    .addCase(
      sign_in_token.fulfilled,
      (state, action) => {
        const newState = {
          ...state,
          cart_id: action.payload.cart._id,
          products: action.payload.cart.products,
          address: action.payload.cart.address_id? action.payload.cart.address_id._id : null,
          loading: false
        }
        return newState
      }
    )
    .addCase(
      sign_in_token.pending,
      (state, action) => {
        const newState = {
          ...state,
          loading: true
        }
        return newState
      }
    )
    .addCase(
      sign_in_token.rejected,
      (state, action) => {
        const newState = {
          ...state,
          loading: false
        }
        return newState
      }
    )
    .addCase(
      sign_out.fulfilled,
      (state, action) => {
        const newState = {
          ...state,
          address: null,
          products: null
        }
        return newState
      }
    )
    .addCase(
      sign_out.pending,
      (state, action) => {
        const newState = {
          ...state,
          loading: true
        }
        return newState
      }
    )
    .addCase(
      sign_out.rejected,
      (state, action) => {
        const newState = {
          ...state,
          loading: false
        }
        return newState
      }
    )
    .addCase(
      set_product.fulfilled,
      (state, action) => {
        const newState = {
          ...state,
          products: state.products.map((product) => {
            if (product?.product_id?._id === action.payload.product_id) {
              return {
                product_id: { ...product.product_id },
                quantity: action.payload.quantity
              }
            }
            return product
          }),
        }
        return newState
      }
    )
    .addCase(
      remove_product.fulfilled,
      (state, action) => {
        const newState = {
          ...state,
          products: state.products.filter((product) => product.product_id._id !== action.payload.product_id)
        }
        return newState
      }
    )
    .addCase(
      clear_cart.fulfilled,
      (state, action) => {
        const newState = {
          ...state,
          products: []
        }
        return newState
      }
    )
    .addCase(
      add_product.fulfilled,
      (state, action) => {
        const newState = {
          ...state,
          products: [...state.products,{product_id:action.payload.product_data,quantity:1}]
        }
        return newState
      }
    )
    .addCase(
      add_address.fulfilled,
      (state, action ) => {
        const newState = {
          ...state,
          address: action.payload.address_id
        }
        return newState
      }
    )
    .addCase(
      checkout,
      (state, action ) => {
        console.log("entre reducer")
        const newState = {
          ...state,
          products: action.payload.success ? [] : state.products
        }
        return newState
      }
    )
)
export default reducer
