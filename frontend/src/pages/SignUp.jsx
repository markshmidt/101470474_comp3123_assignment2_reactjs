import { useState } from "react";
import { TextField, Button, Typography, Paper, Box } from "@mui/material";
import axiosClient from "../api/axiosClient";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

export default function SignupPage() {
  const [form, setForm] = useState({
    firstName:"", lastName:"", email:"", password:""
  });
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const changeField = e => setForm({...form, [e.target.name]:e.target.value});

  const submit = async(e)=>{
    e.preventDefault();
    try {
      await axiosClient.post("/auth/signup", form);
      setMsg("Signup successful! You can login now.");
      setError("");
    } catch(err){
      setMsg("");
      setError("Signup failedL: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <Layout>
      <Paper sx={{ p:4 }}>
        <Typography variant="h4" mb={2} fontWeight="bold">Signup</Typography>

        <form onSubmit={submit}>

          <TextField fullWidth label="First Name" name="firstName" margin="normal"
            value={form.firstName} onChange={changeField} />

          <TextField fullWidth label="Last Name" name="lastName" margin="normal"
            value={form.lastName} onChange={changeField} />

          <TextField fullWidth label="Email" name="email" margin="normal"
            value={form.email} onChange={changeField} />

          <TextField fullWidth label="Password"
            type="password" name="password" margin="normal"
            value={form.password} onChange={changeField} />

          {msg && <Typography color="success.main">{msg}</Typography>}
          {error && <Typography color="error">{error}</Typography>}

          <Button type="submit" fullWidth variant="contained" sx={{mt:2}}>
            Signup
          </Button>
        </form>

        <Box mt={2}>
          <Typography>
            Already have an account? <Link to="/login">Login</Link>
          </Typography>
        </Box>

      </Paper>
    </Layout>
  );
}
