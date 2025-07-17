import Card from '../UI/Card';
import './UsersList.css';

const UsersList =(props)=>{
    // console.log(props.users)
    return(
        <Card className='users'>
        <ul className='class'>
            {props.users.map((item)=>(<li>{item.name} ({item.age}years old)</li>))}
        </ul>
        </Card>
    ) 
}

export default UsersList