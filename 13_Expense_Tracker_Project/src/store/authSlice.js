import { createSlice } from '@reduxjs/toolkit';

// accessing the token from localStorage
const savedToken = localStorage.getItem('token');
const savedUserId = localStorage.getItem('userId');

const initialState = {
  isLoggedIn: !!savedToken,
  bearerToken: savedToken || '',
  userId: savedUserId || null,
  isPremium:false,
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
        // ignoring storage errors
      }
    },
    logout(state) {
      state.isLoggedIn = false;
      state.bearerToken = '';
      state.userId = null;
      state.isPremium = false;
      try {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
      } catch (e) {
        // ignoring storage errors
      }
    },
    activatePremium(state){
      state.isPremium = true;
    },
    deactivatePremium(state){
      state.isPremium = false;
    },
  },
});

export const { login, logout, activatePremium, deactiatePremium } = authSlice.actions;
export default authSlice.reducer;
