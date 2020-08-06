import React from "react";
import { userService } from "../../services";
import { Button, TextField, Grid, InputLabel } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import * as routes from "../../constants/route-constants";
import { useForm } from "../Other/useForm";
import { User } from "../../types/types";

type Props = {
  setUser: (value: User | null) => void;
  setException: (value: string) => void;
};

const initialFieldValues = {
  userName: "",
  password: "",
};

const Login: React.FC<Props> = ({ setException, setUser }) => {
  const { values, errors, setErrors, handleInputChange } = useForm(
    initialFieldValues
  );
  const history = useHistory();

  React.useEffect(() => {
    userService.logout();
    setUser(null);
  }, []);

  const validate = () => {
    const temp = { userName: true, password: true };
    if (!values.username) temp.userName = false;
    if (!values.password) temp.password = false;
    setErrors({ ...temp });
    if (!temp.userName && !temp.password) {
      return true;
    }
    return false;
  };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) {
      userService
        .login(values.username, values.password)
        .then((response) => {
          localStorage.setItem("user", JSON.stringify(response));
          return response;
        })
        .then(() => {
          history.push("/");
          window.location.reload();
        })
        .catch(() =>
          setException(
            "We're having some technical difficulties. Please try again later."
          )
        );
    }
  }

  return (
    <Grid className="mrgn-t24" container>
      <Grid item xs={1} sm={2} md={2} lg={3} xl={3} />
      <Grid item xs={10} sm={8} md={8} lg={6} xl={6}>
        <React.Fragment>
          <h2 className="mrgn-t8">Log in</h2>
          <form method="POST" onSubmit={handleSubmit}>
            <InputLabel className="mrgn-t8" htmlFor="username">
              User Name
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
                })}
            />
            <Grid item xs={12}>
              {(errors.userName || errors.password) && (
                <p className="error">Fields in red are required.</p>
              )}
            </Grid>
            <Grid className="mrgn-t8">
              <span style={{ fontSize: "large", marginRight: "10px" }}>
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
            </Grid>
          </form>
        </React.Fragment>
      </Grid>
      <Grid item xs={1} sm={2} md={2} lg={3} xl={3} />
    </Grid>
  );
};

export default Login;
