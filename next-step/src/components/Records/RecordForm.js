import React, { useEffect, useState } from "react";
import {
  Button,
  InputLabel,
  TextField,
  MenuItem,
  Grid,
} from "@material-ui/core";
import { useForm } from "../Other/useForm";
import { useHistory } from "react-router-dom";
import { recordService } from "../../services";
import { useParams } from "react-router-dom";

const initialFieldValues = {
  weight: "",
  reps: "",
  sets: "",
  exerciseId: "",
};

export const RecordForm = (props) => {
  const { exerciseTypeId } = useParams();
  const { exercises, setException } = props;
  const { values, setValues, errors, setErrors, handleInputChange } = useForm(
    initialFieldValues
  );
  const history = useHistory();

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("name" in fieldValues && !fieldValues.name) {
      temp.name = "This field is required";
    } else {
      temp.name = "";
    }

    if ("exerciseId" in fieldValues && !fieldValues.exerciseId) {
      temp.exerciseId = "This field is required";
    } else {
      temp.exerciseId = "";
    }

    if ("reps" in fieldValues && !fieldValues.reps) {
      temp.reps = "This field is required";
    } else {
      temp.reps = "";
    }
    if ("sets" in fieldValues && !fieldValues.sets) {
      temp.sets = "This field is required";
    } else {
      temp.sets = "";
    }

    setErrors({
      ...temp,
    });
    if (!temp) {
      return true;
    } else {
      return false;
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (validate()) {
      const record = {
        exerciseId: parseInt(values.exerciseId),
        weight: parseInt(values.weight),
        reps: parseInt(values.reps),
        sets: parseInt(values.sets),
      };

      (async () => {
        try {
          const response = await recordService.createRecord(record);
          (await response) && history.push("/records");
        } catch (error) {
          setException(error);
        }
      })();
    }
  }

  return (
    <Grid container>
      <Grid item xs={1} sm={2} md={2} lg={2} xl={2} />
      <Grid item xs={10} sm={8} md={8} lg={8} xl={8}>
        <h2>Create Record</h2>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={2}>
              <InputLabel className="mrgn-t16" htmlFor="weight">
                Weight
              </InputLabel>
              <TextField
                type="text"
                name="weight"
                value={values.weight}
                onChange={handleInputChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={2}>
              <InputLabel className="mrgn-t16" htmlFor="reps">
                Reps
              </InputLabel>
              <TextField
                type="text"
                name="reps"
                value={values.reps}
                onChange={handleInputChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={2}>
              <InputLabel className="mrgn-t16" htmlFor="sets">
                Sets
              </InputLabel>
              <TextField
                type="text"
                name="sets"
                variant="outlined"
                value={values.sets}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>

          <Button type="submit" className="button blue-background float-right">
            Submit
          </Button>
        </form>
      </Grid>
      <Grid item xs={1} sm={2} md={2} lg={2} xl={2} />
    </Grid>
  );
};
