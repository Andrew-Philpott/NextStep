import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Record, ExerciseType } from "../../types/types";

type Props = {
  record: Record | null;
  exerciseType: ExerciseType;
};

export const RecordItem: React.FunctionComponent<Props> = ({
  record,
  exerciseType,
}) => {
  return (
    <Grid container>
      <Grid alignItems="flex-end" container>
        <Grid item xs={6}>
          <h1>
            <Link to={`/exercises/${exerciseType.exerciseTypeId}`}>
              {exerciseType.name}
            </Link>
          </h1>
        </Grid>
        <Grid item xs={6}>
          <Grid container direction="row">
            <Grid item xs={6}>
              <Button
                component={Link}
                fullWidth
                className="button blue-background float-left"
                to={`/records/new/${exerciseType.exerciseTypeId}`}
              >
                New Record
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                component={Link}
                fullWidth
                style={{ minWidth: "117px" }}
                className="button green-background float-left"
                to={`/records/${exerciseType.exerciseTypeId}`}
              >
                History
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <div className="spacer">
            {record && (
              <h3>
                {record.weight}lbs on {record.time}
              </h3>
            )}
          </div>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid direction="row" container>
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
            <Grid container justify="center" direction="column">
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
        <hr></hr>
      </Grid>
    </Grid>
  );
};
