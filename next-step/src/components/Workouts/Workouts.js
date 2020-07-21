import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Paper, Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import CheckIcon from "@material-ui/icons/Check";
import { userService } from "../../services/user-service";
import * as routes from "../../constants/route-constants";

export const Workouts = (props) => {
  const [workouts, setWorkouts] = useState(null);
  const { handleStartSession, setException } = props;

  useEffect(() => {
    if (!workouts) {
      (async () => {
        try {
          const response = await userService.getAllWorkouts();
          setWorkouts(response);
        } catch (error) {
          setException(error);
        }
      })();
    }
  }, [workouts]);

  return (
    <Grid container>
      <div className="spacer" />
      <Grid item xs={1} sm={2} md={2} lg={2} xl={2} />
      <Grid item xs={10} sm={8} md={8} lg={8} xl={8}>
        <h1>Workouts</h1>

        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell component="th" scope="row">
                  Name
                </TableCell>
                <TableCell align="left">Notes</TableCell>
                <TableCell align="left">Start Session</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {workouts &&
                workouts.map((workout) => (
                  <TableRow key={workout.id}>
                    <TableCell component="th" scope="row">
                      <Link to={`/workouts/${workout.id}`}>{workout.name}</Link>
                    </TableCell>
                    <TableCell align="left">{workout.notes}</TableCell>
                    <TableCell align="left">
                      <Button onClick={() => handleStartSession(workout.id)}>
                        <CheckIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={1} sm={2} md={2} lg={2} xl={2}>
        <Grid container justify="center">
          <Button
            component={Link}
            className="button blue-background float-right"
            to={routes.WORKOUTS_NEW}
          >
            Create Workout
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
