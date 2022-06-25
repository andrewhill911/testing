import React, { useEffect, useState } from "react";
import AddEmployeeForm from "../components/addEmployeeForm";
import NavBar from "../components/navBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

const AddEmployeePage = (props) => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const successDialog = (
    <div
      style={{
        backgroundColor: "rgba(94, 214, 75, 0.6)",
        width: "40%",
        borderRadius: "5px",

        padding: "10px",
        display: "flex",
        flexDirection: "column",
        margin: "1.25rem",
        color: "white",
        fontSize: "1.25rem",
      }}
    >
      <div style={{ alignSelf: "flex-end" }}>
        <button
          style={{ background: "none", border: "none" }}
          onClick={() => setSuccess(false)}
        >
          <FontAwesomeIcon icon={faX} />
        </button>
      </div>
      <p style={{ alignSelf: "center" }}>Employee added successfully!</p>
    </div>
  );
  const errorDialog = (
    <div>
      <h1>Error!</h1>
      <p>Employee not added!</p>
      <p>Check the console for details.</p>
    </div>
  );

  return (
    <div>
      <NavBar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <h1 style={{ color: "#fff", fontFamily: "Roboto", margin: "1.25rem" }}>
          Add Employee
        </h1>
        {success ? successDialog : ""}
        {error ? errorDialog : ""}
        <AddEmployeeForm handleSuccess={setSuccess} handleError={setError} />
      </div>
    </div>
  );
};
export default AddEmployeePage;
