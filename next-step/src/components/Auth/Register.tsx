import React, { FormEvent } from "react";
import { Button, Grid, TextField, InputLabel } from "@material-ui/core";
import * as routes from "../../constants/route-constants";
import { userService } from "../../services";
import { useHistory } from "react-router-dom";
import { useForm } from "../Other/useForm";
import { User } from "../../types/types";

type Props = {
  setException: (value: string) => void;
};

const initialFieldValues: User = {
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  password: "",
  token: "",
  userId: 0,
};

const Register: React.FC<Props> = ({ setException }) => {
  const { values, errors, setErrors, handleInputChange } = useForm(
    initialFieldValues
  );
  const history = useHistory();

  const validate = () => {
    let temp = { ...initialFieldValues };
    if (!values.firstName) temp.firstName = "Field cannot be blank.";
    if (!values.lastName) temp.lastName = "Field cannot be blank.";
    if (!values.userName) temp.userName = "Field cannot be blank.";
    if (!values.email) temp.email = "Field cannot be blank.";
    if (!values.password) temp.password = "Field cannot be blank.";
    setErrors({ ...temp });
    if (
      !temp.firstName &&
      !temp.lastName &&
      !temp.userName &&
      !temp.email &&
      !temp.password
    ) {
      return true;
    }
    return false;
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await userService.register(values);
        (await response) && console.log(response);
        (await response) && history.push(routes.LOG_IN);
      } catch {
        setException(
          "We're having some technical difficulties. Please try again later."
        );
      }
    }
  }

  return (
    <Grid container>
      <Grid item xs={1} sm={2} md={2} lg={3} xl={3} />
      <Grid item xs={10} sm={8} md={8} lg={6} xl={6}>
        <React.Fragment>
          <h2 className="mrgn-t8">Register</h2>
          <form method="POST" name="form" onSubmit={handleSubmit}>
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
              name="userName"
              fullWidth
              value={values.userName}
              onChange={handleInputChange}
              variant="outlined"
              {...(errors &&
                errors.userName && {
                  error: true,
                  helperText: errors.userName,
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
export default Register;
