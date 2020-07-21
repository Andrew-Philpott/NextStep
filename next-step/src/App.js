import React, { useEffect, useState } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { Button } from "@material-ui/core";
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
import { Recoveries } from "./components/Recoveries/Recoveries";
import { userService } from "./services/user-service";
import { history } from "./helpers/history";
import { ErrorModal } from "./components/Other/ErrorModal";
import "./App.css";

function App() {
  const [session, setSession] = useState(null);
  const [exception, setException] = useState(null);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("user") !== null && !session)) {
      (async () => {
        try {
          const response = await userService.getCurrentSession();
          setSession(response);
        } catch (error) {
          setException(error);
        }
      })();
    }
  }, [session]);

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
  console.log(exception);
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

        {exception && (
          <ErrorModal exception={exception} setException={setException} />
        )}

        <Switch>
          <Route exact path={routes.LANDING} component={Home} />
          <UserRoute
            exact
            path={routes.ACCOUNT}
            component={() => <Recoveries setException={setException} />}
          />
          <UserRoute
            exact
            path={routes.RECORDS_NEW}
            component={() => <RecordForm setException={setException} />}
          />
          <UserRoute
            exact
            path={routes.EXERCISES_LIST}
            component={() => <Exercises setException={setException} />}
          />
          <UserRoute
            exact
            path={routes.EXERCISES_DETAILS}
            component={() => <ExerciseDetails setException={setException} />}
          />
          <UserRoute
            exact
            path={routes.WORKOUTS_LIST}
            component={() => (
              <Workouts
                handleStartSession={handleStartSession}
                setException={setException}
              />
            )}
          />
          <UserRoute
            exact
            path={routes.WORKOUTS_NEW}
            component={() => <WorkoutForm setException={setException} />}
          />
          <UserRoute
            exact
            path={routes.WORKOUTS_DETAILS}
            component={() => <WorkoutDetails setException={setException} />}
          />
          <UserRoute
            exact
            path={routes.WORKOUTS_EDIT}
            component={() => <WorkoutForm setException={setException} />}
          />
          <UserRoute exact path={routes.SESSIONS_LIST} component={Sessions} />
          <Route
            path={routes.LOG_IN}
            component={() => (
              <Login
                session={session}
                handleEndSession={handleEndSession}
                setException={setException}
              />
            )}
          />
          <Route
            path={routes.REGISTER}
            component={() => <Register setException={setException} />}
          />
          <Redirect from="*" to={routes.LANDING} />
        </Switch>
      </Router>
    </div>
  );
}
export default App;
