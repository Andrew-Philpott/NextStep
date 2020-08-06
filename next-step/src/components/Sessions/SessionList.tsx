import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Grid } from "@material-ui/core";
import { sessionService } from "../../services";
import { Session } from "../../types/types";

type Props = {
  setException: (value: string) => void;
};

const SessionList: React.FunctionComponent<Props> = ({ setException }) => {
  const [sessions, setSessions] = useState<Array<Session>>([]);

  useEffect(() => {
    if (!sessions) {
      (async () => {
        try {
          const response = await sessionService.getAllSessions();
          setSessions(response);
        } catch {
          setException(
            "We're having some technical difficulties. Please try again later."
          );
        }
      })();
    }
  }, [sessions]);

  return (
    <Grid container>
      <div className="spacer-32" />
      <Grid item xs={1} sm={2} md={2} lg={2} xl={2} />
      <Grid item xs={10} sm={8} md={8} lg={8} xl={8}>
        <React.Fragment>
          <h1>Sessions</h1>
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Workout
                  </TableCell>
                  <TableCell align="left">Start</TableCell>
                  <TableCell align="left">End</TableCell>
                  <TableCell align="left">Rating</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sessions &&
                  sessions.map((session) => (
                    <TableRow key={session.sessionId}>
                      <TableCell component="th" scope="row">
                        {session.workout.name}
                      </TableCell>
                      <TableCell align="left">{session.workoutStart}</TableCell>
                      <TableCell align="left">{session.workoutEnd}</TableCell>
                      <TableCell align="left">{session.rating}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </React.Fragment>
      </Grid>
      <Grid item xs={1} sm={2} md={2} lg={2} xl={2} />
    </Grid>
  );
};
export default SessionList;
