import ExpenseItems from "./Components/ExpenseItems";

function App() {
  return (
    <div>
      <h1>Let's get Started</h1>
      <ExpenseItems 
        date={new Date(2023, 7, 15)}
        title="Pens"
        price="1"
        location="Bangalore"
      ></ExpenseItems>
      <ExpenseItems 
        date={new Date(2023, 3, 25)}
        title="Book"
        price="20"
        location="Delhi"
        ></ExpenseItems>
      <ExpenseItems 
        date={new Date(2023, 10, 11)}
        title="papers"
        price="5"
        location="Hyderabad"
        ></ExpenseItems>
      <ExpenseItems 
        date={new Date(2023, 1, 14)}
        title="Laptop"
        price="200"
        location="Mumbai"
        ></ExpenseItems>
    </div>
  );
}

export default App;
