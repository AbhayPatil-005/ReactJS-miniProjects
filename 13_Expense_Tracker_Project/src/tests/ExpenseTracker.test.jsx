import React from 'react';
import { render, screen } from '@testing-library/react';
import ExpenseTracker from '../components/dashboard/ExpenseTracker';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/authSlice';
import expensesReducer from '../store/expensesSlice';

test('ExpenseTracker shows login message when not authenticated', () => {
  const store = configureStore({ reducer: { auth: authReducer, expenses: expensesReducer }, preloadedState: { auth: { isLoggedIn: false, bearerToken: '', userId: null }, expenses: { expenses: [] } } });
  const { container } = render(<Provider store={store}><ExpenseTracker /></Provider>);
  expect(container.textContent).toMatch(/please login to view and add expenses/i);
});

test('ExpenseTracker shows Activate Premium button when total > 10000', () => {
  const preloaded = { auth: { isLoggedIn: true, bearerToken: 't', userId: 'u' }, expenses: { expenses: [{ id: '1', amount: 7000 }, { id: '2', amount: 4000 }] } };
  const store = configureStore({ reducer: { auth: authReducer, expenses: expensesReducer }, preloadedState: preloaded });
  render(<Provider store={store}><ExpenseTracker /></Provider>);
  expect(screen.getByText(/activate premium/i)).toBeInTheDocument();
});