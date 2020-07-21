import React, { useEffect } from "react";
import {
  Button,
  InputLabel,
  TextField,
  MenuItem,
  Grid,
} from "@material-ui/core";
import { useForm } from "../Other/useForm";
import { history } from "../../helpers/history";
import { exerciseService } from "../../services/exercise-service";
import { userService } from "../../services/user-service";
import { useParams } from "react-router-dom";

const initialFieldValues = {
  weight: "",
  reps: "",
  sets: "",
  exerciseId: "",
};

export const RecordForm = (props) => {
  const { id } = useParams();
  const { setException } = props;
  const [exercises, setExercises] = React.useState(null);
  const { values, setValues, errors, setErrors, handleInputChange } = useForm(
    initialFieldValues
  );

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

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const response = await userService.getRecordsByExercise(id);
          setValues(response);
        } catch (error) {
          setException(error);
        }
      })();
    }
  }, [id]);

  useEffect(() => {
    if (!exercises) {
      (async () => {
        try {
          const response = await exerciseService.getAll();
          setExercises(response);
        } catch (error) {
          setException(error);
        }
      })();
    }
  }, [exercises]);

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
          const response = await userService.createRecord(record);
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
            <Grid item xs={6}>
              <InputLabel className="mrgn-t16" htmlFor="exerciseId">
                Exercise
              </InputLabel>
              <TextField
                onChange={handleInputChange}
                value={values.exerciseId}
                select
                name="exerciseId"
                id="exerciseId"
                variant="outlined"
              >
                <MenuItem key={""} value={""}></MenuItem>
                {exercises &&
                  exercises
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
