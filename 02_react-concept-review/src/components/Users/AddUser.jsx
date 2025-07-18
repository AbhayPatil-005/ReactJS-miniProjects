// Write your code at relevant places in the code below:
import Card from "../UI/Card";
import "./AddUser.css";
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import { useState } from "react";

const AddUser = (props) => {
  const [userEnteredName, setUserName] = useState("");
  const [userEnteredAge, setUserAge] = useState("");
  const [error, setError] = useState();

  const setNameHandler =(event)=>{
    setUserName(event.target.value)
  }
  const setAgeHandler =(event)=>{
    setUserAge(event.target.value)
  }
  const addUserHandler = (event) => {
    event.preventDefault();
    if (userEnteredName.trim().length === 0 || userEnteredAge.trim().length === 0) {
      setError({
        title: 'Invalid Input',
      message: 'Please enter a valid username and age (non-empty values)',
    })
      return;
    }
    if (+userEnteredAge < 1) {
      setError({
        title: 'Invalid Input',
        message: 'Please enter a valid age (> 0)',
      })
      return;
    }
    props.onAddUser(userData)
    setUserName("");
    setUserAge("");
  };
  const errorHandler = () => {
    setError(null)
  }
  return (
    <div>
      {error && (<ErrorModal title={error.title} message={error.message} onConfirm={errorHandler} />)}
    <Card className="input">

      <form onSubmit={addUserHandler}>
          <label htmlFor="username" >Username</label>
          <input id="username" type="text" value={userEnteredName} onChange={setNameHandler}/>

          <label htmlFor="age">Age</label>
          <input id="age" type="number" onChange={setAgeHandler} value={userEnteredAge}/>

          <Button type="submit">Add User</Button>
      </form>

    </Card>
    </div>
  );
};

export default AddUser;
