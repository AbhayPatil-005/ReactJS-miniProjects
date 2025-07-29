import { useState, Fragment } from 'react'
import Header from './Layout/Header'
import Meals from './Meals/Meals'


function App() {
  const [count, setCount] = useState(0)

  return (
    <Fragment>
    <Header />
    <main>
      <Meals/>
    </main>
    </Fragment>
  )
}

export default App
