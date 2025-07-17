
// import Card from './components/UI/Card'
import { useState } from 'react';
import AddUser from './components/Users/AddUser';
import UsersList from './components/Users/UsersList';

function App() {
  const [users, setUsers] = useState([]);
  const userListHandler =(user)=>{
    setUsers((prevState)=>[...prevState,user])
  }
  console.log(users)
  return (
    <div>
      <AddUser onAddUser={userListHandler}/>
      <UsersList users={users}/>
    </div>
  );
}

export default App;
