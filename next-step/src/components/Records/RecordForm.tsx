import React from "react";
import { Button, TextField, Grid } from "@material-ui/core";
import { useForm } from "../Other/useForm";
import { Record, ExerciseType } from "../../types/types";

type Props = {
  onCreateRecord: (value: Record) => void;
  setSelectedExerciseType: (value: ExerciseType | null) => void;
  selectedExerciseType: ExerciseType;
};

const RecordForm: React.FunctionComponent<Props> = ({
  onCreateRecord,
  setSelectedExerciseType,
  selectedExerciseType,
}) => {
  const initialFieldValues: Record = {
    recordId: 0,
    weight: "",
    reps: "",
    sets: "",
    dateCreated: new Date(),
    user: undefined,
    userId: 0,
    exerciseType: undefined,
    exerciseTypeId: selectedExerciseType.exerciseTypeId,
  };

  const { values, errors, setErrors, handleInputChange } = useForm(
    initialFieldValues
  );

  const validate = () => {
    let temp = { ...initialFieldValues };
    if (!values.weight) temp.weight = "Required.";
    if (!values.reps) temp.reps = "Required.";
    if (!values.sets) temp.sets = "Required.";
    setErrors({
      ...temp,
    });
    if (!temp.weight && !temp.reps && !temp.sets) {
      return true;
    } else {
      return false;
    }
  };
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) {
      onCreateRecord(values);
    }
  }
  return (
    <Grid container>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <TextField
              type="text"
              placeholder="weight"
              name="weight"
              value={values.weight}
              onChange={handleInputChange}
              variant="outlined"
              {...(errors.weight === "Required." && {
                error: true,
              })}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              type="text"
              placeholder="reps"
              name="reps"
              value={values.reps}
              onChange={handleInputChange}
              variant="outlined"
              {...(errors.reps === "Required." && {
                error: true,
              })}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              type="text"
              placeholder="sets"
              name="sets"
              variant="outlined"
              value={values.sets}
              onChange={handleInputChange}
              {...(errors.sets === "Required." && {
                error: true,
              })}
            />
          </Grid>
          <Grid item xs={12}>
            {(errors.weight || errors.reps || errors.sets) && (
              <p className="error">Fields in red are required.</p>
            )}
          </Grid>
        </Grid>
        <Grid container justify="flex-end">
          <Button
            style={{ marginRight: "10px" }}
            type="submit"
            className="button red-background mrgn-t8"
            onClick={() => setSelectedExerciseType(null)}
          >
            Cancel
          </Button>
          <Button type="submit" className="button blue-background mrgn-t8">
            Submit
          </Button>
        </Grid>
      </form>
    </Grid>
  );
};
export default RecordForm;
