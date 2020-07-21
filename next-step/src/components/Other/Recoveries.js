import React, { useEffect, useState } from "react";
import { userService } from "../../services/user-service";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Table from "@material-ui/core/Table";
import { Paper, Grid } from "@material-ui/core";
import { HumanModel } from "./HumanModel";

export const Recoveries = () => {
  const [recoveries, setRecoveries] = useState(null);

  useEffect(() => {
    userService
      .getAllRecoveries()
      .then((response) => setRecoveries(response))
      .catch((error) => console.log(error));
  }, []);

  const handleCreateRecovery = (muscleId) => {
    if (muscleId > 0 && muscleId <= 14) {
      const fatigue = parseInt(window.prompt("Level of fatigue"));
      if (fatigue) {
        userService
          .createRecovery({
            muscleId: muscleId,
            fatigue: fatigue,
          })
          .then((response) => {
            setRecoveries([...recoveries, response]);
          })
          .catch((error) => console.log(error));
      }
    }
  };

  const handleEditRecovery = (id) => {
    if (id !== undefined) {
      const fatigue = parseInt(window.prompt("Level of fatigue"));
      if (fatigue) {
        userService
          .update(id, {
            fatigue: fatigue,
          })
          .then((response) =>
            setRecoveries([
              ...recoveries.map((x) => (x.id == response.id ? response : x)),
            ])
          )
          .catch((error) => console.log(error));
      }
    }
  };

  const handleDeleteRecovery = (id) => {
    if (window.confirm("Are you sure you want to delete this recovery?"))
      userService
        .deleteRecovery(id)
        .then(setRecoveries([...recoveries.filter((x) => x.id !== id)]))
        .catch((error) => console.log(error));
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <h1>Recoveries</h1>
        </Grid>

        <Grid item xs={6}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Muscle Group
                  </TableCell>
                  <TableCell align="right">Fatigue</TableCell>
                  <TableCell align="right">Time</TableCell>
                  <TableCell align="right">Edit</TableCell>
                  <TableCell align="right">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recoveries &&
                  recoveries
                    .sort((a, b) => (a.muscleGroup > b.muscleGroup ? 1 : -1))
                    .map((item) => {
                      return (
                        <TableRow key={item.id}>
                          <TableCell component="th" scope="row">
                            {item.muscleGroup}
                          </TableCell>
                          <TableCell align="right">{item.fatigue}</TableCell>
                          <TableCell align="right">{item.time}</TableCell>
                          <TableCell align="right">
                            <EditIcon
                              onClick={() => handleEditRecovery(item.id)}
                              style={{
                                cursor: "pointer",
                              }}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <DeleteIcon
                              onClick={() => handleDeleteRecovery(item.id)}
                              style={{
                                cursor: "pointer",
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item style={{ position: "relative" }} item xs={6}>
          <Grid
            item
            style={{ position: "absolute", height: "600px", width: "100%" }}
            xs={12}
          >
            <HumanModel
              recoveries={recoveries}
              onCreateRecovery={handleCreateRecovery}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
