import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function NavBar() {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));

  // Watch token changes
  useEffect(() => {
    const interval = setInterval(() => {
      setLoggedIn(!!localStorage.getItem("token"));
    }, 300);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    navigate("/login");
  };

  return (
    <AppBar position="static" sx={{ background: "#1976d2" }}>
      <Toolbar>
        {/* Logo */}
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={() => navigate("/employees")}
        >
          Employee Management
        </Typography>

        {/* Logged-in menu */}
        {loggedIn && (
          <>
            <Button color="inherit" component={Link} to="/employees">
              Employees
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}

        {/* Logged-out menu */}
        {!loggedIn && (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Signup
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
