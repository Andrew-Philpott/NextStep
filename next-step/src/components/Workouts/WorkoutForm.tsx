import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  InputLabel,
  TextField,
  MenuItem,
  Grid,
} from "@material-ui/core";
import { useForm } from "../Other/useForm";
import { useHistory } from "react-router-dom";
import * as routes from "../../constants/route-constants";
import { workoutService } from "../../services";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import { Exercise, ExerciseType } from "../../types/types";

type Props = {
  exerciseTypes: Array<ExerciseType>;
  setException: (value: string) => void;
};

const blankExercise = {
  exerciseTypeId: "",
  reps: "",
  sets: "",
  weight: "",
};

const initialFieldValues = {
  name: "",
  notes: "",
  exercises: [{ ...blankExercise }],
};

export const WorkoutForm: React.FunctionComponent<Props> = ({
  exerciseTypes,
  setException,
}) => {
  const { id } = useParams();
  const { values, setValues, errors, setErrors, handleInputChange } = useForm(
    initialFieldValues
  );
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [removedExercises, setRemovedExercises] = useState<Array<Exercise>>([]);
  const history = useHistory();

  useEffect(() => {
    if (id && loading) {
      (async () => {
        try {
          const response = await workoutService.getWorkout(id);
          setValues(response);
          setEditing(true);
        } catch {
          setException(
            "We're having some technical difficulties. Please try again later."
          );
          history.push("/error");
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [id, loading]);

  const handleExerciseChange = (e: ChangeEvent<HTMLInputElement>) => {
    let updatedExercises = { ...values };
    const beforeIndex = e.target.name.indexOf("-");
    const index = e.target.name.substring(beforeIndex + 1);
    const property = e.target.name.substring(0, beforeIndex);
    updatedExercises.exercises[index][property] = e.target.value;
    setValues(updatedExercises);
  };

  const handleAddExercise = () => {
    let newState = { ...values };
    newState.exercises.push({ ...blankExercise });
    setValues({ ...newState });
  };

  const handleRemoveExercise = (eid: number, index: number) => {
    //remove the exercise but dont be invasive
    let newState = { ...values };
    //I could push it into removeExercises
    if (eid) {
      const removedExercise = newState.exercises[index];
      setRemovedExercises([...removedExercises, removedExercise]);
      // if (window.confirm("Are you sure you want to delete this exercise?"))
      //   (async () => {
      //     try {
      //       const response = await workoutService.removeExercise(id, eid);
      //       (await response) && newState.exercises.splice(index, 1);
      //     } catch (error) {
      //       setException(error);
      //     }
      //   })();
    }
    newState.exercises.splice(index, 1);
    setValues({ ...newState });
  };

  const validate = () => {
    let temp = { ...initialFieldValues };
    temp.exercises = [];
    temp.name = "";
    let isValid = true;
    if ("name" in values && !values.name) {
      temp.name = "This field is required";
      isValid = false;
    }

    if (values.exercises.length === 0) {
      alert("A workout must include at least 1 exercise.");
      isValid = false;
    } else {
      for (let i = 0; i < values.exercises.length; i++) {
        temp.exercises.push({ ...blankExercise });
        if (
          "exerciseTypeId" in values.exercises[i] &&
          !values.exercises[i].exerciseTypeId
        ) {
          temp.exercises[i].exerciseTypeId = "This field is required";
          isValid = false;
        }
        if ("reps" in values.exercises[i] && !values.exercises[i].reps) {
          temp.exercises[i].reps = "This field is required";
          isValid = false;
        }

        if ("sets" in values.exercises[i] && !values.exercises[i].sets) {
          temp.exercises[i].sets = "This field is required";
          isValid = false;
        }
      }
    }

    setErrors({
      ...temp,
    });

    return isValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      try {
        let workout = {};
        if (editing) {
          workout = {
            name: values.name,
            notes: values.notes,
            exercises: values.exercises,
            updateExercises: values.exercises.filter(
              (x: Exercise) => x.exerciseId !== null
            ),
            createExercises: values.exercises.filter(
              (x: Exercise) => x.exerciseId === null
            ),
          };

          await workoutService.updateWorkout(id, workout);
          history.push(routes.WORKOUTS_LIST);
        } else {
          workout = {
            name: values.name,
            notes: values.notes,
            exercises: values.exercises,
          };
          await workoutService.createWorkout(workout);
          setValues(initialFieldValues);
          history.push(routes.WORKOUTS_LIST);
        }
      } catch {
        setException("Something went wrong");
      }
    }
  };

  return (
    <Grid container>
      <div className="spacer" />
      <Grid item xs={1} sm={2} md={2} lg={4} xl={4} />
      <Grid item xs={10} sm={8} md={8} lg={4} xl={4}>
        {editing === true ? <h2>Edit workout</h2> : <h2>Create workout</h2>}

        <form method="POST" autoComplete="off" onSubmit={handleSubmit}>
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
            {...(errors.name && {
              error: true,
              helperText: errors.name,
            })}
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

          {exerciseTypes &&
            values.exercises &&
            values.exercises.map((exercise: Exercise, index: number) => {
              const exerciseName = `exerciseTypeId-${index}`;
              const exerciseWeight = `weight-${index}`;
              const exerciseReps = `reps-${index}`;
              const exerciseSets = `sets-${index}`;
              return (
                <div key={index} className="mrgn-t16">
                  <Grid container spacing={1}>
                    <Grid item xs={11}>
                      <Grid spacing={1} container>
                        <Grid item xs={3}>
                          <InputLabel htmlFor={exerciseName}>
                            Exercise
                          </InputLabel>
                          <TextField
                            select
                            name={exerciseName}
                            fullWidth
                            id={exerciseName}
                            value={values.exercises[index].exerciseTypeId}
                            onChange={handleExerciseChange}
                            variant="outlined"
                            {...(errors.exercises &&
                              errors.exercises[index] &&
                              errors.exercises[index].exerciseTypeId && {
                                error: true,
                                helperText:
                                  errors.exercises[index].exerciseTypeId,
                              })}
                          >
                            {exerciseTypes
                              .sort((a, b) => (a.name > b.name ? 1 : -1))
                              .map((item) => {
                                return (
                                  <MenuItem
                                    key={item.exerciseTypeId}
                                    value={item.exerciseTypeId}
                                  >
                                    {item.name}
                                  </MenuItem>
                                );
                              })}
                          </TextField>
                        </Grid>
                        <Grid item xs={3}>
                          <InputLabel htmlFor={exerciseWeight}>
                            Weight
                          </InputLabel>
                          <TextField
                            type="text"
                            name={exerciseWeight}
                            fullWidth
                            id={exerciseWeight}
                            value={values.exercises[index].weight}
                            onChange={handleExerciseChange}
                            className="weight"
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <InputLabel htmlFor={exerciseReps}>Reps</InputLabel>
                          <TextField
                            type="text"
                            name={exerciseReps}
                            fullWidth
                            id={exerciseReps}
                            value={values.exercises[index].reps}
                            onChange={handleExerciseChange}
                            variant="outlined"
                            {...(errors.exercises[index] &&
                              errors.exercises[index].reps && {
                                error: true,
                                helperText: errors.exercises[index].reps,
                              })}
                          />
                        </Grid>
                        <Grid item xs={3}>
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
                            {...(errors.exercises[index] &&
                              errors.exercises[index].sets && {
                                error: true,
                                helperText: errors.exercises[index].sets,
                              })}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={1}>
                      <div className="mrgn-t24">
                        <DeleteOutlinedIcon
                          className="pointer"
                          onClick={() =>
                            handleRemoveExercise(exercise.exerciseId, index)
                          }
                        >
                          X
                        </DeleteOutlinedIcon>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              );
            })}
          <div className="mrgn-t8">
            <Button
              className="button blue-background"
              onClick={() => handleAddExercise()}
            >
              Add Exercise
            </Button>
            <Button
              className="button blue-background float-right"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </form>
      </Grid>
      <Grid item xs={1} sm={2} md={2} lg={4} xl={4} />
    </Grid>
  );
};
