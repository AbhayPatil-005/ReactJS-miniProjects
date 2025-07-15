// Write your code below:
const AddUser = (props) => {
  function addUserHandler(event) {
    event.preventDefault()
    const userData = {
      username: event.target.username.value,
      age: event.target.age.value
    }
    props.onAddUser(userData)

  }
  return (
    <form onSubmit={addUserHandler}>
      <div>
        <div>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" />
        </div>

        <div>
          <label htmlFor="age">Age</label>
          <input id="age" type="number" min="0" max="100" />
        </div>
        
          <div>
            <button type="submit">Add User</button>
          </div>
      </div>
    </form>
  )
}

export default AddUser