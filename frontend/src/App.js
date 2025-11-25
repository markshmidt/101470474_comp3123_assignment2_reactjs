import React from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/SignUp";
import EmployeeList from "./pages/EmployeeList";
import EmployeeDetail from "./pages/EmployeeDetail";
import EmployeeForm from "./pages/EmployeeForm";
import NavBar from "./components/NavBar";
const isLoggedIn = () => !!localStorage.getItem("token");

const App = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
   <>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/employees"
          element={isLoggedIn() ? <EmployeeList /> : <Navigate to="/login" />}
        />
        <Route
          path="/employees/add"
          element={isLoggedIn() ? <EmployeeForm /> : <Navigate to="/login" />}
        />
        <Route
          path="/employees/:id"
          element={isLoggedIn() ? <EmployeeDetail /> : <Navigate to="/login" />}
        />
        <Route
          path="/employees/:id/edit"
          element={isLoggedIn() ? <EmployeeForm /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
};

export default App;
