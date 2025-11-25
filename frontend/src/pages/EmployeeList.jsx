import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import Layout from "../components/Layout";

import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  TextField,
  Stack,
} from "@mui/material";

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';

const EmployeeListPage = () => {
  const [employees, setEmployees] = useState([]);
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    const res = await axiosClient.get("/employees");
    setEmployees(res.data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async(id)=>{
    if(!window.confirm("Are you sure?")) return;
    await axiosClient.delete(`/employees/${id}`);
    fetchEmployees();
  }
  const handleSearch = async (e)=>{
  e.preventDefault();

  const params = {};

  if (department.trim() !== "") params.department = department;
  if (position.trim() !== "") params.position = position;

  const res = await axiosClient.get("/employees/search/filter", { params });

  setEmployees(res.data);
};



  return (
  <Layout>

    <Box sx={{ width: '90%', mx: 'auto', mt: 5}}>

      <Typography variant="h4" fontWeight="bold" mb={3}>
        Employees List
      </Typography>

      {/* Search fields */}
     <form onSubmit={handleSearch}>
  <Stack direction="row" spacing={2} mb={3}>
    <TextField
      label="Department"
      value={department}
      onChange={(e)=>setDepartment(e.target.value)}
    />

    <TextField
      label="Position"
      value={position}
      onChange={(e)=>setPosition(e.target.value)}
    />

    <Button
      type="submit"
      variant="contained"
      color="primary"
    >
      Search
    </Button>

    <Button
      variant="outlined"
      color="secondary"
      onClick={() => {
        setDepartment("");
        setPosition("");
        fetchEmployees();
      }}
    >
      Reset
    </Button>
  </Stack>
</form>


      {/* Add employee */}
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon/>}
        onClick={()=>navigate("/employees/add")}
        sx={{mb:2}}
      >
        Add Employee
      </Button>

      {/* Employee Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor:"#eeeeee"}}>
            <TableRow>
              <TableCell>Full Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Position</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {employees.map(emp=>(
              <TableRow key={emp._id}>
                <TableCell>{emp.firstName} {emp.lastName}</TableCell>
                <TableCell>{emp.email}</TableCell>
                <TableCell>{emp.department}</TableCell>
                <TableCell>{emp.position}</TableCell>
                <TableCell align="center">
                  
                  <Button
                    size="small"
                    onClick={()=>navigate(`/employees/${emp._id}`)}
                    startIcon={<VisibilityIcon/>}
                  >
                    View
                  </Button>

                  <Button
                    size="small"
                    onClick={()=>navigate(`/employees/${emp._id}/edit`)}
                    startIcon={<EditIcon/>}
                  >
                    Edit
                  </Button>

                  <Button
                    size="small"
                    color="error"
                    startIcon={<DeleteIcon/>}
                    onClick={()=>handleDelete(emp._id)}
                  >
                    Delete
                  </Button>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>

    </Box>
    </Layout>
  );
};

export default EmployeeListPage;
