import { createReducer } from '@reduxjs/toolkit'
import actions from './authActions'
import addressActions from "../address/addressActions"

const { sign_in, sign_in_token, sign_out, sign_up } = actions
const {create} = addressActions

const initialState = {
  loading: {
    sign_in: null,
    sign_up: null,
    verify: null,
    sign_out: null,
    sign_in_token: null
  },
  user: null,
  token: null,
  addresses: null,
  error: {
    sign_in: null,
    sign_up: null,
    verify: null,
    sign_out: null,
    sign_in_token: null
  },
  success: {
    sign_in: null,
    sign_up: null,
    verify: null,
    sign_out: null,
    sign_in_token: null
  }
}

const reducer = createReducer(
  initialState,
  (builder) => builder
    .addCase(
      sign_in.fulfilled,
      (state, action) => {
        const newState = {
          ...state,
          user: action.payload.user,
          token: action.payload.token,
          addresses: action.payload.addresses,
          success: {
            ...state.success,
            sign_in: true
          },
          loading: {
            ...state.loading,
            sign_in: false
          }
        }
        return newState
      }
    )
    .addCase(
      sign_in.pending,
      (state, action) => {
        const newState = {
          ...state,
          loading: {
            ...state.loading,
            sign_in: true
          }
        }
        return newState
      }
    )
    .addCase(
      sign_in.rejected,
      (state, action) => {
        const newState = {
          ...state,
          success: {
            ...state.success,
            sign_in: false
          },
          loading: {
            ...state.loading,
            sign_in: false
          },
          error: {
            ...state.error,
            sign_in: action.payload.error
          }
        }
        return newState
      }
    )
    .addCase(
      sign_in_token.fulfilled,
      (state, action) => {
        const newState = {
          ...state,
          user: action.payload.user,
          token: action.payload.token,
          addresses: action.payload.addresses,
          success: {
            ...state.success,
            sign_in_token: true
          },
          loading: {
            ...state.loading,
            sign_in_token: false
          }
        }
        return newState
      }
    )
    .addCase(
      sign_in_token.pending,
      (state, action) => {
        const newState = {
          ...state,
          loading: {
            ...state.loading,
            sign_in_token: true
          }
        }
        return newState
      }
    )
    .addCase(
      sign_in_token.rejected,

      (state, action) => {
        const newState = {
          ...state,
          success: {
            ...state.success,
            sign_in_token: false
          },
          loading: {
            ...state.loading,
            sign_in_token: false
          }
        }
        return newState
      }
    )
    .addCase(
      sign_out.fulfilled,

      (state, action) => {
        const newState = {
          ...state,
          loading: {
            ...state.loading,
            sign_out: false
          },
          user: null,
          token: null,
          error: null,
          success: {
            ...state.success,
            sign_out: true
          }
        }
        return newState
      }
    )
    .addCase(
      sign_out.pending,

      (state, action) => {
        const newState = {
          ...state,
          loading: {
            ...state.loading,
            sign_out: true
          },
        }
        return newState
      }
    )
    .addCase(
      sign_out.rejected,
      (state, action) => {
        const newState = {
          ...state,
          loading: {
            ...state.loading,
            sign_out: false
          },
          success: {
            ...state.success,
            sign_out: false
          },
        }
        return newState
      }
    )
    .addCase(
      sign_up.fulfilled,

      (state, action) => {
        const newState = {
          ...state,
          error: {
            ...state.error,
            sign_up: null,
          },
          success: {
            ...state.success,
            sign_up: true
          },
          loading: {
            ...state.loading,
            sign_up: false
          },
        }
        return newState
      }
    )
    .addCase(
      sign_up.pending,

      (state, action) => {
        const newState = {
          ...state,
          error: {
            ...state.error,
            sign_up: null,
          },
          loading: {
            ...state.loading,
            sign_up: true
          }
        }
        return newState
      }
    )
    .addCase(
      sign_up.rejected,
      (state, action) => {
        const newState = {
          ...state,
          error: {
            ...state.error,
            sign_up: action.payload.error,
          },
          sucess: {
            ...state.success,
            sign_up: false
          },
          loading: {
            ...state.loading,
            sign_up: false
          }
        }
        return newState
      }
    )
    .addCase(
      create.fulfilled,
      (state, action) => {
        const newState = {
          ...state,
          addresses: [...state.addresses, action.payload.address]
        }
        return newState
      }
    )

)
export default reducer
