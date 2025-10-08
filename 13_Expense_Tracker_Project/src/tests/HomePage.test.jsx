import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from '../components/dashboard/HomePage';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/authSlice';
import expensesReducer from '../store/expensesSlice';
import { MemoryRouter } from 'react-router-dom';

test('HomePage shows Verify Email button when email not verified', () => {
  const store = configureStore({ reducer: { auth: authReducer, expenses: expensesReducer }, preloadedState: { auth: { isLoggedIn: true, bearerToken: 't', userId: 'u', emailVerified: false, profileComplete: false }, expenses: { expenses: [] } } });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    </Provider>
  );
  expect(screen.getByText(/verify email/i)).toBeInTheDocument();
});