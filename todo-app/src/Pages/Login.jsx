import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import Typography from "@mui/material/Typography";
import Cover from "../img/COVER_TODO.png";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Copyright from "../components/Copyright";
import LoginForm from "../components/Auth/LoginForm";

const theme = createTheme();

function Login() {
  const navigate = useNavigate();

  // Error State
  const [error, setError] = useState(false);

  const userLogin = (values) => {
    const data = {
      UserName: values.username,
      Password: values.password,
    };
    const url = process.env.REACT_APP_API_URL + "/auth";
    setError(false);

    axios
      .post(url, data)
      .then((result) => {
        if (result.status === 200) {
          localStorage.setItem(
            "todo_token",
            result.data.authorization.accessToken,
          );
          localStorage.setItem(
            "todo_userId",
            result.data.user.id,
          );
          navigate("/todo_profile");
        }
      })
      .catch((error) => {
        setError(true);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container component="main" sx={{ height: "100vh" }}>
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
            <Avatar sx={{ m: 1, width: 56, height: 56 }}>
              <LockPersonIcon />
            </Avatar>
            <Typography component="h1" variant="h5" margin="20px">
              LOGIN
            </Typography>
            {error && (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              Something went wrong.<strong> Please try again!</strong>
            </Alert>
          )}
          <br />
          <LoginForm submitHandler={userLogin} />
          <Copyright sx={{ mt: 3 }} />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Login;
