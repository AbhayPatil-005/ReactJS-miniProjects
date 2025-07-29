import Card from '../UI/Card'
import classes from './AvailableMeals.module.css'
import MealItem from './MealItem/MealItem'

const DUMMY_MEALS=[
    {
        id:'m1',
        name:'Sushi',
        description:'Finest fish and veggies',
        price: 22.99,
    },
    {
        id:'m2',
        name:'Schnitzel',
        description:'A german speciality',
        price: 16.5,
    },
    {
        id:'m3',
        name:"Barbecue burger",
        description:"America, Raw and Meaty",
        price: 12.99
    },
    {
        id:'m4',
        name:'Jolada Rotti & Playa',
        description:"India, Uttara karnataka meal",
        price: 10
    }
]
const AvailableMeals=props=>{
    const mealslist = DUMMY_MEALS.map((meal)=>
    <MealItem 
    key={meal.id}
    name={meal.name}
    description={meal.description}
    price={meal.price}
    />)
    return (<section className={classes.meals}>
        <Card>
        <ul>
            {mealslist}
        </ul>
        </Card>
    </section>)
}
export default AvailableMeals