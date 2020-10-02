import React from "react";
import { useParams } from "react-router-dom";
import { Grid } from "@material-ui/core";

type Props = {
  setException: (value: string) => void;
};
type Params = {
  id: string | undefined;
};

const WorkoutDetails: React.FunctionComponent<Props> = ({ setException }) => {
  const { id } = useParams<Params>();
  return (
    <Grid container>
      <h1>Workout Details Page</h1>
      <h2>Work in progress</h2>
    </Grid>
  );
};

export default WorkoutDetails;
