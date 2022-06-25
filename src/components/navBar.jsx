import React from "react";
import { Link } from "react-router-dom";
const NavBar = (props) => {
  //clear token from local storage and refresh page
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div
      style={{
        backgroundColor: "#1a5fba",
        width: "100%",
        height: "10%",
        display: "flex",
        padding: "1rem",
      }}
    >
      <Link
        style={{ color: "white", textDecoration: "none", fontSize: "1.25rem" }}
        to="/"
      >
        Home
      </Link>
      <Link
        style={{
          marginLeft: "2rem",
          color: "white",
          textDecoration: "none",
          fontSize: "1.25rem",
        }}
        to="/addEmployee"
      >
        Add Employee
      </Link>
      <button
        style={{
          alignSelf: "flex-end",
          marginLeft: "90rem",
          border: "none",
          borderRadius: "5px",
        }}
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default NavBar;
