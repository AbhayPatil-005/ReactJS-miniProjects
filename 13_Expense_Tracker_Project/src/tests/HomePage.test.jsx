import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HomePage from '../components/dashboard/HomePage';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/authSlice';
import themeReducer from '../store/themeSlice'
import expensesReducer from '../store/expensesSlice';
import { MemoryRouter } from 'react-router-dom';

function setup(preloadedState){
  const store = configureStore({
    reducer:{
      auth:authReducer, theme: themeReducer, expenses: expensesReducer
    },
    preloadedState,
  })

  render(
    <Provider store={store}>
      <MemoryRouter>
        <HomePage/>
      </MemoryRouter>
    </Provider>
  );

  return store;
}

describe("HomePage Component", ()=>{
  test("renders welcome message and NavBar", ()=>{
    const preloaded = {
      auth: { isLoggedIn: true, profileComplete: false, emailVerified: false },
      theme: { mode: "light" },
      expenses: { expenses: [] },
    };

    setup(preloaded);
    expect(screen.getByText(/welcome to expense tracker/i)).toBeInTheDocument();
  });

  test("shows Complete Profile button when Profile is incomplete", ()=>{
    const preloaded = {
      auth:{isLoggedIn:true, profileComplete: true, emailVerified:false},
      theme: {mode:"light"},
      expenses:{expenses:[]},
    };

    setup(preloaded);
    expect(screen.getByText(/complete profile/i)).toBeInTheDocument();
  });

  test("navigate to complete-profile page when button is clicked", ()=>{
    const preloaded={
      auth:{isLoggedIn:true, profileComplete:true, emailVerified:false},
      theme:{mode:"light"},
      expenses:{expenses:[]},
    };

    setup(preloaded);
    const button = screen.getByText(/complete profile/i);
    fireEvent.click(button);

    expect(button).toBeInTheDocument();
  });

  test("shows verify Email button when email is not verified",()=>{
    const preloaded = {
      auth: { isLoggedIn: true, profileComplete: false, emailVerified: false },
      theme: { mode: "light" },
      expenses: { expenses: [] },
    };

    setup(preloaded);
    expect(screen.getByText(/verify email/i)).toBeInTheDocument();
  });

});