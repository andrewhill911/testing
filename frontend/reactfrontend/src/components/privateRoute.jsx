import React, { useState, useEffect } from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import LoginPage from "../pages/login";
const PrivateRoute = props => {
   
   const userIsLogged = props.authed;

   useEffect(() => {
      console.log("TEST");
         
   }, []);

   return (
      userIsLogged ? <Outlet/>: <Navigate to="login"/>
   );
};

export default PrivateRoute;