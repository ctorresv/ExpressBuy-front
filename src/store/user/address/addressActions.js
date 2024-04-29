import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { LS } from "../../../utils/localStorageUtils";
import { api, endpoints, headers } from "../../../utils/api";
import { parseError } from "../../../utils/handleData";
import { toast } from "react-hot-toast";

const create = createAsyncThunk("create", async ({ data }, { rejectWithValue }) => {
    try {
        let response = await api.post(endpoints.create_address, data, headers(LS.get("token")));
        toast.success("Saved")
        return {
            address: response.data.address
        }

    } catch (error) {
        let { newError } = parseError({ error })
        return rejectWithValue({
            error: newError
        })
    }
})

const actions = { create }
export default actions