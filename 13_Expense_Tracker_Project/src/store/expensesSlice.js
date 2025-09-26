import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  expenses: [],
};

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    setExpenses(state, action) {
      state.expenses = action.payload;
    },
    addExpense(state, action) {
      state.expenses.push(action.payload);
    },
    updateExpense(state, action) {
      const idx = state.expenses.findIndex(exp => exp.id === action.payload.id);
      if (idx !== -1) state.expenses[idx] = action.payload;
    },
    deleteExpense(state, action) {
      state.expenses = state.expenses.filter(exp => exp.id !== action.payload);
    },
  },
});

export const { setExpenses, addExpense, updateExpense, deleteExpense } = expensesSlice.actions;
export default expensesSlice.reducer;
