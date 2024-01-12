import { getLogin } from "@/api/user"
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"


export const login = createAsyncThunk('auth/login', async ({email,password}) => {
  const response = await getLogin(email,password);
  return response.data
})



const authSlice = createSlice({
  name: 'auth',
  initialState:{
    user: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    })
    builder.addCase(login.pending, (state, action) => {
      state.isLoading = true      
    })
    builder.addCase(login.rejected, (state, action) => {
      console.log(action)
      state.error = action.payload;
      state.isLoading = false      
    })
  },
})



export default authSlice.reducer;
export const { logout } = authSlice.actions