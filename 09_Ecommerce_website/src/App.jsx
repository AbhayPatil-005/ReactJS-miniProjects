
import { Route, Switch, Redirect } from "react-router-dom";
import About from "./components/pages/About";
import Home from "./components/pages/Home";
import { ContactUs } from "./components/pages/ContactUs";
import { Store } from "./components/pages/Store";
import ProductDetail from "./components/cards/ProductDetail";
import { Cart } from "./components/cart/Cart";
import LoginForm from "./components/auth/LoginForm";
import ProfileForm from "./components/auth/ProfileForm";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const authCtx = useContext(AuthContext);
    return(
      <>

        <Cart/>
        <Switch>
          <Route path='/login' exact>
          {!authCtx.isLoggedIn && <LoginForm />}
          {authCtx.isLoggedIn && <Redirect to="/profile" />}
          </Route>

          <Route path='/' exact>
            <Home/>
          </Route>

          <Route path='/about'>
              <About/>
          </Route>

          <Route path='/store' exact>
            <Store/>
          </Route>

          <Route path='/contact-us'>
            <ContactUs/>
          </Route>

          <Route path='/store/:id'>
          <ProductDetail/>
          </Route>

          <Route path="/profile">
          {authCtx.isLoggedIn && <ProfileForm />}
          {!authCtx.isLoggedIn && <Redirect to="/login" />}
          </Route>

          <Route path='*'>
              <Redirect to='/'/>
          </Route>

        </Switch>
      </>
    )
}

export default App;
