import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  TextField,
  InputLabel,
  CircularProgress,
} from "@material-ui/core";
import * as routes from "../../constants/route-constants";
import { userService } from "../../services/user-service";
import { history } from "../../helpers/history";
import { useForm } from "../Other/useForm";

const initialFieldValues = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
};

export const Register = (props) => {
  const { setException } = props;
  const { values, errors, setErrors, handleInputChange } = useForm(
    initialFieldValues
  );

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if (!fieldValues.firstName) {
      temp.firstName = "Field cannot be blank.";
    }
    if (!fieldValues.lastName) {
      temp.lastName = "Field cannot be blank.";
    }
    if (!fieldValues.username) {
      temp.username = "Field cannot be blank.";
    }
    if (!fieldValues.email) {
      temp.email = "Field cannot be blank.";
    }
    if (!fieldValues.password) {
      temp.password = "Field cannot be blank.";
    }

    setErrors({ ...temp });

    if (
      !temp.firstName &&
      !temp.lastName &&
      !temp.username &&
      !temp.email &&
      !temp.password
    ) {
      return true;
    }
    return false;
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (validate()) {
      const user = {
        firstName: values.firstName,
        lastName: values.lastName,
        username: values.username,
        email: values.email,
        password: e.target.password.value,
      };

      (async () => {
        try {
          const response = await userService.register(user);
          (await response) && history.push(routes.LOG_IN);
        } catch (error) {
          setException(error);
        }
      })();
    }
  }

  return (
    <Grid container>
      <Grid item xs={1} sm={2} md={2} lg={3} xl={3} />
      <Grid item xs={10} sm={8} md={8} lg={6} xl={6}>
        <React.Fragment>
          <h2 className="mrgn-t8">Register</h2>
          <form name="form" onSubmit={handleSubmit}>
            <InputLabel className="mrgn-t8" htmlFor="firstName">
              First Name
            </InputLabel>
            <TextField
              type="text"
              name="firstName"
              fullWidth
              value={values.firstName}
              onChange={handleInputChange}
              variant="outlined"
              {...(errors &&
                errors.firstName && {
                  error: true,
                  helperText: errors.firstName,
                })}
            />

            <InputLabel className="mrgn-t8" htmlFor="lastName">
              Last Name
            </InputLabel>
            <TextField
              type="text"
              name="lastName"
              fullWidth
              value={values.lastName}
              onChange={handleInputChange}
              variant="outlined"
              {...(errors &&
                errors.lastName && {
                  error: true,
                  helperText: errors.lastName,
                })}
            />

            <InputLabel className="mrgn-t8" htmlFor="username">
              Username
            </InputLabel>
            <TextField
              type="text"
              name="username"
              fullWidth
              value={values.username}
              onChange={handleInputChange}
              variant="outlined"
              {...(errors &&
                errors.username && {
                  error: true,
                  helperText: errors.username,
                })}
            />

            <InputLabel className="mrgn-t8" htmlFor="email">
              Email
            </InputLabel>
            <TextField
              type="text"
              name="email"
              fullWidth
              value={values.email}
              onChange={handleInputChange}
              variant="outlined"
              {...(errors &&
                errors.email && {
                  error: true,
                  helperText: errors.email,
                })}
            />

            <InputLabel className="mrgn-t8" htmlFor="password">
              Password
            </InputLabel>
            <TextField
              type="password"
              name="password"
              fullWidth
              value={values.password}
              onChange={handleInputChange}
              variant="outlined"
              {...(errors &&
                errors.password && {
                  error: true,
                  helperText: errors.password,
                })}
            />

            <div className="mrgn-t8">
              <Button className="button blue-background" href={routes.LANDING}>
                Cancel
              </Button>
              <Button
                className="button blue-background float-right"
                type="submit"
              >
                Register
              </Button>
            </div>
          </form>
        </React.Fragment>
      </Grid>
      <Grid item xs={1} sm={2} md={2} lg={3} xl={3} />
    </Grid>
  );
};
