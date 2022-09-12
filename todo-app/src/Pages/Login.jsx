import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import Typography from "@mui/material/Typography";
import Cover from "../img/COVER_TODO.png";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Copyright from "../components/Copyright";

const theme = createTheme();

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleNameChange = (value) => {
    setName(value);
  };
  const handlePasswordChange = (value) => {
    setPassword(value);
  };
  const handleLogin = (e) => {
    e.preventDefault()
    const data = {
      UserName: name,
      Password: password,
    };
    const url = "http://localhost:5108/api/web/v1/auth";

    axios
      .post(url, data)
      .then((result) => {

        console.log(result);
        if (result.status === 200) {
            localStorage.setItem('todo_token', result.data.authorization.accessToken)
            navigate("/todo_profile");
          } else {
            console.log("User registered error!");
          };
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${Cover})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "dark"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "140%",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 12,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, width: 56, height: 56  }}>
              <LockPersonIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              LOGIN
            </Typography>
            <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                type="text"
                id="txtName"
                label="Enter the name"
                name="txtName"
                autoComplete="name"
                onChange={(e) => handleNameChange(e.target.value)}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="txtPassword"
                label="Password"
                type="password"
                id="txtPassword"
                onChange={(e) => handlePasswordChange(e.target.value)}
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/registration" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Login;
