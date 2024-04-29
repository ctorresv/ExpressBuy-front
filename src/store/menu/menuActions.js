import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, endpoints } from "../../utils/api";
import { parseError } from "../../utils/handleData";

const get_menu = createAsyncThunk("get_menu", async (data = null, { rejectWithValue }) => {
    try {

        let response = await api.get(endpoints.get_menu);
        return {
            departments: response.data.departments,
            categories: response.data.categories,
            subcategories: response.data.subcategories,
        }
    } catch (error) {
        let { newError } = parseError({ error })
        return rejectWithValue({
            error: newError
        })
    }
})

const actions = { get_menu }
export default actions