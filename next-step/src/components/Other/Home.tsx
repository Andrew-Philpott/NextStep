import React from "react";
import { Grid } from "@material-ui/core";
import { MuscleModel } from "../MuscleModel/MuscleModel";

type Props = {
  setException: (value: string) => void;
};

export const Home: React.FunctionComponent<Props> = ({ setException }) => {
  return (
    <Grid container>
      <h1>Welcome to NextStep Fitness</h1>
      <br></br>
      <p>
        <i>Keep easy tabs on your bodys recovery</i>
      </p>
      <Grid container>
        <div className="spacer" />
        <Grid item xs={3} sm={3} md={3} lg={3} xl={3} />
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <MuscleModel setException={setException} active={false} />
        </Grid>
        <Grid item xs={3} sm={3} md={3} lg={3} xl={3} />
      </Grid>
    </Grid>
  );
};
