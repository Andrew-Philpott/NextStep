import React from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  InputLabel,
  TextField,
  MenuItem,
  Grid,
  Paper,
} from "@material-ui/core";
import { useForm } from "../Other/useForm";
import { useHistory } from "react-router-dom";
import * as routes from "../../constants/route-constants";
import { workoutService } from "../../services";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import { Exercise, ExerciseType, Workout } from "../../types/types";

type Props = {
  exerciseTypes: Array<ExerciseType>;
  setException: (value: string) => void;
};

const blankExercise: Exercise = {
  exerciseId: 0,
  exerciseTypeId: "",
  reps: "",
  sets: "",
  weight: "",
  workoutId: 0,
  userId: 0,
};

const initialFieldValues: Workout = {
  name: "",
  notes: "",
  exercises: [{ ...blankExercise }],
  workoutId: 0,
  userId: 0,
};

const WorkoutForm: React.FunctionComponent<Props> = ({
  exerciseTypes,
  setException,
}) => {
  const { id } = useParams();
  const { values, setValues, errors, setErrors, handleInputChange } = useForm(
    initialFieldValues
  );
  const [removedExercises, setRemovedExercises] = React.useState<
    Array<Exercise>
  >([]);
  const history = useHistory();

  React.useEffect(() => {
    if (id) {
      (async () => {
        try {
          const response = await workoutService.getWorkout(id);
          console.log(response);
          setValues(response);
        } catch {
          setException(
            "We're having some technical difficulties. Please try again later."
          );
        }
      })();
    }
  }, [id]);

  const handleExerciseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    let newState = { ...values };
    if (eid) {
      const removedExercise = newState.exercises[index];
      setRemovedExercises([...removedExercises, removedExercise]);
    }
    newState.exercises.splice(index, 1);
    setValues({ ...newState });
  };

  const validate = () => {
    let temp = { ...initialFieldValues };
    temp.exercises = [];
    if (!values.name) temp.name = "Required.";
    if (values.exercises.length === 0) {
      alert("A workout must include at least 1 exercise.");
    } else {
      for (let i = 0; i < values.exercises.length; i++) {
        temp.exercises.push({ ...blankExercise });
        if (!values.exercises[i].exerciseTypeId)
          temp.exercises[i].exerciseTypeId = "Required.";
        if (!values.exercises[i].reps) temp.exercises[i].reps = "Required.";
        if (!values.exercises[i].sets) temp.exercises[i].sets = "Required.";
      }
    }
    setErrors({
      ...temp,
    });

    if (
      !temp.name &&
      temp.exercises.filter(
        (x) => x.reps === "" && x.sets === "" && x.exerciseTypeId === ""
      ).length === temp.exercises.length
    ) {
      return true;
    }
    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      try {
        let response: Promise<Response>;
        if (id) {
          response = await workoutService.updateWorkout(id, values);
        } else {
          response = await workoutService.createWorkout(values);
        }
        (await response) && setValues(initialFieldValues);
        (await response) && history.push(routes.WORKOUTS_LIST);
      } catch {
        setException("Something went wrong");
      }
    }
  };

  return (
    <React.Fragment>
      <Grid className="mrgn-t24" spacing={6} container>
        <Grid item xs={1} sm={2} md={2} lg={4} xl={4} />
        <Grid component={Paper} item xs={10} sm={8} md={8} lg={4} xl={4}>
          {id ? <h2>Edit workout</h2> : <h2>Create workout</h2>}
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
              {...(errors.name === "Required." && {
                error: true,
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
              {...(errors.notes === "Required." && {
                error: true,
              })}
            />
            {exerciseTypes &&
              values.exercises &&
              values.exercises.map((exercise: Exercise, index: number) => {
                return (
                  <div key={index} className="mrgn-t16">
                    <Grid container spacing={1}>
                      <Grid item xs={11}>
                        <Grid spacing={1} container>
                          <Grid item xs={3}>
                            <InputLabel htmlFor={`exerciseTypeId-${index}`}>
                              Exercise
                            </InputLabel>
                            <TextField
                              select
                              name={`exerciseTypeId-${index}`}
                              fullWidth
                              id={`exerciseTypeId-${index}`}
                              value={values.exercises[index].exerciseTypeId}
                              onChange={handleExerciseChange}
                              variant="outlined"
                              {...(errors.exercises &&
                                errors.exercises[index] &&
                                errors.exercises[index].exerciseTypeId ===
                                  "Required." && {
                                  error: true,
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
                            <InputLabel htmlFor={`weight-${index}`}>
                              Weight
                            </InputLabel>
                            <TextField
                              type="number"
                              name={`weight-${index}`}
                              fullWidth
                              id={`weight-${index}`}
                              value={values.exercises[index].weight}
                              onChange={handleExerciseChange}
                              className="weight"
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item xs={3}>
                            <InputLabel htmlFor={`reps-${index}`}>
                              Reps
                            </InputLabel>
                            <TextField
                              type="number"
                              name={`reps-${index}`}
                              fullWidth
                              id={`reps-${index}`}
                              value={values.exercises[index].reps}
                              onChange={handleExerciseChange}
                              variant="outlined"
                              {...(errors.exercises[index] &&
                                errors.exercises[index].reps ===
                                  "Required." && {
                                  error: true,
                                })}
                            />
                          </Grid>
                          <Grid item xs={3}>
                            <InputLabel htmlFor={`sets-${index}`}>
                              Sets
                            </InputLabel>
                            <TextField
                              type="number"
                              name={`sets-${index}`}
                              fullWidth
                              id={`sets-${index}`}
                              value={values.exercises[index].sets}
                              onChange={handleExerciseChange}
                              className="sets"
                              variant="outlined"
                              {...(errors.exercises[index] &&
                                errors.exercises[index].sets ===
                                  "Required." && {
                                  error: true,
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
            <div className="mrgn-t24">
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
    </React.Fragment>
  );
};
export default WorkoutForm;
