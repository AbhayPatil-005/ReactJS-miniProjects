import { createSlice } from '@reduxjs/toolkit';

const savedToken = localStorage.getItem('token');
const savedUserId = localStorage.getItem('userId');

const initialState = {
  isLoggedIn: !!savedToken,
  bearerToken: savedToken || '',
  userId: savedUserId || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.bearerToken = action.payload.token;
      state.userId = action.payload.userId;
      try {
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('userId', action.payload.userId);
      } catch (e) {
        // ignore storage errors
      }
    },
    logout(state) {
      state.isLoggedIn = false;
      state.bearerToken = '';
      state.userId = null;
      try {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
      } catch (e) {
        // ignore storage errors
      }
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
