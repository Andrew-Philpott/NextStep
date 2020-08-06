import React, { FormEvent } from "react";
import { Button, TextField, Grid } from "@material-ui/core";
import { useForm } from "../Other/useForm";
import { Record, ExerciseType } from "../../types/types";

type Props = {
  onCreateRecord: (value: Record) => void;
  setSelectedExerciseType: (value: ExerciseType | null) => void;
};

const initialFieldValues = {
  recordId: "",
  weight: "",
  reps: "",
  sets: "",
  time: "",
  userId: 0,
  exerciseTypeId: 0,
};

const RecordForm: React.FunctionComponent<Props> = ({
  onCreateRecord,
  setSelectedExerciseType,
}) => {
  const { values, errors, setErrors, handleInputChange } = useForm(
    initialFieldValues
  );

  const validate = () => {
    let temp = { weight: false, reps: false, sets: false };
    if (!values.weight) temp.weight = true;
    if (!values.reps) temp.reps = true;
    if (!values.sets) temp.sets = true;
    setErrors({
      ...temp,
    });
    if (!temp.weight && !temp.reps && !temp.sets) {
      return true;
    } else {
      return false;
    }
  };
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (validate()) onCreateRecord(values);
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
              {...(errors.weight && {
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
              {...(errors.reps && {
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
              {...(errors.sets && {
                error: true,
              })}
            />
          </Grid>
          <Grid item xs={12}>
            {(errors.weight || errors.reps || errors.sets) && (
              <p style={{ color: "red" }}>Fields in red are required.</p>
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
