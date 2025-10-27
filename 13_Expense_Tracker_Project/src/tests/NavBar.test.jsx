import React from 'react';
import { render, screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import authReducer from '../store/authSlice';
import expensesReducer from '../store/expensesSlice';
import NavBar from '../components/dashboard/NavBar';

describe('NavBar', () => {
  test('shows Home and Expenses links', () => {
  const store = configureStore({ reducer: { auth: authReducer, expenses: expensesReducer, theme: (s = { mode: 'light' }) => s }, preloadedState: { auth: { isLoggedIn: true, bearerToken: 't', userId: 'u' }, expenses: { expenses: [] }, theme: { mode: 'light' } } });
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
});