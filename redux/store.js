import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "../features/expensesSlice";

const store = configureStore({
  reducer: {
    expenses: expenseReducer, // Reducer for managing expenses
  },
});

export default store;
