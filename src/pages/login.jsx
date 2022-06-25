import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
const LoginPage = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  var uuid = require("uuid");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setSuccess(true);
          props.authed(true);
          localStorage.setItem("token", uuid.v4());
        } else {
          setError(data.message);
          props.authed(false);
        }
      })

      .catch((err) => console.log(err));
  };

  const errorMessage = (
    <div
      style={{
        backgroundColor: "rgba(255, 119, 46, 0.9)",
        width: "40%",
        borderRadius: "5px",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        fontSize: "1.25rem",
        color: "white",
        margin: "1.25rem",
      }}
    >
      <div style={{ alignSelf: "flex-end" }}>
        <button
          style={{ background: "none", border: "none" }}
          onClick={() => setError("")}
        >
          <FontAwesomeIcon icon={faX} />
        </button>
      </div>
      <p style={{ alignSelf: "center" }}>{error}</p>
    </div>
  );

  const successMessage = (
    <div
      style={{
        backgroundColor: "rgba(0, 255, 0, 0.9)",
        width: "40%",
        borderRadius: "5px",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        fontSize: "1.5rem",
        color: "white",
        margin: "1.25rem",
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
      <p style={{ alignSelf: "center" }}>Login successful!</p>
    </div>
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      {error != "" ? errorMessage : ""}
      {success ? <Navigate to="/home" /> : ""}
      <div
        style={{
          backgroundColor: "#1a5fba",
          width: "30%",
          borderRadius: "5px",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "2rem",
        }}
      >
        <h1 style={{ color: "white" }}>Login</h1>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            color: "white",
            fontSize: "1.25rem",
          }}
        >
          <label>Username:</label>
          <input
            style={{
              borderRadius: ".5rem",
              outline: "none",
              border: "none",
              fontSize: "1.5rem",
            }}
            type="text"
            name="username"
            onChange={handleUsernameChange}
          />
          <label>Password:</label>
          <input
            style={{
              borderRadius: ".5rem",
              outline: "none",
              border: "none",
              fontSize: "1.5rem",
            }}
            type="password"
            name="password"
            onChange={handlePasswordChange}
          />
          <input style={{ marginTop: "1.5rem" }} type="submit" value="Login" />
        </form>
      </div>
    </div>
  );
};
export default LoginPage;
