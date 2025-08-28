import { useState } from 'react'
import AdminForm from './components/adminForm'
import NavBar from './components/NavBar'
import ProductList from './components/ProductList'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar/>
      <AdminForm></AdminForm>
      <ProductList></ProductList>
    </>
  )
}

export default App
