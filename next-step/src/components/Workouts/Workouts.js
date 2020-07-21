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
  const { onStartSession } = props;

  useEffect(() => {
    userService
      .getAllWorkouts()
      .then((response) => setWorkouts(response))
      .catch((error) => console.log(error));
  }, []);

  return (
    <Grid container>
      <div className="spacer" />
      <Grid item xs={1} sm={2} md={2} lg={3} xl={3} />
      <Grid component={Paper} item xs={10} sm={8} md={8} lg={6} xl={6}>
        <h1>Workouts</h1>
        <Link
          component={Button}
          className="button blue-background float-right"
          to={routes.WORKOUTS_NEW}
        >
          Create Workout
        </Link>

        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell component="th" scope="row">
                  Name
                </TableCell>
                <TableCell align="right">Notes</TableCell>
                <TableCell align="right">Start Session</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {workouts &&
                workouts.map((workout) => (
                  <TableRow key={workout.id}>
                    <TableCell component="th" scope="row">
                      <Link
                        style={{ textDecoration: "none" }}
                        to={`/workouts/${workout.id}`}
                      >
                        {workout.name}
                      </Link>
                    </TableCell>
                    <TableCell align="right">{workout.notes}</TableCell>
                    <TableCell align="right">
                      <Button onClick={() => onStartSession(workout.id)}>
                        <CheckIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={1} sm={2} md={2} lg={3} xl={3} />
    </Grid>
  );
};
