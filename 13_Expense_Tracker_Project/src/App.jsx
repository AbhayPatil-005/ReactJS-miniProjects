import { useSelector } from 'react-redux';
import SignUpPage from './components/auth/SignUpPage';
import './App.css';
import LoginPage from './components/auth/LoginPage';
import HomePage from './components/dashboard/HomePage';
import { Route, Switch, Redirect } from 'react-router-dom';
import CompleteProfilePage from './components/dashboard/ProfilePage';
import ForgotPassword from './components/auth/ForgotPassword';
import ExpenseTracker from './components/dashboard/ExpenseTracker';



function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <>
      <Switch>
        <Route path='/login' exact>
          {!isLoggedIn ? <LoginPage /> : <Redirect to='/' />}
        </Route>

        <Route path='/' exact>
          {isLoggedIn ? <HomePage /> : <Redirect to='/login' />}
        </Route>

        <Route path='/sign-up' component={SignUpPage} />

        <Route path="/complete-profile">
          {isLoggedIn ? <CompleteProfilePage /> : <Redirect to="/login" />}
        </Route>

        <Route path='/forgot-password'>
          <ForgotPassword />
        </Route>

        <Route path='/expenses' exact>
          {isLoggedIn ? <ExpenseTracker /> : <Redirect to='/login' />}
        </Route>
      </Switch>
    </>
  );
}

export default App;
