import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import authReducer from '../store/authSlice';
import expensesReducer from '../store/expensesSlice';
import NavBar from '../components/dashboard/NavBar';

test('NavBar shows Home and Expenses links', () => {
  const store = configureStore({ reducer: { auth: authReducer, expenses: expensesReducer }, preloadedState: { auth: { isLoggedIn: true, bearerToken: 't', userId: 'u' }, expenses: { expenses: [] } } });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    </Provider>
  );

  expect(screen.getByText(/home/i)).toBeInTheDocument();
  expect(screen.getByText(/expenses/i)).toBeInTheDocument();
});