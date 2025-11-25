import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../api/axiosClient";

const EmployeeFormPage = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    position: "",
    salary: "",
  });
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const { id } = useParams(); // if exists -> edit
  const navigate = useNavigate();

  const isEdit = !!id;

  useEffect(() => {
    const fetchEmployee = async () => {
      if (!isEdit) return;
      try {
        const res = await axiosClient.get(`/employees/${id}`);
        setForm({
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          email: res.data.email,
          department: res.data.department,
          position: res.data.position,
          salary: res.data.salary,
        });
      } catch (err) {
        setError("Failed to load employee");
      }
    };
    fetchEmployee();
  }, [id, isEdit]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });
      if (file) {
        formData.append("profileImage", file);
      }

      if (isEdit) {
        await axiosClient.put(`/employees/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axiosClient.post("/employees", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      navigate("/employees");
    } catch (err) {
      setError("Save failed");
    }
  };

  return (
    <div className="container">
      <h2>{isEdit ? "Edit Employee" : "Add Employee"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Last Name</label>
          <input name="lastName" value={form.lastName} onChange={handleChange} />
        </div>

        <div>
          <label>Email</label>
          <input name="email" value={form.email} onChange={handleChange} />
        </div>

        <div>
          <label>Department</label>
          <input
            name="department"
            value={form.department}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Position</label>
          <input
            name="position"
            value={form.position}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Salary</label>
          <input
            name="salary"
            type="number"
            value={form.salary}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Profile picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <button type="submit">{isEdit ? "Update" : "Create"}</button>
      </form>
    </div>
  );
};

export default EmployeeFormPage;
