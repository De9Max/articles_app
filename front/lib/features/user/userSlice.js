import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    isLoggedIn: false,
    isLoading: false,
    error: null,
  },
  reducers: {
    loginStart(state) {
      state.isLoading = true
      state.error = null
    },
    loginSuccess(state, action) {
      state.isLoading = false
      state.isLoggedIn = true
      state.user = action.payload
      state.error = null
    },
    loginFailure(state, action) {
      state.isLoading = false
      state.error = action.payload
    },
    logout(state) {
      state.user = null
      state.isLoggedIn = false
      state.error = null
    },
  },
})

export const { loginStart, loginSuccess, loginFailure, logout } =
  userSlice.actions
export default userSlice.reducer
