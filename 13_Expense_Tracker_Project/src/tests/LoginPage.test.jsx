import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from '../components/auth/LoginPage';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/authSlice';
import expensesReducer from '../store/expensesSlice';
import { MemoryRouter } from 'react-router-dom';

test('Login form renders email and password inputs', () => {
  const store = configureStore({ reducer: { auth: authReducer, expenses: expensesReducer } });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    </Provider>
  );
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
});