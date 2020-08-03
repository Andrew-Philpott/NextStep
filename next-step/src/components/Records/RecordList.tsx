import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { recordService } from "../../services";
import { RecordItem } from "./RecordItem";
import { useHistory } from "react-router-dom";
import * as types from "../../types/types";

type Props = {
  setException: (value: string) => void;
  exerciseTypes: Array<types.ExerciseType>;
};

export const RecordList: React.FunctionComponent<Props> = ({
  exerciseTypes,
  setException,
}) => {
  const [records, setRecords] = useState<Array<types.Record>>([]);
  const history = useHistory();

  useEffect(() => {
    if (records.length === 0) {
      console.log("no records");
      (async () => {
        try {
          const response = await recordService.getPRsForExercises();
          (await response) && console.log(response);
          (await response) && setRecords(response);
        } catch {
          setException(
            "We're having some technical difficulties. Please try again later."
          );
          history.push("/error");
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
              {records &&
                exerciseTypes &&
                exerciseTypes.map((exerciseType) => (
                  <RecordItem
                    key={exerciseType.exerciseTypeId}
                    exerciseType={exerciseType}
                    record={
                      records
                        ? records.filter(
                            (x) =>
                              x.exerciseTypeId === exerciseType.exerciseTypeId
                          )[0]
                        : null
                    }
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