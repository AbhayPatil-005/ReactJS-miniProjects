import './Expenses.css'
import { useState } from 'react';
import ExpenseItems from './ExpenseItems';
import Card from '../UI/Card'
import ExpensesFilter from './ExpensesFilter';
import ExpensesChart from './ExpensesChart';

function Expenses(props){
  const [filteredYear, setFilteredYear] = useState('2023');

  const changeFilterHandler = (selectedYear)=>{
      setFilteredYear(selectedYear);
  }
  const filteredExpenses = props.expenses.filter((expense)=>{
    return expense.date.getFullYear().toString()=== filteredYear;
  })
return (
  <Card className='expenses'>
    <ExpensesFilter 
    selected={filteredYear} 
    onChangeFilter={changeFilterHandler}
    />
    <ExpensesChart filteredExpensesForChart={filteredExpenses}></ExpensesChart>
    {filteredExpenses.map((expense,index)=>{
        return (
        <ExpenseItems 
          key={expense.id}
          date={expense.date}
          title={expense.title}
          price={expense.price}
          location={expense.location}
        ></ExpenseItems>
        )
      }
    )}
  </Card>)
}

export default Expenses;