import { useState, Fragment } from 'react'
import Header from './Layout/Header'
import MealsSummmary from './Meals/MealsSummary'


function App() {
  const [count, setCount] = useState(0)

  return (
    <Fragment>
    <Header />
    <MealsSummmary/>
    </Fragment>
  )
}

export default App
