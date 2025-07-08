import './ExpenseDate.css'

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]


function ExpenseDate(props){
    const month = months[props.expenseDate.getMonth()];
    const year = props.expenseDate.getFullYear();
    const date = props.expenseDate.getDate();
    const day = String(date).padStart(2,"0");
    return(
    <div className="expense-date">
        <div className="expense-date__year">{year}</div>
        <div className="expense-date__month">{month}</div>
        <div className="expense-date__date">{day}</div>
    </div>)
}
export default ExpenseDate;