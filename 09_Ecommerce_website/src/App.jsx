
import { Route, Switch, Redirect } from "react-router-dom";
import About from "./components/pages/About";
import Home from "./components/pages/Home";
import { ContactUs } from "./components/pages/ContactUs";
import { Store } from "./components/pages/Store";
import ProductDetail from "./components/cards/ProductDetail";
import { Cart } from "./components/cart/Cart";
import LoginForm from "./components/auth/LoginForm";

import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const authCtx = useContext(AuthContext);
    return(
      <>

        <Cart/>
        <Switch>
          <Route path='/login' exact>
          {!authCtx.isLoggedIn ? <LoginForm /> : <Redirect to="/profile" />}
          </Route>

          <Route path='/' exact>
            <Home/>
          </Route>

          
         <Route path='/store' exact>
          {authCtx.isLoggedIn ? <Store/> : <Redirect to="/login" />}
        </Route>

        <Route path='/contact-us'>
          {authCtx.isLoggedIn ? <ContactUs/> : <Redirect to="/login" />}
        </Route>

        <Route path='/store/:id'>
          {authCtx.isLoggedIn ? <ProductDetail/> : <Redirect to="/login" />}
        </Route>

          <Route path='/about'>
              <About/>
          </Route>

          <Route path='*'>
              <Redirect to='/'/>
          </Route>

        </Switch>
      </>
    )
}

export default App;
