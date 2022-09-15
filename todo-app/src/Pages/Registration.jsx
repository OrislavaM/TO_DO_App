import React from "react";
import { useState } from "react";
import axios from "axios";
// import { useForm, Controller } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useFormik } from "formik";
// import { useNavigate } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Copyright from "../components/Copyright";

const theme = createTheme();

function RegisterRequest() {
    // const navigate = useNavigate();

    // Username/Password State
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");

    // Functions for Form
  const handleNameChange = (value) => {
    setName(value);
  };
  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  // TODO________________VALIDATION__________________________
  const schema = Yup.object({
    username: Yup.string()
      .min(5, "Mininum 5 characters")
      .max(20, "Maximum 20 characters")
      .required("You must enter a username"),
    password: Yup.string()
      .min(6, "Password is not secure")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (result, helpers) => {
      console.log(result)
      const handleRegister = (e) => {
        e.preventDefault();
        const data = {
          UserName: username,
          Password: password,
        };
        const url = "http://localhost:5108/api/web/v1/auth/register";

        axios
          .post(url, data)
          .then((result) => {
            if (result.status === 200) {
              return console.log("mes");
              // navigate("/");
            } else {
              console.log("User registered error!");
            }
          })
          .catch((error) => {
            console.log(error);
            helpers.setErrors({submit:error.message})
          });
      };
    }, validationSchema:schema
  });
  // TODO______________________________________________________

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
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
          <Typography component="h1" variant="h5">
            SIGN UP
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={formik.handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="text"
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="off"
                  error={formik.errors.username}
                  helperText={formik.errors.username}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="txtPassword"
                  label="Password"
                  type="password"
                  id="txtPassword"
                  autoComplete="new-password"
                  error={formik.errors.password}
                  helperText={formik.errors.password}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive daily reminders about my tasks."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

export default RegisterRequest;
