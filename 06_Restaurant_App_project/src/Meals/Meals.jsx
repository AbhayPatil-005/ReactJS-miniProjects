import { Fragment } from "react"
import AvailableMeals from "./AvailableMeals"
import MealsSummmary from "./MealsSummary"


const Meals=props=>{
    return <Fragment>
        <MealsSummmary/>
        <AvailableMeals/>
    </Fragment>
}
export default Meals