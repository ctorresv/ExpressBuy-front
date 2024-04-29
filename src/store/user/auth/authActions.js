import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { LS } from "../../../utils/localStorageUtils";
import { api, endpoints, headers } from "../../../utils/api";
import { parseError } from "../../../utils/handleData";




const sign_in = createAsyncThunk("sign_in", async ({ data }, { rejectWithValue }) => {
  try {
    let response = await api.post(endpoints.sign_in, data);
    LS.add('token', response.data.token)
    let addressesResponse = await api.get(endpoints.get_addresses,headers(LS.get("token")))
    return {
      success: response.data.sucess,
      user: response.data.user,
      cart: response.data.cart,
      token: response.data.token,
      addresses: addressesResponse.data.addresses
    }

  } catch (error) {
    let { newError } = parseError({ error })
    return rejectWithValue({
      error: newError
    })
  }
})
const sign_in_token = createAsyncThunk("sign_in_token", async (data = null, { rejectWithValue }) => {
  try {
    let token = LS.get('token')
    let response = await api.post(endpoints.sign_in_token, null, headers(token))
    let addressesResponse = await api.get(endpoints.get_addresses,headers(LS.get("token")))
    return {
      success: response.data.sucess,
      user: response.data.user,
      cart: response.data.cart,
      token: token,
      addresses: addressesResponse.data.addresses
    }
  } catch (error) {
    let newError = parseError({ error })
    return rejectWithValue({
      error: newError
    })
  }
})
const sign_out = createAsyncThunk("sign_out", async (data = null, { rejectWithValue }) => {
  try {
    let token = LS.get('token')
    let response = await api.post(endpoints.sign_out, null, headers(token))
    LS.remove('token')
    return {
      success: false,
      user: null,
      cart: null,
      token: null
    }
  } catch (error) {
    let newError = parseError({ error })
    return rejectWithValue({
      error: newError
    })
  }
})
const sign_up = createAsyncThunk('sign_up', async ({ data }, { rejectWithValue }) => {
  try {
    let response = await api.post(endpoints.sign_up, data)
    return {
      success: response.success
    }
  } catch (error) {
    let { newError }= parseError({ error })
    return rejectWithValue({
      error: newError
    })
  }
})
const actions = { sign_in, sign_in_token, sign_out, sign_up }
export default actions