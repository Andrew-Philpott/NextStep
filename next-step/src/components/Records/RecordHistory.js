import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { userService } from "../../services/user-service";
import { exerciseService } from "../../services/exercise-service";

export const RecordHistory = (props) => {
  const { id } = useParams();
  const { setException } = props;
  const [exercise, setExercise] = useState(null);
  const [record, setRecord] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (id && !record) {
      (async () => {
        try {
          const response = await userService.getRecordByExercise(id);
          (await response) &&
            setRecord(
              response.sort((a, b) => (a.weight < b.weight ? 1 : -1))[0]
            );
        } catch (error) {
          setException(error);
          history.push("/error");
        }
      })();
    }
  }, [id, record]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this record?"))
      (async () => {
        try {
          await userService.deleteRecord(id);
          history.push("/records");
        } catch (error) {
          setException(error);
        }
      })();
  };

  return (
    <React.Fragment>
      <Grid container>
        <div className="spacer" />
        <Grid item xs={1} sm={2} md={2} lg={2} xl={2}>
          <Grid justify="center" spacing={2} container>
            <div className="text-align-center">
              <h2>Filter by</h2>
              <Button
                style={{ minWidth: "130px", marginTop: "8px", color: "white" }}
                className="red-background"
              >
                Strength
              </Button>
              <Button
                style={{ minWidth: "130px", marginTop: "8px", color: "white" }}
                className="blue-background"
              >
                Hypertrophy
              </Button>
              <Button
                style={{ minWidth: "130px", marginTop: "8px", color: "white" }}
                className="green-background"
              >
                Endurance
              </Button>
            </div>
          </Grid>
        </Grid>
        <Grid item xs={10} sm={8} md={8} lg={8} xl={8}>
          {exercise && <h1>{exercise.name}</h1>}
          {record ? (
            <>
              <p>Weight: {record.weight}</p>
              <p>{record.time}</p>
            </>
          ) : (
            <h1>You dont have any records for this exercise yet</h1>
          )}
        </Grid>
        <Grid item xs={1} sm={2} md={2} lg={2} xl={2}></Grid>
      </Grid>
    </React.Fragment>
  );
};
