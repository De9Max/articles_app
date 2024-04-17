import { loginStart, loginSuccess, loginFailure, logout } from './userSlice'
import { fetchUser, userLogin } from './userApi'

export const loginUser = (credentials) => async (dispatch) => {
  try {
    dispatch(loginStart())
    const user = await userLogin(credentials)
    dispatch(loginSuccess(user))
    localStorage.setItem('token', user.token)
  } catch (error) {
    console.log(error.message)
    dispatch(loginFailure(error.message))
  }
}

export const getUser = (token) => async (dispatch) => {
  try {
    console.log(token)
    dispatch(loginStart())
    const user = await fetchUser(token)
    console.log(token)
    dispatch(loginSuccess(user))
  } catch (error) {
    console.log(error.message)
    dispatch(loginFailure(error.message))
  }
}

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('token')
  dispatch(logout())
}
