import { useState } from 'react'
import AdminForm from './components/AdminForm/AdminForm'
import NavBar from './components/NavBar/NavBar'
import ProductList from './components/ProductList/ProductList'


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
