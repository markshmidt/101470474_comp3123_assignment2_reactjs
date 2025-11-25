import { useState } from "react";
import { TextField, Button, Typography, Paper, Box } from "@mui/material";
import axiosClient from "../api/axiosClient";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

export default function LoginPage() {
  const [form, setForm] = useState({ email:"", password:"" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const changeField = e => setForm({...form, [e.target.name]:e.target.value});

  const submit = async(e)=>{
    e.preventDefault();
    try {
      const res = await axiosClient.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/employees");
    } catch(err){
      setError("Invalid login credentials");
    }
  };

  return (
    <Layout>
      <Paper sx={{ p:4 }}>
        <Typography variant="h4" fontWeight="bold" mb={2}>Login</Typography>

        <form onSubmit={submit}>
          <TextField fullWidth margin="normal" label="Email" name="email"
            value={form.email} onChange={changeField} />

          <TextField fullWidth margin="normal" type="password" label="Password"
            name="password" value={form.password} onChange={changeField}
          />

          {error && <Typography color="error">{error}</Typography>}

          <Button fullWidth variant="contained" sx={{mt:2}} type="submit">
            Login
          </Button>
        </form>

        <Box mt={2}>
          <Typography>
            Don’t have account? <Link to="/signup">Signup</Link>
          </Typography>
        </Box>
      </Paper>
    </Layout>
  )
}
