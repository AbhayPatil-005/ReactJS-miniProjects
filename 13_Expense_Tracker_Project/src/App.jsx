import { useState, createContext, useContext } from 'react'
import SignUpPage from './components/auth/SignUpPage';
import './App.css'
import LoginPage from './components/auth/LoginPage';
import HomePage from './components/dashboard/HomePage';
import { Route, Switch, Redirect  } from 'react-router-dom';
import { AuthContext } from './authContext/AuthContextProvider';
import CompleteProfilePage from './components/dashboard/ProfilePage';
import ForgotPassword from './components/auth/ForgotPassword';


function App() {
  const authCtx = useContext(AuthContext);
  
  return (
    <> 
      <Switch>
        <Route path='/login' exact > 
          {!authCtx.isLoggedIn ? <LoginPage/>:<Redirect to='/' />}
        </Route>

        <Route path='/' exact>
          {authCtx.isLoggedIn ? <HomePage/>:<Redirect to='/login' />}        
        </Route>

        <Route path='/sign-up' component={SignUpPage}/>

        <Route path="/complete-profile">
          {authCtx.isLoggedIn ? <CompleteProfilePage /> : <Redirect to="/login" />}
        </Route>
        
        <Route path='/forgot-password'>
          <ForgotPassword/>
        </Route>
      </Switch>
    </>
  )
}

export default App
