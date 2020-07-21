import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Grid } from "@material-ui/core";
import { userService } from "../../services/user-service";

export const Sessions = () => {
  const [sessions, setSessions] = useState(null);
  const [errors, setErrors] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const response = await userService.getAllSessions();
        setSessions(response);
      } catch (error) {
        setErrors(error);
      }
    })();
  }, []);

  return (
    <Grid container>
      <div className="spacer" />
      <Grid item xs={1} sm={2} md={2} lg={3} xl={3} />
      <Grid item xs={10} sm={8} md={8} lg={6} xl={6}>
        <React.Fragment>
          <h1>Sessions</h1>

          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Workout
                  </TableCell>
                  <TableCell align="right">Start</TableCell>
                  <TableCell align="right">End</TableCell>
                  <TableCell align="right">Rating</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sessions &&
                  sessions.map((session) => (
                    <TableRow key={session.id}>
                      <TableCell component="th" scope="row">
                        {session.workout.name}
                      </TableCell>
                      <TableCell align="right">
                        {session.workoutStart}
                      </TableCell>
                      <TableCell align="right">{session.workoutEnd}</TableCell>
                      <TableCell align="right">{session.rating}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </React.Fragment>
      </Grid>
      <Grid item xs={1} sm={2} md={2} lg={3} xl={3} />
    </Grid>
  );
};
