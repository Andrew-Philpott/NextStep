import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Record, ExerciseType } from "../../types/types";
import * as types from "../../types/types";

type Props = {
  setException: (value: string) => void;
};

const WorkoutDetails: React.FunctionComponent<Props> = ({ setException }) => {
  const { id } = useParams();
  return (
    <React.Fragment>
      <h1>Workout Details Page</h1>
    </React.Fragment>
  );
};

export default WorkoutDetails;
