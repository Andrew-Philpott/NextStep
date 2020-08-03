import React, { useEffect, useState } from "react";
import { Grid, Button } from "@material-ui/core";
import { recordService } from "../../services";
import { RecordItem } from "./RecordItem";
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
  const [
    selectedExerciseType,
    setSelectedExerciseType,
  ] = useState<types.ExerciseType | null>(null);

  useEffect(() => {
    if (records.length === 0) {
      (async () => {
        try {
          const response = await recordService.getPRsForExercises();
          setRecords(response);
        } catch {
          setException(
            "We're having some technical difficulties. Please try again later."
          );
        }
      })();
    }
  }, []);

  const handleCreateRecord = async (values: types.CreateRecord) => {
    try {
      const record: types.Record = {
        recordId: 0,
        weight: values.weight,
        reps: values.reps,
        sets: values.sets,
        time: "",
        userId: 0,
        exerciseTypeId: selectedExerciseType?.exerciseTypeId,
      };
      const response = await recordService.createRecord(record);
      let newState = records.filter(
        (x) => x.exerciseTypeId !== selectedExerciseType?.exerciseTypeId
      );
      newState.push(response);
      setSelectedExerciseType(null);
      setRecords([...newState]);
    } catch {
      setException(
        "We're having some technical difficulties. Please try again later."
      );
    }
  };

  return (
    <React.Fragment>
      {records ? (
        <Grid container>
          <div className="spacer-32" />
          <Grid item xs={1} sm={2} md={3} lg={3} xl={3}></Grid>
          <Grid item xs={10} sm={8} md={6} lg={6} xl={6}>
            <h1>Records</h1>
            <Grid container direction="row" justify="center">
              {records.length !== 0 &&
                exerciseTypes &&
                exerciseTypes.map((exerciseType) => (
                  <RecordItem
                    key={exerciseType.exerciseTypeId}
                    onCreateRecord={handleCreateRecord}
                    exerciseType={exerciseType}
                    selectedExerciseType={selectedExerciseType}
                    setSelectedExerciseType={setSelectedExerciseType}
                    setException={setException}
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
          <Grid item xs={1} sm={2} md={3} lg={3} xl={3}>
            <Grid container>
              <Grid item xs={1} />
              <Grid item xs={10}>
                <Grid direction="row" container>
                  <h2 className="text-align-center">Filter by</h2>
                  <Button fullWidth className="button red-background mrgn-t8">
                    Strength
                  </Button>
                  <Button fullWidth className="button blue-background mrgn-t8">
                    Hypertrophy
                  </Button>
                  <Button fullWidth className="button green-background mrgn-t8">
                    Endurance
                  </Button>
                </Grid>
              </Grid>
              <Grid item xs={1}></Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <div>
          <h1>Loading</h1>
        </div>
      )}
    </React.Fragment>
  );
};
