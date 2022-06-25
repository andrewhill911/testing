import React, { useState, useEffect } from "react";
import { Modal, Table } from "react-bootstrap";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import { getAllEmployees } from "../redux/slices/employeeSlice";
import store from "../redux/store";
const EmployeesTable = (props) => {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(0);
  const [employeeToEdit, setEmployeeToEdit] = useState("");
  const [hideInactive, setHideInactive] = useState(false);

  const dispatch = useDispatch();
  store.subscribe(() => {
    setEmployees(store.getState().employeeSlice.employees);
  });
  const getEmployees = () => {
    fetch("http://127.0.0.1:5000/employees", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(getAllEmployees(data));
        console.log(store.getState());
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getEmployees();
  }, []);

  useEffect(() => {
    if (showModal === 0 && employeeToEdit !== "") {
      window.location.reload();
    }
  }, [showModal, employeeToEdit]);

  const handleChange = (event) => {
    setEmployeeToEdit({
      ...employeeToEdit,
      [event.target.name]: event.target.value,
    });
  };

  const handleEdit = (event) => {
    event.preventDefault();
    fetch("https://motobyoapp.herokuapp.com/employees/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(employeeToEdit),
    })
      .then((res) => console.log(res))

      .catch((err) => console.log(err));
    hideModal();
  };

  const getModal = (employee) => {
    setShowModal(employee.id);

    setEmployeeToEdit(employee);
  };
  const hideModal = () => {
    setShowModal(0);
    getEmployees();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      {!hideInactive ? (
        <button onClick={() => setHideInactive(true)}>Hide Inactive</button>
      ) : (
        <button onClick={() => setHideInactive(false)}>Show Inactive</button>
      )}
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th style={{ padding: "1rem" }}>ID</th>
            <th style={{ padding: "1rem" }}>First Name</th>
            <th style={{ padding: "1rem" }}>Middle Initial</th>
            <th style={{ padding: "1rem" }}>Last Name</th>
            <th style={{ padding: "1rem" }}>Date of Birth</th>
            <th style={{ padding: "1rem" }}>Date of Employment</th>
            <th style={{ padding: "1rem" }}>Status</th>
            <th style={{ padding: "1rem" }}>Edit</th>
          </tr>
        </thead>
        <tbody style={{ backgroundColor: "#eee" }}>
          {employees.length > 0
            ? employees.map((employee) => {
                return (
                  <>
                    {!hideInactive ? (
                      <tr key={employee.id}>
                        <td style={{ padding: "1rem" }}>{employee.id}</td>
                        <td style={{ padding: "1rem" }}>
                          {employee.firstName}
                        </td>
                        <td style={{ padding: "1rem" }}>
                          {employee.middleInitial}
                        </td>
                        <td style={{ padding: "1rem" }}>{employee.lastName}</td>
                        <td style={{ padding: "1rem" }}>
                          {employee.dateOfBirth}
                        </td>
                        <td style={{ padding: "1rem" }}>
                          {employee.dateOfEmployment}
                        </td>
                        <td style={{ padding: "1rem" }}>
                          {employee.active ? (
                            <span style={{ color: "green" }}>Active</span>
                          ) : (
                            <span style={{ color: "red" }}>Inactive</span>
                          )}
                        </td>
                        <td style={{ padding: "1rem" }}>
                          <button
                            style={{
                              backgroundColor: "#1d76cf",
                              color: "white",
                              border: "none",
                              width: "100%",

                              borderRadius: ".25rem",
                              boxShadow: "0 0.25rem 0.25rem rgba(0,0,0,0.15)",
                              cursor: "pointer",
                            }}
                            onClick={() => getModal(employee)}
                          >
                            Edit
                          </button>
                          <Modal
                            dialogClassName="modalTest"
                            centered={true}
                            show={showModal === employee.id}
                            onHide={() => hideModal(employee.id)}
                          >
                            <Modal.Header centered={true}>
                              <Modal.Title>Edit Employee</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <form onSubmit={handleEdit}>
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                  }}
                                >
                                  <label style={{ marginTop: "1rem" }}>
                                    First Name
                                  </label>
                                  <input
                                    style={{
                                      background: "none",
                                      marginTop: "1.5rem",
                                      outline: "none",
                                      border: "none",
                                      borderBottom: "1px solid grey",
                                      fontSize: "1.25rem",
                                    }}
                                    type="text"
                                    value={employeeToEdit.firstName}
                                    name="firstName"
                                    onChange={handleChange}
                                  />
                                  <label style={{ marginTop: "1rem" }}>
                                    Middle Initial
                                  </label>
                                  <input
                                    style={{
                                      background: "none",
                                      marginTop: "1.5rem",
                                      outline: "none",
                                      border: "none",
                                      borderBottom: "1px solid grey",
                                      fontSize: "1.25rem",
                                    }}
                                    type="text"
                                    value={employeeToEdit.middleInitial}
                                    name="middleInitial"
                                    onChange={handleChange}
                                  />
                                  <label style={{ marginTop: "1rem" }}>
                                    Last Name
                                  </label>
                                  <input
                                    style={{
                                      background: "none",
                                      marginTop: "1.5rem",
                                      outline: "none",
                                      border: "none",
                                      borderBottom: "1px solid grey",
                                      fontSize: "1.25rem",
                                    }}
                                    type="text"
                                    value={employeeToEdit.lastName}
                                    name="lastName"
                                    onChange={handleChange}
                                  />
                                  <label style={{ marginTop: "1rem" }}>
                                    Date of Birth
                                  </label>
                                  <input
                                    style={{
                                      background: "none",
                                      marginTop: "1.5rem",
                                      outline: "none",
                                      border: "none",
                                      borderBottom: "1px solid grey",
                                      fontSize: "1.25rem",
                                    }}
                                    type="text"
                                    value={employeeToEdit.dateOfBirth}
                                    name="dateOfBirth"
                                    onChange={handleChange}
                                  />
                                  <label style={{ marginTop: "1rem" }}>
                                    Date of Employment
                                  </label>
                                  <input
                                    style={{
                                      background: "none",
                                      marginTop: "1.5rem",
                                      outline: "none",
                                      border: "none",
                                      borderBottom: "1px solid grey",
                                      fontSize: "1.25rem",
                                    }}
                                    type="text"
                                    value={employeeToEdit.dateOfEmployment}
                                    name="dateOfEmployment"
                                    onChange={handleChange}
                                  />
                                  <label style={{ marginTop: "1rem" }}>
                                    Status
                                  </label>
                                  <select
                                    value={employeeToEdit.active}
                                    name="active"
                                    onChange={handleChange}
                                  >
                                    <option value={true}>Active</option>
                                    <option value={false}>Inactive</option>
                                  </select>

                                  <button
                                    style={{
                                      backgroundColor: "#1d76cf",
                                      color: "white",
                                      border: "none",
                                      padding: "1rem",
                                      borderRadius: ".25rem",
                                      boxShadow:
                                        "0 0.25rem 0.25rem rgba(0,0,0,0.15)",
                                      cursor: "pointer",
                                      marginTop: "1rem",
                                    }}
                                  >
                                    Submit
                                  </button>
                                </div>
                              </form>
                            </Modal.Body>
                          </Modal>
                        </td>
                      </tr>
                    ) : (
                      <>
                        {!employee.active ? (
                          <tr key={employee.id}>
                            <td style={{ padding: "1rem" }}>{employee.id}</td>
                            <td style={{ padding: "1rem" }}>
                              {employee.firstName}
                            </td>
                            <td style={{ padding: "1rem" }}>
                              {employee.middleInitial}
                            </td>
                            <td style={{ padding: "1rem" }}>
                              {employee.lastName}
                            </td>
                            <td style={{ padding: "1rem" }}>
                              {employee.dateOfBirth}
                            </td>
                            <td style={{ padding: "1rem" }}>
                              {employee.dateOfEmployment}
                            </td>
                            <td style={{ padding: "1rem" }}>
                              {employee.active ? (
                                <span style={{ color: "green" }}>Active</span>
                              ) : (
                                <span style={{ color: "red" }}>Inactive</span>
                              )}
                            </td>
                            <td style={{ padding: "1rem" }}>
                              <button
                                style={{
                                  backgroundColor: "#1d76cf",
                                  color: "white",
                                  border: "none",
                                  width: "100%",

                                  borderRadius: ".25rem",
                                  boxShadow:
                                    "0 0.25rem 0.25rem rgba(0,0,0,0.15)",
                                  cursor: "pointer",
                                }}
                                onClick={() => getModal(employee)}
                              >
                                Edit
                              </button>
                              <Modal
                                dialogClassName="modalTest"
                                centered={true}
                                show={showModal === employee.id}
                                onHide={() => hideModal(employee.id)}
                              >
                                <Modal.Header centered={true}>
                                  <Modal.Title>Edit Employee</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                  <form onSubmit={handleEdit}>
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                      }}
                                    >
                                      <label style={{ marginTop: "1rem" }}>
                                        First Name
                                      </label>
                                      <input
                                        style={{
                                          background: "none",
                                          marginTop: "1.5rem",
                                          outline: "none",
                                          border: "none",
                                          borderBottom: "1px solid grey",
                                          fontSize: "1.25rem",
                                        }}
                                        type="text"
                                        value={employeeToEdit.firstName}
                                        name="firstName"
                                        onChange={handleChange}
                                      />
                                      <label style={{ marginTop: "1rem" }}>
                                        Middle Initial
                                      </label>
                                      <input
                                        style={{
                                          background: "none",
                                          marginTop: "1.5rem",
                                          outline: "none",
                                          border: "none",
                                          borderBottom: "1px solid grey",
                                          fontSize: "1.25rem",
                                        }}
                                        type="text"
                                        value={employeeToEdit.middleInitial}
                                        name="middleInitial"
                                        onChange={handleChange}
                                      />
                                      <label style={{ marginTop: "1rem" }}>
                                        Last Name
                                      </label>
                                      <input
                                        style={{
                                          background: "none",
                                          marginTop: "1.5rem",
                                          outline: "none",
                                          border: "none",
                                          borderBottom: "1px solid grey",
                                          fontSize: "1.25rem",
                                        }}
                                        type="text"
                                        value={employeeToEdit.lastName}
                                        name="lastName"
                                        onChange={handleChange}
                                      />
                                      <label style={{ marginTop: "1rem" }}>
                                        Date of Birth
                                      </label>
                                      <input
                                        style={{
                                          background: "none",
                                          marginTop: "1.5rem",
                                          outline: "none",
                                          border: "none",
                                          borderBottom: "1px solid grey",
                                          fontSize: "1.25rem",
                                        }}
                                        type="text"
                                        value={employeeToEdit.dateOfBirth}
                                        name="dateOfBirth"
                                        onChange={handleChange}
                                      />
                                      <label style={{ marginTop: "1rem" }}>
                                        Date of Employment
                                      </label>
                                      <input
                                        style={{
                                          background: "none",
                                          marginTop: "1.5rem",
                                          outline: "none",
                                          border: "none",
                                          borderBottom: "1px solid grey",
                                          fontSize: "1.25rem",
                                        }}
                                        type="text"
                                        value={employeeToEdit.dateOfEmployment}
                                        name="dateOfEmployment"
                                        onChange={handleChange}
                                      />
                                      <label style={{ marginTop: "1rem" }}>
                                        Status
                                      </label>
                                      <select
                                        value={employeeToEdit.active}
                                        name="active"
                                        onChange={handleChange}
                                      >
                                        <option value={true}>Active</option>
                                        <option value={false}>Inactive</option>
                                      </select>

                                      <button
                                        style={{
                                          backgroundColor: "#1d76cf",
                                          color: "white",
                                          border: "none",
                                          padding: "1rem",
                                          borderRadius: ".25rem",
                                          boxShadow:
                                            "0 0.25rem 0.25rem rgba(0,0,0,0.15)",
                                          cursor: "pointer",
                                          marginTop: "1rem",
                                        }}
                                      >
                                        Submit
                                      </button>
                                    </div>
                                  </form>
                                </Modal.Body>
                              </Modal>
                            </td>
                          </tr>
                        ) : null}
                      </>
                    )}
                  </>
                );
              })
            : null}
        </tbody>
      </Table>
    </div>
  );
};

export default EmployeesTable;
