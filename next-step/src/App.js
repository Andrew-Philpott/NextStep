import React, { useEffect, useState, useContext } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { Button, Container } from "@material-ui/core";
import { UserRoute } from "./components/Auth/UserRoute";
import { Home } from "./components/Other/Home";
import { Exercises } from "./components/Exercises/Exercises";
import { Workouts } from "./components/Workouts/Workouts";
import { Login } from "./components/Auth/Login";
import { Register } from "./components/Auth/Register";
import { NavigationBar } from "./components/Other/NavigationBar";
import { ExerciseDetails } from "./components/Exercises/ExerciseDetails";
import { WorkoutDetails } from "./components/Workouts/WorkoutDetails";
import { WorkoutForm } from "./components/Workouts/WorkoutForm";
import { Sessions } from "./components/Sessions/Sessions";
import { RecordForm } from "./components/Exercises/RecordForm";
import * as routes from "./constants/route-constants";
import { Account } from "./components/Auth/Account";
import { userService } from "./services/user-service";
import { history } from "./helpers/history";
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [session, setSession] = useState(null);
  // useEffect(() => {
  //   userService.getCurrentSession((res) => {
  //     setSession(res);
  //   });
  // }, []);

  const handleEndSession = (id) => {
    const rating = parseInt(window.prompt("How would you rate that workout?"));

    userService
      .updateSession(id, {
        rating: rating,
      })
      .then(setSession(null))
      .catch((error) => console.log(error));
  };

  const onStartSession = (id) => {
    if (!session) {
      userService
        .createSession({ workoutId: id })
        .then((response) => {
          setSession(response);
        })
        .catch((error) => console.log(error));
    } else {
      alert(
        "You must complete your current session before starting a new one."
      );
    }
  };

  return (
    <div className="App">
      <Router history={history}>
        <NavigationBar
          {...(loggedIn ? JSON.parse(localStorage.getItem("user")) : null)}
        />

        {session && (
          <div className="current-session">
            <Button
              className="button green-background white-border float-right mrgn-r8"
              onClick={() => handleEndSession(session.id)}
            >
              End session
            </Button>
            <span className="float-right">
              Start time: {session.workoutStart}
            </span>
          </div>
        )}

        {alert.message && (
          <div className={`alert ${alert.type}`}>{alert.message}</div>
        )}
        <Container maxWidth="lg">
          <Switch>
            <Route exact path={routes.LANDING} component={Home} />
            <UserRoute exact path={routes.ACCOUNT} component={Account} />
            <UserRoute exact path={routes.RECORDS_NEW} component={RecordForm} />
            <UserRoute
              exact
              path={routes.EXERCISES_LIST}
              component={Exercises}
            />
            <UserRoute
              exact
              path={routes.EXERCISES_DETAILS}
              component={ExerciseDetails}
            />
            <UserRoute
              exact
              path={routes.WORKOUTS_LIST}
              component={() => <Workouts {...{ onStartSession }} />}
            />
            <UserRoute
              exact
              path={routes.WORKOUTS_NEW}
              component={WorkoutForm}
            />
            <UserRoute
              exact
              path={routes.WORKOUTS_DETAILS}
              component={WorkoutDetails}
            />
            <UserRoute
              exact
              path={routes.WORKOUTS_EDIT}
              component={WorkoutForm}
            />
            <UserRoute exact path={routes.SESSIONS_LIST} component={Sessions} />
            <Route
              path={routes.LOG_IN}
              component={() => <Login {...{ setSession, setLoggedIn }} />}
            />
            <Route path={routes.REGISTER} component={Register} />
            <Redirect from="*" to={routes.LANDING} />
          </Switch>
        </Container>
      </Router>
    </div>
  );
}
export default App;
