import { Link as RouterLink, useNavigate } from "react-router-dom";
  import { Link as MUILink } from "@mui/material";
import {
    Container,
    Typography,
    TextField,
    Button,
    Box,
    Paper,
    Grid,
    Alert,
  } from "@mui/material";
  import { useState } from "react";
  
  
  function LoginPage() {
    const [formData, setFormData] = useState({
      mobile: "", 

      password: "",
    });
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      setError("");
      setSuccess("");
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const res = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  
        const data = await res.json();
  
        if (!res.ok) {
          if (data.errors) {
            setError(data.errors[0].msg);
          } else {
            setError(data.error || "Login failed");
          }
        } else {
          setSuccess("Login successful!");
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
        
          // Redirect to dashboard based on role
        if (data.user.role === "admin") {
          navigate("/Admin"); // admin route to admindashboard
        } else {
          navigate("/User"); //user route to userdashboard
        }
          
        }
      } catch (err) {
        setError("Something went wrong. Try again.");
      }
    };
  
    return (
      <Container maxWidth="xs" sx={{ py: 6 }}>
        <Paper elevation={4} sx={{ p: 4, borderRadius: 4, bgcolor: "background.paper" }}>
          <Typography variant="h4" align="center" color="warning.main" gutterBottom>
            Login to Your Account
          </Typography>
  
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}
  
          <Box component="form" onSubmit={handleSubmit} mt={3}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Mobile Number"
                   name="mobile"
                  type="tel"
                  inputProps={{ pattern: "[0-9]{10}" }}
                  value={formData.mobile}
                  onChange={handleChange}
                  fullWidth
                  required
                  variant="outlined"
                />
              </Grid>
  
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  fullWidth
                  required
                  variant="outlined"
                />
              </Grid>
            </Grid>
  
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              fullWidth
              sx={{ mt: 3, py: 1.2 }}
            >
              Login
            </Button>
          
          
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Don't have an account?{" "}
            <MUILink component={RouterLink} to="/signup" color="secondary"  underline="hover" sx={{ fontWeight: 500 }}>
             Register here
            </MUILink>
        </Typography>


          </Box>
        </Paper>
      </Container>
    );
  }
  
  export default LoginPage;
  