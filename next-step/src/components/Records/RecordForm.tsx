import React, { useEffect, useState, FormEvent } from "react";
import {
  Button,
  InputLabel,
  TextField,
  MenuItem,
  Grid,
} from "@material-ui/core";
import { useForm } from "../Other/useForm";
import { recordService } from "../../services";
import * as types from "../../types/types";

type Props = {
  setException: (value: string) => void;
  onCreateRecord: (value: types.CreateRecord) => void;
};

const initialFieldValues = {
  weight: "",
  reps: "",
  sets: "",
  exerciseId: "",
};

export const RecordForm: React.FunctionComponent<Props> = ({
  setException,
  onCreateRecord,
}) => {
  const { values, errors, setErrors, handleInputChange } = useForm(
    initialFieldValues
  );

  const validate = () => {
    let temp = { ...initialFieldValues };

    if (!values.weight) {
      temp.exerciseId = "This field is required";
    }
    if (!values.reps) {
      temp.reps = "This field is required";
    }
    if (!values.sets) {
      temp.sets = "This field is required";
    }

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
    if (validate()) {
      onCreateRecord(values as types.CreateRecord);
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
            />
          </Grid>
        </Grid>
        <Grid container justify="flex-end">
          <Button
            style={{ marginRight: "10px" }}
            type="submit"
            className="button red-background mrgn-t8"
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
