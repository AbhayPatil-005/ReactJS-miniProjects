
import { Route, Switch, Redirect } from "react-router-dom";
import { useContext, lazy, Suspense } from "react";
import { AuthContext } from "./context/AuthContext";
import Home from "./components/pages/Home";

const About =  lazy(()=>import('./components/pages/About'));
const ContactUs = lazy(()=>import('./components/pages/ContactUs'));
const Store = lazy(()=>import('./components/pages/Store'));
const ProductDetail = lazy(()=>import("./components/cards/ProductDetail"));
const Cart = lazy(()=>import("./components/cart/Cart"));
const LoginForm = lazy(()=>import("./components/auth/LoginForm"));
  
function App() {
  const authCtx = useContext(AuthContext);
    return(
      <>
        <Suspense fallback={<p>Loading...</p>}>
        <Cart/>
        <Switch>
          <Route path='/login' exact>
          {!authCtx.isLoggedIn ? <LoginForm /> : <Redirect to="/" />}
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
        </Suspense>
      </>
    )
}

export default App;
