import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { recordService } from "../../services/record-service";
import { exerciseService } from "../../services/exercise-service";
import { Record } from "../../types/types";

type Props = {
  setException: (value: string) => void;
};

export const RecordHistory: React.FunctionComponent<Props> = ({
  setException,
}) => {
  const { id } = useParams();
  const [exercise, setExercise] = useState(null);
  const [records, setRecords] = useState<Array<Record>>([]);
  const history = useHistory();

  useEffect(() => {
    if (id && !records) {
      (async () => {
        try {
          const response: Array<Record> = await recordService.getAllRecordsForExercise(
            id as number
          );
          setRecords(response.sort((a, b) => (a.weight < b.weight ? 1 : -1)));
        } catch {
          setException(
            "We're having some technical difficulties. Please try again later."
          );
          history.push("/error");
        }
      })();
    }
  }, [id, records]);

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this record?"))
      (async () => {
        try {
          await recordService.deleteRecord(id);
          history.push("/records");
        } catch {
          setException(
            "We're having some technical difficulties. Please try again later."
          );
          history.push("/error");
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
        {/* <Grid item xs={10} sm={8} md={8} lg={8} xl={8}>
          {exercise && <h1>{exercise.name}</h1>}
          {record ? (
            <>
              <p>Weight: {record.weight}</p>
              <p>{record.time}</p>
            </>
          ) : (
            <h1>You dont have any records for this exercise yet</h1>
          )}
        </Grid> */}
        <Grid item xs={1} sm={2} md={2} lg={2} xl={2}></Grid>
      </Grid>
    </React.Fragment>
  );
};
