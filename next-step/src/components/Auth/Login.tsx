import React, { useEffect, FormEvent, useState } from "react";
import { userService } from "../../services";
import { Button, TextField, Grid, InputLabel } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import * as routes from "../../constants/route-constants";
import { useForm } from "../Other/useForm";
import { User } from "../../types/types";

type Props = {
  setUser: (value: User) => void;
  setException: (value: string) => void;
};

const initialFieldValues = {
  username: "",
  password: "",
};

export const Login: React.FC<Props> = ({ setException, setUser }) => {
  useEffect(() => {
    userService.logout();
  }, []);
  const validate = () => {
    const temp = { ...initialFieldValues };
    if (!values.username) {
      temp.username = "Field cannot be blank.";
    }
    if (!values.password) {
      temp.password = "Field cannot be blank.";
    }

    setErrors({ ...temp });

    if (!temp.username && !temp.password) {
      return true;
    }

    return false;
  };

  const { values, errors, setErrors, handleInputChange } = useForm(
    initialFieldValues
  );
  const history = useHistory();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await userService.login(
          values.username,
          values.password
        );
        localStorage.setItem("user", JSON.stringify(response));
        setUser(response);
        history.push(routes.LANDING);
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
          <h2 className="mrgn-t8">Log in</h2>
          <form method="POST" name="form" onSubmit={handleSubmit}>
            <InputLabel className="mrgn-t8" htmlFor="username">
              User Name
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
              <span style={{ fontSize: "large", marginRight: "10" }}>
                No Account?
              </span>
              <Button className="button blue-background" href={routes.REGISTER}>
                Register
              </Button>
              <Button
                type="submit"
                className="button blue-background float-right"
              >
                Log in
              </Button>
            </div>
          </form>
        </React.Fragment>
      </Grid>
      <Grid item xs={1} sm={2} md={2} lg={3} xl={3} />
    </Grid>
  );
};
