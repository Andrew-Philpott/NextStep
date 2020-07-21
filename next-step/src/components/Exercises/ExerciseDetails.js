import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Grid } from "@material-ui/core";
import { history } from "../../helpers/history";
import { userService } from "../../services/user-service";
import { exerciseService } from "../../services/exercise-service";

export const ExerciseDetails = () => {
  const { id } = useParams();
  const [values, setValues] = useState(null);
  const [exercise, setExercise] = useState(null);
  const [record, setRecord] = useState(null);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    exerciseService
      .get(id)
      .then((response) => setExercise(response))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    userService
      .getRecordsByExercise(id)
      .then((response) => {
        setValues(response);
        setRecord(response.sort((a, b) => (a.weight < b.weight ? 1 : -1))[0]);
      })
      .catch((error) => console.log(error));
  }, []);

  const onDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this record?"))
      userService
        .deleteRecord(id)
        .then(history.push("/records"))
        .catch((error) => console.log(error));
  };

  return (
    <React.Fragment>
      {exercise && <h1>{exercise.name}</h1>}
      <Grid justify="center" spacing={2} container>
        <Button className="button red-background">Strength</Button>
        <Button className="button blue-background">Hypertrophy</Button>
        <Button className="button green-background">Endurance</Button>
      </Grid>
      {/* 
      {exercise && <h1>{exercise.name}</h1>}
      {values && record ? (
        <>
          <p>Weight: {record.weight}</p>
          <p>{record.time}</p>
        </>
      ) : (
        <h1>You dont have any records for this exercise yet</h1>
      )}

      {values && (
        <>
          <Link style={{ textDecoration: "none" }} to={`/records/new/${id}`}>
            <Button className={classes.editButton}>New</Button>
          </Link>

          <Link
            style={{ textDecoration: "none" }}
            to={`/records/edit/${values.id}`}
          >
            <Button className={classes.editButton}>Edit</Button>
          </Link>
          <Button
            onClick={() => onDelete(values.id)}
            className={classes.deleteButton}
          >
            Delete
          </Button>
        </>
      )} */}
    </React.Fragment>
  );
};
