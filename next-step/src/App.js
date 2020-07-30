import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useHistory,
} from "react-router-dom";
import { Button } from "@material-ui/core";
import { UserRoute } from "./components/Auth/UserRoute";
import { Home } from "./components/Other/Home";
import { Records } from "./components/Records/Records";
import { Workouts } from "./components/Workouts/Workouts";
import { Login } from "./components/Auth/Login";
import { Register } from "./components/Auth/Register";
import { NavigationBar } from "./components/Other/NavigationBar";
import { RecordHistory } from "./components/Records/RecordHistory";
import { WorkoutForm } from "./components/Workouts/WorkoutForm";
import { Sessions } from "./components/Sessions/Sessions";
import { RecordForm } from "./components/Records/RecordForm";
import * as routes from "./constants/route-constants";
import { Account } from "./components/Auth/Account";
import { userService, sessionService, exerciseService } from "./services";
import { ErrorPage } from "./components/Other/ErrorPage";
import "./App.css";

function App() {
  const [session, setSession] = useState(null);
  const [exercises, setExercises] = useState(null);
  const [exception, setException] = useState(null);
  const user = localStorage.getItem("user");
  const history = useHistory();

  useEffect(() => {
    if (!exercises && user) {
      (async () => {
        try {
          const response = await exerciseService.getAll();
          (await response) && setExercises(response);
        } catch (error) {
          setException(error);
          history.push("/error");
        }
      })();
    }
  }, [exercises]);

  useEffect(() => {
    if (!session && user) {
      (async () => {
        try {
          const response = await sessionService.getCurrentSession();
          (await response) && setSession(response);
        } catch (error) {
          setException(error);
          history.push("/error");
        }
      })();
    }
  }, [session]);

  const handleEndSession = () => {
    const rating = parseInt(window.prompt("How would you rate that workout?"));
    (async () => {
      try {
        const response = await userService.updateSession(session.sessionId, {
          rating: rating,
        });
        (await response) && setSession(response);
      } catch (error) {
        setException(error);
        history.push("/error");
      }
    })();
  };

  const handleCreateSession = (id) => {
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

  console.log(session);
  return (
    <div id="App">
      <div>
        <Router>
          <NavigationBar user={user} />
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

          <Switch>
            <Route exact path={routes.LANDING} component={Home} />
            <Route
              exact
              path={routes.ERROR}
              component={() => <ErrorPage exception={exception} />}
            />
            <UserRoute
              exact
              path={routes.ACCOUNT}
              component={() => <Account setException={setException} />}
            />
            <UserRoute
              exact
              path={routes.RECORDS_NEW}
              component={() => <RecordForm setException={setException} />}
            />
            <UserRoute
              exact
              path={routes.RECORDS_LIST}
              component={() => (
                <Records exercises={exercises} setException={setException} />
              )}
            />
            <UserRoute
              exact
              path={routes.RECORD_HISTORY}
              component={() => <RecordHistory setException={setException} />}
            />
            <UserRoute
              exact
              path={routes.WORKOUTS_LIST}
              component={() => (
                <Workouts
                  exercises={exercises}
                  onCreateSession={handleCreateSession}
                  setException={setException}
                />
              )}
            />
            <UserRoute
              path={routes.WORKOUTS_NEW}
              component={() => (
                <WorkoutForm
                  exercises={exercises}
                  setException={setException}
                />
              )}
            />
            <UserRoute
              exact
              path={routes.WORKOUTS_EDIT}
              component={() => (
                <WorkoutForm
                  exercises={exercises}
                  setException={setException}
                />
              )}
            />
            <UserRoute
              exact
              path={routes.SESSIONS_LIST}
              component={() => <Sessions setException={setException} />}
            />
            <Route
              path={routes.LOG_IN}
              component={() => <Login setException={setException} />}
            />
            <Route
              path={routes.REGISTER}
              component={() => <Register setException={setException} />}
            />
            <Redirect from="*" to={routes.LANDING} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}
export default App;
