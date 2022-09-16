import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Copyright from "../components/Copyright";
import RegisterForm from "../components/Auth/RegisterForm";

const theme = createTheme();

function RegisterRequest() {
  const navigate = useNavigate();

  // Error State
  const [error, setError] = useState(false);

  // Registration Logic
  const userRegister = (values) => {
    const data = {
      UserName: values.username,
      Password: values.password,
    };
    const url = process.env.REACT_APP_API_URL + "/auth/register";
    setError(false);

    axios
      .post(url, data)
      .then((result) => {
        if (result.status === 200) {
          navigate("/");
        }
      })
      .catch((error) => {
        setError(true);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, width: 56, height: 56 }}>
            <HowToRegOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" margin="20px">
            SIGN UP
          </Typography>
          {error && (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              Something went wrong.<strong> Please try again!</strong>
            </Alert>
          )}
          <br />
          <RegisterForm submitHandler={userRegister} />
        </Box>
        <Copyright sx={{ mt: 3 }} />
      </Container>
    </ThemeProvider>
  );
}

export default RegisterRequest;
