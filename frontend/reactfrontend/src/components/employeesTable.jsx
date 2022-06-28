import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const EmployeesTable = (props) => {
  const [employees, setEmployees] = useState([]);
  const [showEditDropdown, setShowEditDropdown] = useState(false);
  const [showModal, setShowModal] = useState(0);
  const [employeeToEdit, setEmployeeToEdit] = useState("");
  const getEmployees = () => {
    fetch("http://127.0.0.1:3000/employees", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setEmployees(data);
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
  }, [showModal]);

  const handleChange = (event) => {
    setEmployeeToEdit({
      ...employeeToEdit,
      [event.target.name]: event.target.value,
    });
  };

  const handleEdit = (event) => {
    event.preventDefault();
    fetch("http://127.0.0.1:3000/employees/edit", {
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
      <table
        style={{
          borderCollapse: "collapse",
          width: "100%",
          borderRadius: ".25rem",
          boxShadow: "0 0.25rem 0.25rem rgba(0,0,0,0.15)",
        }}
      >
        <thead
          style={{
            backgroundColor: "#1d76cf",
            textAlign: "center",
            color: "white",
          }}
        >
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
          {employees.map((employee) => {
            let employeesCopy = [...employees];
            return (
              <tr key={employee.id}>
                <td style={{ padding: "1rem" }}>{employee.id}</td>
                <td style={{ padding: "1rem" }}>{employee.firstName}</td>
                <td style={{ padding: "1rem" }}>{employee.middleInitial}</td>
                <td style={{ padding: "1rem" }}>{employee.lastName}</td>
                <td style={{ padding: "1rem" }}>{employee.dateOfBirth}</td>
                <td style={{ padding: "1rem" }}>{employee.dateOfEmployment}</td>
                <td style={{ padding: "1rem" }}>
                  {employee.status ? (
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
                      padding: "1rem",
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
                            type="text"
                            value={employeeToEdit.firstName}
                            name="firstName"
                            onChange={handleChange}
                          />
                          <label style={{ marginTop: "1rem" }}>
                            Middle Initial
                          </label>
                          <input
                            type="text"
                            value={employeeToEdit.middleInitial}
                            name="middleInitial"
                            onChange={handleChange}
                          />
                          <label style={{ marginTop: "1rem" }}>Last Name</label>
                          <input
                            type="text"
                            value={employeeToEdit.lastName}
                            name="lastName"
                            onChange={handleChange}
                          />
                          <label style={{ marginTop: "1rem" }}>
                            Date of Birth
                          </label>
                          <input
                            type="text"
                            value={employeeToEdit.dateOfBirth}
                            name="dateOfBirth"
                            onChange={handleChange}
                          />
                          <label style={{ marginTop: "1rem" }}>
                            Date of Employment
                          </label>
                          <input
                            type="text"
                            value={employeeToEdit.dateOfEmployment}
                            name="dateOfEmployment"
                            onChange={handleChange}
                          />
                          <label style={{ marginTop: "1rem" }}>Status</label>
                          <select
                            value={employeeToEdit.status}
                            name="status"
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
                              boxShadow: "0 0.25rem 0.25rem rgba(0,0,0,0.15)",
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
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeesTable;
