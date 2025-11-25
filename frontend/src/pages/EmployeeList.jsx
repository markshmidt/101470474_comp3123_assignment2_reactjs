import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";

const EmployeeListPage = () => {
  const [employees, setEmployees] = useState([]);
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      const res = await axiosClient.get("/employees");
      setEmployees(res.data);
    } catch (err) {
      setError("Failed to load employees");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this employee?")) return;

    try {
      await axiosClient.delete(`/employees/${id}`);
      fetchEmployees();
    } catch (err) {
      alert("Delete failed");
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const params = {};
      if (department) params.department = department;
      if (position) params.position = position;
      const res = await axiosClient.get("/employees/search/filter", { params });
      setEmployees(res.data);
    } catch (err) {
      setError("Search failed");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="container">
      <h2>Employee List</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={() => navigate("/employees/add")}>Add Employee</button>

      <form onSubmit={handleSearch} style={{ marginTop: "10px" }}>
        <input
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
        <input
          placeholder="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
        <button type="submit">Search</button>
        <button type="button" onClick={fetchEmployees}>
          Reset
        </button>
      </form>

      <table border="1" cellPadding="6" style={{ marginTop: "10px" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id}>
              <td>{emp.firstName} {emp.lastName}</td>
              <td>{emp.email}</td>
              <td>{emp.department}</td>
              <td>{emp.position}</td>
              <td>
                <Link to={`/employees/${emp._id}`}>View</Link>{" "}
                <Link to={`/employees/${emp._id}/edit`}>Edit</Link>{" "}
                <button onClick={() => handleDelete(emp._id)}>Delete</button>
              </td>
            </tr>
          ))}
          {employees.length === 0 && (
            <tr>
              <td colSpan="5">No employees</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeListPage;
