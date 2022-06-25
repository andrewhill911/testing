import logo from "./logo.svg";
import "./App.css";
import EmployeesTable from "./components/employeesTable";
import { Link } from "react-router-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AddEmployeeForm from "./components/addEmployeeForm";
import AddEmployeePage from "./pages/addEmployee";
import HomePage from "./pages/home";
import store from "./redux/store";
import { Provider } from "react-redux";
import { useState, useEffect, Fragment } from "react";
import LoginPage from "./pages/login";
import RouteRequiresLogin from "./components/privateRoute";
import PrivateRoute from "./components/privateRoute";

const Private = ({ authed, Component }) => {
  const auth = authed; //your logic

  return auth ? <Component /> : <Navigate to="/login" />;
};

function App() {
  const [authed, setAuthed] = useState(false);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Fragment>
          <Routes>
            <Route
              path="/"
              element={<Private authed={authed} Component={HomePage} />}
            />
            <Route
              path="/home"
              element={<Private authed={authed} Component={HomePage} />}
            />
            <Route
              path="/addEmployee"
              element={<Private authed={authed} Component={AddEmployeePage} />}
            />

            <Route path="/login" element={<LoginPage authed={setAuthed} />} />
          </Routes>
        </Fragment>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
