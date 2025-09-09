
import { Route, Switch } from "react-router-dom";
import About from "./components/pages/About";
import Home from "./components/pages/Home";
import { ContactUs } from "./components/pages/ContactUs";
import { Store } from "./components/pages/Store";
import ProductDetail from "./components/cards/ProductDetail";
import { Cart } from "./components/cart/Cart";
import LoginForm from "./components/auth/LoginForm";
import Profile from "./components/auth/ProfileForm";

function App() {
    return(
      <>

        <Cart/>
        <Switch>
          <Route path='/login' exact>
            <LoginForm/>
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
          <Profile/>
          </Route>

        </Switch>
      </>
    )
}

export default App;
