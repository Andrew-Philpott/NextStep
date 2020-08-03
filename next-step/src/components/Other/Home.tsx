import React from "react";
import { Grid } from "@material-ui/core";
import { MuscleModel } from "../MuscleModel/MuscleModel";
import { User } from "../../types/types";

type Props = {
  setException: (value: string) => void;
  user: User | null;
};

export const Home: React.FunctionComponent<Props> = ({
  user,
  setException,
}) => {
  return (
    <Grid container>
      {user === null && (
        <React.Fragment>
          <h1>Welcome to NextStep Fitness</h1>
          <br></br>
          <p>
            <i>Keep easy tabs on your bodys recovery</i>
          </p>
        </React.Fragment>
      )}

      <Grid container>
        <div className="spacer-32" />
        <Grid item xs={3} sm={3} md={3} lg={3} xl={3} />
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          {user && <h1>Current Recovery</h1>}
          <MuscleModel
            setException={setException}
            active={user ? true : false}
          />
        </Grid>
        <Grid item xs={3} sm={3} md={3} lg={3} xl={3} />
      </Grid>
    </Grid>
  );
};
