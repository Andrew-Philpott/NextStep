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

export const Register = () => {
  const { values, handleInputChange } = useForm(initialFieldValues);
  const [registering, setRegistering] = useState(false);

  useEffect(() => {
    userService.logout();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    if (
      values.firstName &&
      values.lastName &&
      values.username &&
      values.email &&
      values.password
    ) {
      const user = {
        firstName: values.firstName,
        lastName: values.lastName,
        username: values.username,
        email: values.email,
        password: e.target.password.value,
      };
      setRegistering(true);
      userService
        .register(user)
        .then(history.push(routes.LOG_IN))
        .catch((error) => console.log(error));
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
            {registering && <CircularProgress />}
          </form>
        </React.Fragment>
      </Grid>
      <Grid item xs={1} sm={2} md={2} lg={3} xl={3} />
    </Grid>
  );
};
