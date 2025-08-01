import { useState, Fragment } from 'react'
import Header from './Layout/Header'
import Meals from './Meals/Meals'
import Cart from './Cart/Cart'


function App() {
  const [count, setCount] = useState(0)

  return (
    <Fragment>
    <Cart/>
    <Header />
    <main>
      <Meals/>
    </main>
    </Fragment>
  )
}

export default App
