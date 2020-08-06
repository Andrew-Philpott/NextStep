import React from "react";
import { Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { workoutService } from "../../services";
import * as routes from "../../constants/route-constants";
import { MuscleModel } from "../MuscleModel/MuscleModel";
import WorkoutItem from "./WorkoutItem";
import { User, Workout } from "../../types/types";

type Props = {
  onCreateSession: (value: number) => void;
  setException: (value: string) => void;
  user: User | null;
};

const WorkoutList: React.FunctionComponent<Props> = ({
  onCreateSession,
  setException,
  user,
}) => {
  const [workouts, setWorkouts] = React.useState<Array<Workout>>([]);

  const handleDeleteWorkout = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this workout?"))
      try {
        const response = await workoutService.deleteWorkout(id);
        const newState = workouts.filter(
          (x) => x.workoutId !== response.workoutId
        );
        setWorkouts(newState);
      } catch {
        setException(
          "We're having some technical difficulties. Please try again later."
        );
      }
  };

  React.useEffect(() => {
    (async () => {
      try {
        const response = await workoutService.getAllWorkouts();
        setWorkouts(response);
      } catch {
        setException(
          "We're having some technical difficulties. Please try again later."
        );
      }
    })();
  }, []);

  return (
    <Grid container>
      <div className="spacer-32" />
      <Grid item xs={1} sm={1} md={1} lg={1} xl={1} />
      <Grid item xs={8} sm={6} md={6} lg={6} xl={6}>
        {workouts.length !== 0 ? (
          <h1>Workouts</h1>
        ) : (
          <h1 className="text-align-center">You dont have any workouts yet</h1>
        )}
        <div className="spacer-16" />
        <Grid container direction="column" justify="center">
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
        <Grid container justify="flex-end">
          <Button
            component={Link}
            className="button blue-background"
            to={routes.WORKOUTS_NEW}
          >
            Create Workout
          </Button>
          <div className="spacer-16" />
        </Grid>
        <MuscleModel setException={setException} user={user} />
      </Grid>
      <Grid item xs={1} sm={1} md={1} lg={1} xl={1} />
    </Grid>
  );
};

export default WorkoutList;
