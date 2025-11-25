import React, { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  TextField,
  Button,
  Stack
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import Layout from "../components/Layout";

export default function EmployeeFormPage() {
  const [form, setForm] = useState({
    firstName:"",lastName:"",email:"",department:"",position:"",salary:""
  });
  const [file, setFile] = useState(null);
  
  const {id} = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  
  useEffect(()=>{
    if(isEdit){
      axiosClient.get(`/employees/${id}`).then(res=>{
        setForm(res.data);
      });
    }
  },[id,isEdit]);

  const changeField = e =>
    setForm({...form, [e.target.name]: e.target.value});

  const submit = async(e)=>{
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([k,v])=>fd.append(k,v));
    if(file) fd.append("profileImage",file);

    if(isEdit) await axiosClient.put(`/employees/${id}`,fd);
    else await axiosClient.post("/employees",fd);

    navigate("/employees");
  };

  return (
    <Layout>
      <Paper sx={{p:4}}>
        <Typography variant="h4" fontWeight="bold" mb={3}>
          {isEdit ? "Update Employee" : "Add Employee"}
        </Typography>

        <form onSubmit={submit}>
          <Stack spacing={2}>
            <TextField label="First Name" name="firstName"
              value={form.firstName} onChange={changeField} />

            <TextField label="Last Name" name="lastName"
              value={form.lastName} onChange={changeField} />

            <TextField label="Email" name="email"
              value={form.email} onChange={changeField} />

            <TextField label="Department" name="department"
              value={form.department} onChange={changeField} />

            <TextField label="Position" name="position"
              value={form.position} onChange={changeField} />

            <TextField label="Salary" name="salary"
              value={form.salary} onChange={changeField} />

            <Button variant="outlined" component="label">
              Upload Image
              <input type="file" hidden onChange={e=>setFile(e.target.files[0])}/>
            </Button>

            <Stack direction="row" spacing={2}>
              <Button type="submit" variant="contained">Save</Button>
              <Button variant="outlined" color="error" onClick={()=>navigate("/employees")}>
                Cancel
              </Button>
            </Stack>

          </Stack>
        </form>
      </Paper>
    </Layout>
  );
}
