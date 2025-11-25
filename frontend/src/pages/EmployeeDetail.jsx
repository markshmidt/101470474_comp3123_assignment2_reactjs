import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosClient from "../api/axiosClient";

const EmployeeDetailPage = () => {
  const { id } = useParams();
  const [emp, setEmp] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await axiosClient.get(`/employees/${id}`);
        setEmp(res.data);
      } catch (err) {
        setError("Failed to load employee");
      }
    };
    fetchEmployee();
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!emp) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>Employee Details</h2>

      {emp.profileImage && (
        <img
          src={`http://localhost:5000${emp.profileImage}`}
          alt="profile"
          style={{ width: "150px" }}
        />
      )}

      <p><strong>Name:</strong> {emp.firstName} {emp.lastName}</p>
      <p><strong>Email:</strong> {emp.email}</p>
      <p><strong>Department:</strong> {emp.department}</p>
      <p><strong>Position:</strong> {emp.position}</p>
      <p><strong>Salary:</strong> {emp.salary}</p>

      <Link to={`/employees/${emp._id}/edit`}>Edit</Link>
    </div>
  );
};

export default EmployeeDetailPage;
