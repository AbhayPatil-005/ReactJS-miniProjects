import { useState, Fragment } from 'react'
import Header from './Layout/Header'


function App() {
  const [count, setCount] = useState(0)

  return (
    <Fragment>
    <Header />
    </Fragment>
  )
}

export default App
