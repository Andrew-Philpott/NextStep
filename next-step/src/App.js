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
import { ErrorModal } from "./components/Other/ErrorModal";
import "./App.css";

function App() {
  const [session, setSession] = useState(null);
  const [exception, setException] = useState(null);

  useEffect(() => {
    if (!session) {
      (async () => {
        try {
          const response = await userService.getCurrentSession();
          setSession(response);
        } catch (error) {
          setException(error);
        }
      })();
    }
  }, [history.location, session]);

  const handleEndSession = () => {
    const rating = parseInt(window.prompt("How would you rate that workout?"));
    (async () => {
      try {
        await userService.updateSession(session.id, {
          rating: rating,
        });
        setSession(null);
      } catch (error) {
        setException(error);
      }
    })();
  };

  const handleStartSession = (id) => {
    if (!session) {
      (async () => {
        try {
          const response = await userService.createSession({ workoutId: id });
          setSession(response);
        } catch (error) {
          setException(error);
        }
      })();
    } else {
      alert(
        "You must complete your current session before starting a new one."
      );
    }
  };

  return (
    <div className="App">
      <Router history={history}>
        <NavigationBar />

        {session && (
          <div className="current-session">
            <Button
              className="button green-background white-border float-right mrgn-r8"
              onClick={() => handleEndSession()}
            >
              End session
            </Button>
            <span className="float-right">
              Start time: {session.workoutStart}
            </span>
          </div>
        )}

        {exception && <ErrorModal errors={exception} />}
        <Container maxWidth="lg">
          <Switch>
            <Route exact path={routes.LANDING} component={Home} />
            <UserRoute exact path={routes.ACCOUNT} component={Account} />
            <UserRoute
              exact
              path={routes.RECORDS_NEW}
              component={() => <RecordForm {...{ setException }} />}
            />
            <UserRoute
              exact
              path={routes.EXERCISES_LIST}
              component={() => <Exercises {...{ setException }} />}
            />
            <UserRoute
              exact
              path={routes.EXERCISES_DETAILS}
              component={() => <ExerciseDetails {...{ setException }} />}
            />
            <UserRoute
              exact
              path={routes.WORKOUTS_LIST}
              component={() => (
                <Workouts {...{ handleStartSession, setException }} />
              )}
            />
            <UserRoute
              exact
              path={routes.WORKOUTS_NEW}
              component={() => <WorkoutForm {...{ setException }} />}
            />
            <UserRoute
              exact
              path={routes.WORKOUTS_DETAILS}
              component={() => <WorkoutDetails {...{ setException }} />}
            />
            <UserRoute
              exact
              path={routes.WORKOUTS_EDIT}
              component={() => <WorkoutForm {...{ setException }} />}
            />
            <UserRoute exact path={routes.SESSIONS_LIST} component={Sessions} />
            <Route
              path={routes.LOG_IN}
              component={() => <Login {...{ session, handleEndSession }} />}
            />
            <Route
              path={routes.REGISTER}
              component={() => <Register {...{ setException }} />}
            />
            <Redirect from="*" to={routes.LANDING} />
          </Switch>
        </Container>
      </Router>
    </div>
  );
}
export default App;
