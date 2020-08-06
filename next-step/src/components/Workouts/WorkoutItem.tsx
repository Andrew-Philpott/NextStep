import React from "react";
import { Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import DetailsIcon from "@material-ui/icons/Details";
import { Exercise } from "../../types/types";

type Props = {
  onCreateSession: (value: number) => void;
  name: string;
  id: number;
  exercises: Array<Exercise>;
  onDeleteWorkout: (value: number) => void;
};

const WorkoutItem: React.FunctionComponent<Props> = ({
  onCreateSession,
  name,
  id,
  exercises,
  onDeleteWorkout,
}) => {
  return (
    <Grid container direction="row" className="workout-container">
      <Grid item xs={5}>
        <Grid className="left" container>
          <Grid item xs={12}>
            <h2>{name}</h2>
            <Link to={`/workouts/${id}`}>
              <DetailsIcon className="pointer blue-color" />
            </Link>
            <Link to={`/workouts/edit/${id}`}>
              <EditIcon className="pointer green-color" />
            </Link>
            <DeleteOutlinedIcon
              className="pointer red-color"
              onClick={() => onDeleteWorkout(id)}
            />
          </Grid>
          <h3 className="mrgn-t8">Exercises</h3>
          {exercises &&
            exercises.map((exercise, index) => (
              <Grid key={index} container>
                <p>
                  {exercise.exerciseType?.name} {exercise.sets}x{exercise.reps}{" "}
                  {exercise.weight ? <span>{exercise.weight}lbs</span> : null}
                </p>
              </Grid>
            ))}
        </Grid>
      </Grid>
      <Grid className="orange-background text-align-center" item xs={7}>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <p>(Photo)</p>
        <Button
          style={{
            border: "2px solid white",

            position: "absolute",
            right: "0px",
            bottom: "0px",
          }}
          onClick={() => onCreateSession(id)}
          className="button"
        >
          Start Workout
        </Button>
      </Grid>
    </Grid>
  );
};
export default WorkoutItem;
