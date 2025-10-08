import React from 'react';
import { render, screen } from '@testing-library/react';
import CompleteProfilePage from '../components/dashboard/ProfilePage';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/authSlice';
import expensesReducer from '../store/expensesSlice';
import { MemoryRouter } from 'react-router-dom';

test('ProfilePage renders update button', () => {
  const store = configureStore({ reducer: { auth: authReducer, expenses: expensesReducer }, preloadedState: { auth: { isLoggedIn: true, bearerToken: 't', userId: 'u' }, expenses: { expenses: [] } } });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <CompleteProfilePage />
      </MemoryRouter>
    </Provider>
  );
  expect(screen.getByText(/update/i)).toBeInTheDocument();
});