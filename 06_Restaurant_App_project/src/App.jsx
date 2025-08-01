import { useState, Fragment } from 'react'
import Header from './Layout/Header'
import Meals from './Meals/Meals'
import Cart from './Cart/Cart'


function App() {
  const [cartIsShown, setCartIsShown] = useState(false)

  const showCartHandler=()=>{
    setCartIsShown(true);
  }
  const hideCartHandler=()=>{
    setCartIsShown(false);
  }

  return (
    <Fragment>
    {cartIsShown && <Cart onClose = {hideCartHandler}/>}
    <Header onShowCart={showCartHandler}/>
    <main>
      <Meals/>
    </main>
    </Fragment>
  )
}

export default App
