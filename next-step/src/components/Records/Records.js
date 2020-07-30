import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { recordService } from "../../services";
import { Record } from "./Record";
import { useHistory } from "react-router-dom";

export const Records = (props) => {
  const { exercises, setException } = props;
  const [records, setRecords] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (!records) {
      (async () => {
        try {
          const response = await recordService.getPRsForExercises();
          (await response) && setRecords(response);
        } catch (error) {
          history.push("/error");
          setException(error);
        }
      })();
    }
  }, [records]);

  return (
    <React.Fragment>
      {records ? (
        <Grid container>
          <div className="spacer" />
          <Grid item xs={1} sm={2} md={3} lg={3} xl={3} />
          <Grid item xs={10} sm={8} md={6} lg={6} xl={6}>
            <h1>Records</h1>
            <Grid container direction="row" justify="center">
              {exercises &&
                records &&
                exercises.map((exercise) => (
                  <Record
                    key={exercise.exerciseTypeId}
                    exercise={exercise}
                    record={
                      records
                        ? records.filter(
                            (x) => x.exerciseTypeId === exercise.exerciseTypeId
                          )[0]
                        : null
                    }
                    setException={setException}
                  />
                ))}
            </Grid>
          </Grid>
          <Grid item xs={1} sm={2} md={3} lg={3} xl={3} />
        </Grid>
      ) : (
        <div>
          <h1>Loading</h1>
        </div>
      )}
    </React.Fragment>
  );
};
