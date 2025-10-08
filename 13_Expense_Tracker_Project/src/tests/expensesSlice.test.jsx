import expensesReducer, { addExpense, setExpenses, updateExpense, deleteExpense } from '../store/expensesSlice';

test('expenses reducer basic operations', () => {
  let s = { expenses: [] };
  s = expensesReducer(s, setExpenses([{ id: '1', amount: 10 }]));
  expect(s.expenses.length).toBe(1);
  s = expensesReducer(s, addExpense({ id: '2', amount: 20 }));
  expect(s.expenses.length).toBe(2);
  s = expensesReducer(s, updateExpense({ id: '2', amount: 25 }));
  expect(s.expenses.find(e => e.id === '2').amount).toBe(25);
  s = expensesReducer(s, deleteExpense('1'));
  expect(s.expenses.find(e => e.id === '1')).toBeUndefined();
});