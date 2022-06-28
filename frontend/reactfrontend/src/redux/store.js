import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { employeeSlice } from "./slices/employeeSlice";
export default configureStore({
  reducer: combineReducers({
    employeeSlice: employeeSlice.reducer,
  }),
});
