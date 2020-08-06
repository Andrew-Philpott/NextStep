import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Record, ExerciseType } from "../../types/types";
import RecordForm from "./RecordForm";
import * as types from "../../types/types";
type Props = {
  record: Record | null;
  exerciseType: ExerciseType;
  selectedExerciseType: ExerciseType | null;
  setSelectedExerciseType: (value: ExerciseType | null) => void;
  onCreateRecord: (value: types.Record) => void;
};

export const RecordItem: React.FunctionComponent<Props> = ({
  record,
  exerciseType,
  selectedExerciseType,
  setSelectedExerciseType,
  onCreateRecord,
}) => {
  return (
    <Grid item xs={12}>
      <Grid alignItems="flex-end" container>
        <Grid item xs={6}>
          <h1>
            <Link to={`/records/${exerciseType.exerciseTypeId}`}>
              {exerciseType.name}
            </Link>
          </h1>
        </Grid>
        <Grid item xs={6}>
          <Grid container direction="row">
            {record && (
              <h3>
                {record.reps}x{record.sets} at {record.weight}lbs on{" "}
                {record.time}
              </h3>
            )}
          </Grid>
        </Grid>
      </Grid>
      <div className="spacer-16" />
      <Grid direction="row" container>
        <Grid item xs={6}>
          <Grid container>
            <Grid item xs={6}>
              <h4>Primary</h4>
              {exerciseType.muscles
                .filter((x) => x.primary === true)
                .sort((a, b) => (a.muscleId < b.muscleId ? 1 : -1))
                .map((muscle, index) => (
                  <li
                    style={{
                      listStyle: "none",
                      textAlign: "left",
                    }}
                    key={index}
                  >
                    {muscle.muscle.name}
                  </li>
                ))}
            </Grid>
            <Grid item xs={6}>
              <h4>Secondary</h4>
              {exerciseType.muscles
                .filter((x) => x.primary === false)
                .sort((a, b) => (a.muscleId < b.muscleId ? 1 : -1))
                .map((muscle, index) => (
                  <li
                    style={{
                      listStyle: "none",
                      textAlign: "left",
                    }}
                    key={index}
                  >
                    {muscle.muscle.name}
                  </li>
                ))}
            </Grid>
          </Grid>
        </Grid>
        <Grid style={{ position: "relative" }} item xs={6}>
          {selectedExerciseType === exerciseType ? (
            <RecordForm
              selectedExerciseType={selectedExerciseType}
              onCreateRecord={onCreateRecord}
              setSelectedExerciseType={setSelectedExerciseType}
            />
          ) : (
            <Button
              style={{ position: "absolute", bottom: "0px" }}
              fullWidth
              className="button blue-background mrgn-t8"
              onClick={() => setSelectedExerciseType(exerciseType)}
            >
              New Record
            </Button>
          )}
        </Grid>
      </Grid>
      <hr></hr>
    </Grid>
  );
};
