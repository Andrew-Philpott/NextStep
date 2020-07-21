import React, { useState, useEffect } from "react";
import { userService } from "../../services/user-service";
import { Button, TextField, Grid, InputLabel } from "@material-ui/core";
import { history } from "../../helpers/history";
import * as routes from "../../constants/route-constants";
import { useForm } from "../Other/useForm";

const initialFieldValues = {
  username: "",
  password: "",
};

export const Login = (props) => {
  const { setSession } = props;
  const { values, handleInputChange } = useForm(initialFieldValues);

  const [loggingIn, setLogginIn] = useState(false);

  useEffect(() => {
    setSession(null);
    userService.logout();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (values.username && values.password) {
      setLogginIn(true);
      try {
        const authenticated = await userService.login(
          values.username,
          values.password
        );
        console.log(await authenticated);
        localStorage.setItem("user", JSON.stringify(await authenticated));
        await userService.getCurrentSession();
        history.push(routes.ACCOUNT);
      } catch (error) {}
    }
  }

  return (
    <Grid container>
      <Grid item xs={1} sm={2} md={2} lg={3} xl={3} />
      <Grid item xs={10} sm={8} md={8} lg={6} xl={6}>
        <React.Fragment>
          <h2 className="mrgn-t8">Log in</h2>
          <form name="form" onSubmit={handleSubmit}>
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
