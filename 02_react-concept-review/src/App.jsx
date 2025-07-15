import { useState } from 'react'
import AddUser from "./components/Users/AddUser.jsx"
import './index.css'

function App() {
  const [data, setData] = useState([])
  const userDataHandler = (userData) => {
    setData((prevState) => [userData, ...prevState])
  }
  return (
    <div>
      <AddUser onAddUser={userDataHandler} />
      {data.map((user, index) => <div key={index}>
                <p>{user.username} ({user.age})years old</p>
              </div>
        )
      }
    </div>
  )
}

export default App
