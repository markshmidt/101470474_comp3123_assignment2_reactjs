import { useState, useEffect } from "react";
import { Typography, Paper, Box, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import Layout from "../components/Layout";

export default function EmployeeDetailPage() {
  const {id} = useParams();
  const [emp, setEmp] = useState(null);
  const navigate = useNavigate();

  useEffect(()=>{
    axiosClient.get(`/employees/${id}`).then(res=>setEmp(res.data));
  },[id]);

  if(!emp) return null;

  return (
    <Layout>
      <Paper sx={{p:4}}>
        <Typography variant="h4" fontWeight="bold">Employee Profile</Typography>

        <Box mt={3}>
          {emp.profileImage && (
            <img src={`http://localhost:5000${emp.profileImage}`} style={{width:150}}/>
          )}
        </Box>

        <Typography mt={2}>Name: {emp.firstName} {emp.lastName}</Typography>
        <Typography>Email: {emp.email}</Typography>
        <Typography>Department: {emp.department}</Typography>
        <Typography>Position: {emp.position}</Typography>
        <Typography>Salary: {emp.salary}</Typography>

        <Button sx={{mt:3}} variant="contained"
          onClick={()=>navigate(`/employees/${id}/edit`)}
        >
          Edit
        </Button>
      </Paper>
    </Layout>
  );
}
