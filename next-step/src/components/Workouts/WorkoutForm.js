import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Paper,
  InputLabel,
  TextField,
  MenuItem,
  Grid,
} from "@material-ui/core";
import { useForm } from "../Other/useForm";
import { userService } from "../../services/user-service";
import { history } from "../../helpers/history";
import * as routes from "../../constants/route-constants";
import { exerciseService } from "../../services/exercise-service";

export const WorkoutForm = () => {
  const blankExercise = {
    exerciseId: "",
    intensity: "",
    reps: "",
    sets: "",
    weight: "",
  };

  const initialFieldValues = {
    name: "",
    notes: "",
    exercises: [{ ...blankExercise }],
  };

  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const { values, handleInputChange, setValues } = useForm(initialFieldValues);
  const [exerciseList, setExerciseList] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    exerciseService
      .getAll()
      .then((response) => setExerciseList(response))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (id) {
      userService
        .getWorkout(id)
        .then((response) => setValues(response), setEditing(true))
        .catch((error) => console.log(error));
    }
  }, []);

  const handleExerciseChange = (e) => {
    let updatedExercises = { ...values };
    const a = e.target.name.indexOf("-");
    const b = e.target.name.substring(a + 1);
    const c = e.target.name.substring(0, a);
    updatedExercises.exercises[b][c] = e.target.value;
    setValues(updatedExercises);
  };

  const handleAddExercise = () => {
    let newState = { ...values };
    newState.exercises.push({ ...blankExercise });
    setValues({ ...newState });
  };

  const handleRemoveExercise = (eid, index) => {
    let newState = { ...values };
    if (eid) {
      if (window.confirm("Are you sure you want to delete this exercise?"))
        userService
          .removeExercise(id, eid)
          .then(newState.exercises.splice(index, 1))
          .catch((error) => console.log(error));
    } else {
      newState.exercises.splice(index, 1);
    }
    setValues({ ...newState });
  };

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    let isValid = true;
    temp.exercises = [];
    if ("name" in fieldValues && !fieldValues.name) {
      temp.name = "This field is required";
      isValid = false;
    } else {
      temp.name = "";
    }

    if (fieldValues.exercises.length == 0) {
      isValid = false;
      alert("A workout must include at least 1 exercise.");
    } else {
      for (let i = 0; i < fieldValues.exercises.length; i++) {
        temp.exercises.push({ ...blankExercise });
        if (
          "exerciseId" in fieldValues.exercises[i] &&
          !fieldValues.exercises[i].exerciseId
        ) {
          temp.exercises[i].exerciseId = "This field is required";
          isValid = false;
        } else {
          temp.exercises[i].exerciseId = "";
        }

        if (
          "reps" in fieldValues.exercises[i] &&
          !fieldValues.exercises[i].reps
        ) {
          temp.exercises[i].reps = "This field is required";
          isValid = false;
        } else {
          temp.exercises[i].reps = "";
        }
        if (
          "sets" in fieldValues.exercises[i] &&
          !fieldValues.exercises[i].sets
        ) {
          temp.exercises[i].sets = "This field is required";
          isValid = false;
        } else {
          temp.exercises[i].sets = "";
        }
        if (
          "intensity" in fieldValues.exercises[i] &&
          !fieldValues.exercises[i].intensity
        ) {
          temp.exercises[i].intensity = "This field is required";
          isValid = false;
        } else {
          temp.exercises[i].intensity = "";
        }
      }
    }

    setErrors({
      ...temp,
    });

    return isValid;
  };

  const handleSubmit = () => {
    if (validate()) {
      let workout = {};
      if (editing) {
        workout = {
          name: values.name,
          notes: values.notes,
          updateExercises: values.exercises.filter((x) => x.id != null),
          newExercises: values.exercises.filter((x) => x.id == null),
        };
        userService
          .updateWorkout(id, workout)
          .then(() => {
            history.push(routes.WORKOUTS_LIST);
          })
          .catch((error) => console.log(error));
      } else {
        workout = {
          name: values.name,
          notes: values.notes,
          exercises: values.exercises,
        };
        userService
          .createWorkout(workout)
          .then(() => history.push(routes.WORKOUTS_LIST))
          .catch((error) => console.log(error));
      }
    }
  };

  return (
    <Grid container>
      <div className="spacer" />
      <Grid item xs={1} sm={2} md={2} lg={3} xl={3} />
      <Grid component={Paper} item xs={10} sm={8} md={8} lg={6} xl={6}>
        {editing == true ? <h2>Edit workout</h2> : <h2>Create workout</h2>}

        <form autoComplete="off" onSubmit={handleSubmit}>
          <InputLabel className="mrgn-t16" htmlFor="name">
            Name
          </InputLabel>
          <TextField
            id="name"
            name="name"
            fullWidth
            value={values.name}
            onChange={handleInputChange}
            variant="outlined"
            {...(errors.name && { error: true, helperText: errors.name })}
          />

          <InputLabel className="mrgn-t16" htmlFor="notes">
            Notes
          </InputLabel>
          <TextField
            id="notes"
            name="notes"
            fullWidth
            multiline
            rows={3}
            value={values.notes}
            onChange={handleInputChange}
            variant="outlined"
            {...(errors.notes && { error: true, helperText: errors.notes })}
          />

          {values.exercises &&
            values.exercises.map((exercise, index) => {
              const exerciseName = `exerciseId-${index}`;
              const exerciseWeight = `weight-${index}`;
              const exerciseReps = `reps-${index}`;
              const exerciseSets = `sets-${index}`;
              const exerciseIntensity = `intensity-${index}`;
              return (
                <div className="mrgn-t16">
                  <Grid key={index} container spacing={1}>
                    <Grid item xs={3}>
                      <InputLabel htmlFor={exerciseName}>Exercise</InputLabel>
                      <TextField
                        select
                        name={exerciseName}
                        fullWidth
                        id={exerciseName}
                        value={
                          values.exercises[index].exerciseId
                            ? values.exercises[index].exerciseId
                            : (values.exercises[index].exerciseId = "")
                        }
                        onChange={handleExerciseChange}
                        variant="outlined"
                        className="exerciseId"
                        {...(errors.exercises &&
                          errors.exercises[index] &&
                          errors.exercises[index].exerciseId && {
                            error: true,
                            helperText: errors.exercises[index].exerciseId,
                          })}
                      >
                        <MenuItem key={0} value={0}></MenuItem>
                        {exerciseList &&
                          exerciseList
                            .sort((a, b) => (a.name > b.name ? 1 : -1))
                            .map((item) => {
                              return (
                                <MenuItem key={item.id} value={item.id}>
                                  {item.name}
                                </MenuItem>
                              );
                            })}
                      </TextField>
                    </Grid>
                    <Grid item xs={2}>
                      <InputLabel htmlFor={exerciseWeight}>Weight</InputLabel>
                      <TextField
                        type="text"
                        name={exerciseWeight}
                        fullWidth
                        id={exerciseWeight}
                        value={
                          values.exercises[index].weight
                            ? values.exercises[index].weight
                            : (values.exercises[index].weight = "")
                        }
                        onChange={handleExerciseChange}
                        className="weight"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <InputLabel htmlFor={exerciseReps}>Reps</InputLabel>
                      <TextField
                        type="text"
                        name={exerciseReps}
                        fullWidth
                        id={exerciseReps}
                        value={values.exercises[index].reps}
                        onChange={handleExerciseChange}
                        variant="outlined"
                        {...(errors.exercises &&
                          errors.exercises[index] &&
                          errors.exercises[index].reps && {
                            error: true,
                            helperText: errors.exercises[index].reps,
                          })}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <InputLabel htmlFor={exerciseSets}>Sets</InputLabel>
                      <TextField
                        type="text"
                        name={exerciseSets}
                        fullWidth
                        id={exerciseSets}
                        value={values.exercises[index].sets}
                        onChange={handleExerciseChange}
                        className="sets"
                        variant="outlined"
                        {...(errors.exercises &&
                          errors.exercises[index] &&
                          errors.exercises[index].sets && {
                            error: true,
                            helperText: errors.exercises[index].sets,
                          })}
                      />
                    </Grid>

                    <Grid item xs={2}>
                      <InputLabel htmlFor={exerciseIntensity}>
                        Intensity
                      </InputLabel>
                      <TextField
                        name={exerciseIntensity}
                        id={exerciseIntensity}
                        fullWidth
                        value={values.exercises[index].intensity}
                        onChange={handleExerciseChange}
                        select
                        className="intensity"
                        variant="outlined"
                        {...(errors.exercises &&
                          errors.exercises[index] &&
                          errors.exercises[index].intensity && {
                            error: true,
                            helperText: errors.exercises[index].intensity,
                          })}
                      >
                        <MenuItem key={0} value={0}></MenuItem>
                        <MenuItem key={1} value={1}>
                          1 Easy
                        </MenuItem>
                        <MenuItem key={2} value={2}>
                          2
                        </MenuItem>
                        <MenuItem key={3} value={3}>
                          3
                        </MenuItem>
                        <MenuItem key={4} value={4}>
                          4
                        </MenuItem>
                        <MenuItem key={5} value={5}>
                          5 Hard
                        </MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={1}>
                      <div className="mrgn-t24">
                        <Button
                          className="red-background"
                          onClick={() =>
                            handleRemoveExercise(exercise.id, index)
                          }
                        >
                          X
                        </Button>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              );
            })}
          <Button
            className="button blue-background"
            onClick={() => handleAddExercise()}
          >
            Add Exercise
          </Button>
          <Button
            className="button blue-background float-right"
            onClick={() => handleSubmit()}
          >
            Submit
          </Button>
        </form>
      </Grid>
      <Grid item xs={1} sm={2} md={2} lg={3} xl={3} />
    </Grid>
  );
};
