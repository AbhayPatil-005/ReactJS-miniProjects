// Write your code at relevant places in the code below:
import Card from "../UI/Card";
import "./AddUser.css";
import Button from '../UI/Button';
import { useState } from "react";

const AddUser = () => {
  const [userEnteredName, setUserName] = useState("");
  const [userEnteredAge, setUserAge] = useState("");

  const setNameHandler =(event)=>{
    setUserName(event.target.value)
  }
  const setAgeHandler =(event)=>{
    setUserAge(event.target.value)
  }
  const addUserHandler = (event) => {
    event.preventDefault();
    console.log(userEnteredName,userEnteredAge);
    setUserName("");
    setUserAge("");
  };

  return (
    <Card className="input">

      <form onSubmit={addUserHandler}>
          <label htmlFor="username" >Username</label>
          <input id="username" type="text" value={userEnteredName} onChange={setNameHandler}/>

          <label htmlFor="age">Age</label>
          <input id="age" type="number" onChange={setAgeHandler} value={userEnteredAge}/>

          <Button type="submit">Add User</Button>
      </form>

    </Card>
  );
};

export default AddUser;
