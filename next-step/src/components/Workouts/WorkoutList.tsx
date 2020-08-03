import React, { useEffect, useState } from "react";
import { Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { workoutService } from "../../services";
import * as routes from "../../constants/route-constants";
import { MuscleModel } from "../MuscleModel/MuscleModel";
import { WorkoutItem } from "./WorkoutItem";
import { useHistory } from "react-router-dom";
import * as types from "../../types/types";

type Props = {
  onCreateSession: (value: number) => void;
  setException: (value: string) => void;
};

export const WorkoutList: React.FunctionComponent<Props> = ({
  onCreateSession,
  setException,
}) => {
  const [workouts, setWorkouts] = useState<Array<types.Workout>>([]);
  const history = useHistory();

  const handleDeleteWorkout = (id: number) => {
    if (window.confirm("Are you sure you want to delete this workout?"))
      (async () => {
        try {
          const response = await workoutService.deleteWorkout(id);
          const newState =
            (await response) && workouts.filter((x) => x.workoutId !== id);
          (await newState) && setWorkouts(newState);
        } catch (error) {
          setException(
            "We're having some technical difficulties. Please try again later."
          );
          history.push("/error");
        }
      })();
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await workoutService.getAllWorkouts();
        (await response) && setWorkouts(response);
      } catch (error) {
        setException(
          "We're having some technical difficulties. Please try again later."
        );
        history.push("/error");
      }
    })();
  }, []);

  return (
    <Grid container>
      <div className="spacer" />
      <Grid item xs={9}></Grid>
      <Grid item xs={3}>
        <Grid container justify="center">
          <Button
            component={Link}
            className="button blue-background"
            to={routes.WORKOUTS_NEW}
          >
            Create Workout
          </Button>
        </Grid>
      </Grid>

      <Grid item xs={1} sm={1} md={1} lg={1} xl={1} />
      <Grid item xs={8} sm={6} md={6} lg={6} xl={6}>
        <Grid container direction="column" justify="center">
          {workouts && workouts.length !== 0 ? (
            <h1>Workouts</h1>
          ) : (
            <h1 className="text-align-center">
              You dont have any workouts yet
            </h1>
          )}
          {workouts &&
            workouts.map((workout, index) => (
              <WorkoutItem
                key={index}
                id={workout.workoutId}
                onDeleteWorkout={handleDeleteWorkout}
                onCreateSession={onCreateSession}
                exercises={workout.exercises}
                name={workout.name}
              />
            ))}
        </Grid>
      </Grid>
      <Grid item xs={2} sm={4} md={4} lg={4} xl={4}>
        <div className="spacer" />
        <MuscleModel setException={setException} active={true} />
      </Grid>
      <Grid item xs={1} sm={1} md={1} lg={1} xl={1} />
    </Grid>
  );
};
