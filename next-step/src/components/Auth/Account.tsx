import React from "react";
import { Grid } from "@material-ui/core";
import { MuscleModel } from "../MuscleModel/MuscleModel";

type Props = {
  setException: (value: string) => void;
};

export const Account: React.FC<Props> = ({ setException }) => {
  return (
    <Grid container>
      <div className="spacer" />
      <Grid item xs={2} sm={2} md={2} lg={2} xl={2} />
      <Grid item xs={4} sm={4} md={4} lg={4} xl={4}></Grid>
      <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
        <MuscleModel setException={setException} active={false} />
      </Grid>
    </Grid>
  );
};
