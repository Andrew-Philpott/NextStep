import React from "react";
import { useParams } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { recordService } from "../../services/record-service";
import { Record } from "../../types/types";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";

type Props = {
  setException: (value: string) => void;
};

const RecordHistory: React.FunctionComponent<Props> = ({ setException }) => {
  const { id } = useParams();
  const [records, setRecords] = React.useState<Array<Record>>([]);
  const history = useHistory();

  React.useEffect(() => {
    if (id && records.length === 0) {
      (async () => {
        try {
          const response: Array<Record> = await recordService.getAllRecordsForExercise(
            parseInt(id)
          );
          setRecords(response);
        } catch {
          setException(
            "We're having some technical difficulties. Please try again later."
          );
        }
      })();
    }
  }, []);

  const handleDeleteRecord = (id: number) => {
    if (window.confirm("Are you sure you want to delete this record?"))
      (async () => {
        try {
          const response = await recordService.deleteRecord(id);
          if (response.recordId === id) {
            history.push("/records");
          }
        } catch {
          setException(
            "We're having some technical difficulties. Please try again later."
          );
        }
      })();
  };

  return (
    <React.Fragment>
      <Grid className="mrgn-t24" container>
        <h1>Records</h1>
        <Grid item xs={1} sm={2} md={2} lg={2} xl={2} />
        <Grid justify="center" spacing={2} container>
          {records &&
            records.map((record, index) => {
              return (
                <React.Fragment key={index}>
                  <p>
                    {record.reps}x{record.sets} at {record.weight}lbs on{" "}
                    {record.dateCreated}
                  </p>
                  <DeleteOutlinedIcon
                    className="pointer"
                    onClick={() => handleDeleteRecord(record.recordId)}
                  >
                    X
                  </DeleteOutlinedIcon>
                </React.Fragment>
              );
            })}
        </Grid>
        <Grid item xs={1} sm={2} md={2} lg={2} xl={2} />
      </Grid>
    </React.Fragment>
  );
};
export default RecordHistory;
