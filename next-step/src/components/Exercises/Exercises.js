import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Link } from "react-router-dom";
import { exerciseService } from "../../services/exercise-service";

export const Exercises = (props) => {
  const { setException } = props;
  const [exercises, setExercises] = useState(null);
  useEffect(() => {
    if (!exercises) {
      (async () => {
        try {
          const response = await exerciseService.getAll();
          setExercises(response);
        } catch (error) {
          setException(error);
        }
      })();
    }
  }, [exercises]);

  return (
    <Grid container>
      <div className="spacer" />
      <Grid item xs={1} sm={2} md={2} lg={2} xl={2}></Grid>
      <Grid item xs={10} sm={8} md={8} lg={8} xl={8}>
        <React.Fragment>
          <h1>Exercises</h1>

          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Name
                  </TableCell>
                  <TableCell align="left">Picture</TableCell>
                  <TableCell align="left">Primary</TableCell>
                  <TableCell align="left">Secondary</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {exercises &&
                  exercises.map((exercise) => (
                    <TableRow key={exercise.id}>
                      <TableCell component="th" scope="row">
                        <Link to={`/exercises/${exercise.id}`}>
                          {exercise.name}
                        </Link>
                      </TableCell>
                      <TableCell align="left" />
                      <TableCell align="left">
                        <ul className="pad-l0">
                          {exercise.muscles
                            .filter(
                              (x) => x.primary === true,
                              (x) => {
                                return x;
                              }
                            )
                            .sort((a, b) => (a.id < b.id ? 1 : -1))
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
                        </ul>
                      </TableCell>
                      <TableCell align="left">
                        <ul className="pad-l0">
                          {exercise.muscles
                            .filter(
                              (x) => x.primary === false,
                              (x) => {
                                return x;
                              }
                            )
                            .sort((a, b) => (a.id < b.id ? 1 : -1))
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
                        </ul>
                      </TableCell>
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
