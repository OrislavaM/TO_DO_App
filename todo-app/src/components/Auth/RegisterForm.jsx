import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";

import FormInput from "../FormInput/FormInput";

const initialValues = {
  username: "",
  password: "",
};

const RegisterForm = (props) => {
  return (
    <Formik
      initialValues={initialValues}
      validateOnBlur={false}
      enableReinitialize={true}
      validationSchema={Yup.object({
        username: Yup.string()
          .min(5, "Mininum 5 characters")
          .max(20, "Maximum 20 characters")
          .required("You must enter a username"),
        password: Yup.string()
          .min(6, "Password is not secure")
          .required("Password is required"),
      })}
      onSubmit={(values, formik) => {
        props.submitHandler(values, formik);
      }}
    >
      {(formProps) => {
        return (
          <form
            onSubmit={formProps.handleSubmit}
            style={{ maxWidth: "400px", margin: "0 auto 5px" }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormInput
                  name="username"
                  type="text"
                  label="Username*"
                  isrequired="true"
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12}>
                <FormInput name="password" type="password" label="Password*" />
              </Grid>
            </Grid>
            <Grid item xs={12} style={{ marginTop: "30px" }}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive daily reminders about my tasks."
              />
            </Grid>

            <Grid container justifyContent="center">
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
            </Grid>
          </form>
        );
      }}
    </Formik>
  );
};

export default RegisterForm;
