import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Table from "@material-ui/core/Table";
import { Link } from "react-router-dom";
import { Paper, Button, Container } from "@material-ui/core";
import { userService } from "../../services/user-service";
import { history } from "../../helpers/history";
import * as routes from "../../constants/route-constants";

export const WorkoutDetails = (props) => {
  const { id } = useParams();
  const { setException } = props;
  const [workout, setWorkout] = useState(null);

  const onDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this workout?"))
      (async () => {
        try {
          const response = await userService.deleteWorkout(id);
          (await response) && history.push(routes.WORKOUTS_LIST);
        } catch (error) {
          setException(error);
        }
      })();
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await userService.getWorkout(id);
        (await response) && setWorkout(response);
      } catch (error) {
        setException(error);
      }
    })();
  }, []);

  return (
    <>
      {workout && <h1>{workout.name}</h1>}
      <Container maxWidth="sm">
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell component="th" scope="row">
                  Exercise
                </TableCell>
                <TableCell align="right">Weight</TableCell>
                <TableCell align="right">Reps</TableCell>
                <TableCell align="right">Sets</TableCell>
                <TableCell align="right">intensity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {workout &&
                workout.exercises &&
                workout.exercises.map((exercise, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {exercise.name}
                      </TableCell>
                      <TableCell align="right">{exercise.weight}</TableCell>
                      <TableCell align="right">{exercise.reps}</TableCell>
                      <TableCell align="right">{exercise.sets}</TableCell>
                      <TableCell align="right">{exercise.intensity}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        {workout && (
          <div className="mrgn-t8">
            <Link
              component={Button}
              className="button green-background"
              to={`/workouts/edit/${workout.id}`}
            >
              Edit
            </Link>
            <Button
              onClick={() => onDelete(workout.id)}
              className="button red-background"
            >
              Delete
            </Button>
          </div>
        )}
      </Container>
    </>
  );
};
