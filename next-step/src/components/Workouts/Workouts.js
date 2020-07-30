import React, { useEffect, useState } from "react";
import { Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { workoutService } from "../../services";
import * as routes from "../../constants/route-constants";
import { MuscleModel } from "../MuscleModel/MuscleModel";
import { Workout } from "../Workouts/Workout";

export const Workouts = (props) => {
  const [workouts, setWorkouts] = useState(null);
  const { onCreateSession, setException } = props;

  const handleDeleteWorkout = (id) => {
    if (window.confirm("Are you sure you want to delete this workout?"))
      (async () => {
        try {
          const response = await workoutService.deleteWorkout(id);
          const newState =
            (await response) && workouts.filter((x) => x.workoutId !== id);
          (await newState) && setWorkouts(newState);
        } catch (error) {
          setException(error);
        }
      })();
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await workoutService.getAllWorkouts();
        (await response) && setWorkouts(response);
      } catch (error) {
        setException(error);
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
              <Workout
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
        <MuscleModel active={true} />
      </Grid>
      <Grid item xs={1} sm={1} md={1} lg={1} xl={1} />
    </Grid>
  );
};
