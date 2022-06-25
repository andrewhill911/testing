import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AddEmployeePage from "./pages/addEmployee";
import HomePage from "./pages/home";
import store from "./redux/store";
import { Provider } from "react-redux";
import { useState, Fragment } from "react";
import LoginPage from "./pages/login";

const Private = ({ authed, Component }) => {
  const auth = localStorage.getItem("token");

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
