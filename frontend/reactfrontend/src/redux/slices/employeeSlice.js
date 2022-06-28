import { createSlice } from "@reduxjs/toolkit";

export const employeeSlice = createSlice({
  name: "employeeSlice",
  initialState: {
    employees: [],
  },
  reducers: {
    getAllEmployees: (state, action) => {
      state.employees = action.payload;
    },
  },
});
export const { getAllEmployees } = employeeSlice.actions;
export default employeeSlice.reducer;
