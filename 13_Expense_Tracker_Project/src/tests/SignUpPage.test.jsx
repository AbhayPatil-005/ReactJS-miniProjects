import React from 'react';
import { render, screen } from '@testing-library/react';
import SignUpPage from '../components/auth/SignUpPage';
import { MemoryRouter } from 'react-router-dom';

test('SignUp page renders Create Account button', () => {
  render(
    <MemoryRouter>
      <SignUpPage />
    </MemoryRouter>
  );
  expect(screen.getByText(/create account/i)).toBeInTheDocument();
});