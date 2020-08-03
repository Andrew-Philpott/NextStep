import React, { useEffect, useState } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { Button } from "@material-ui/core";
import { PrivateRoute } from "./components/Auth/PrivateRoute";
import { useOnlineStatus } from "./components/Other/useOnlineStatus";
import { Home } from "./components/Other/Home";
import { RecordList } from "./components/Records/RecordList";
import { WorkoutList } from "./components/Workouts/WorkoutList";
import { Login } from "./components/Auth/Login";
import { Register } from "./components/Auth/Register";
import { NavigationBar } from "./components/Other/NavigationBar";
// import { RecordHistory } from "./components/Records/RecordHistory";
import { WorkoutForm } from "./components/Workouts/WorkoutForm";
import { Sessions } from "./components/Sessions/Sessions";
import { RecordForm } from "./components/Records/RecordForm";
import * as routes from "./constants/route-constants";
import { Account } from "./components/Auth/Account";
import { userService, sessionService, exerciseService } from "./services";
import { ErrorPage } from "./components/Other/ErrorPage";
import "./App.css";
import history from "./helpers/history";
import { isNumber } from "util";
import * as types from "./types/types";

function setUserFromLocalStorage() {
  const jsonParserUnknown = (jsonString: string): unknown =>
    JSON.parse(jsonString);
  let userString: string | null = localStorage.getItem("user");
  return userString ? (jsonParserUnknown(userString) as types.User) : null;
}

const App = () => {
  const [session, setSession] = useState<types.Session>(null);
  const [exerciseTypes, setExerciseTypes] = useState<Array<types.ExerciseType>>(
    []
  );
  const [exception, setException] = useState("");
  const [user, setUser] = useState<types.User | null>(null);
  const online = useOnlineStatus();
  console.log(localStorage.getItem("user"));
  const handleLogin = () => {
    setUser(setUserFromLocalStorage);
    history.push("/account");
  };

  useEffect(() => {
    if (exerciseTypes.length === 0 && user) {
      (async () => {
        try {
          const response = await exerciseService.getAll();
          (await response) && setExerciseTypes(response);
        } catch {
          setException(
            "We're having some technical difficulties. Please try again later."
          );
        }
      })();
    }
  }, [exerciseTypes]);

  useEffect(() => {}, [user]);

  console.log(user);
  useEffect(() => {
    if (!session && user && online) {
      (async () => {
        try {
          const response = await sessionService.getCurrentSession();
          (await response) && setSession(response);
        } catch {
          setException(
            "We're having some technical difficulties. Please try again later."
          );
        }
      })();
    }
  }, [session]);

  const handleEndSession = async (id: number) => {
    const answer = window.prompt("How would you rate that workout?");
    let rating: number = 0;
    if (isNumber(answer) && answer >= 1 && answer <= 5) {
      rating = parseInt(answer);
      try {
        const response = await sessionService.updateSession(id, {
          rating: rating,
        });
        (await response) && setSession(response);
      } catch {
        setException(
          "We're having some technical difficulties. Please try again later."
        );
      }
    }
  };

  const handleCreateSession = (id: number) => {
    if (!session) {
      (async () => {
        try {
          const response = await sessionService.createSession({
            workoutId: id,
          });
          setSession(response);
        } catch {
          setException(
            "We're having some technical difficulties. Please try again later."
          );
        }
      })();
    } else {
      alert(
        "You must complete your current session before starting a new one."
      );
    }
  };

  return (
    <div id="App">
      <div>
        <Router history={history}>
          <NavigationBar user={user} />
          {session && (
            <div className="current-session">
              <Button
                className="button green-background white-border float-right mrgn-r8"
                onClick={() => handleEndSession(session.sessionId)}
              >
                End session
              </Button>
              <span className="float-right">
                Start time: {session.workoutStart}
              </span>
            </div>
          )}

          <Switch>
            {exception && <ErrorPage exception={exception} />}
            <Route
              exact
              path={routes.LANDING}
              component={() => <Home setException={setException} />}
            />
            <Route
              exact
              path={routes.ERROR}
              component={() => <ErrorPage exception={exception} />}
            />
            <PrivateRoute
              exact
              user={user ? user : undefined}
              path={routes.ACCOUNT}
              component={() => <Account setException={setException} />}
            />
            <PrivateRoute
              exact
              user={user ? user : undefined}
              path={routes.RECORDS_NEW}
              component={() => (
                <RecordForm
                  exerciseTypes={exerciseTypes}
                  setException={setException}
                />
              )}
            />
            <PrivateRoute
              exact
              user={user ? user : undefined}
              path={routes.RECORDS_LIST}
              component={() => (
                <RecordList
                  exerciseTypes={exerciseTypes}
                  setException={setException}
                />
              )}
            />
            {/* <PrivateRoute
              exact
              path={routes.RECORD_HISTORY}
              component={() => <RecordHistory setException={setException} />}
            /> */}
            <PrivateRoute
              exact
              user={user ? user : undefined}
              path={routes.WORKOUTS_LIST}
              component={() => (
                <WorkoutList
                  onCreateSession={handleCreateSession}
                  setException={setException}
                />
              )}
            />
            <PrivateRoute
              path={routes.WORKOUTS_NEW}
              user={user ? user : undefined}
              component={() => (
                <WorkoutForm
                  exerciseTypes={exerciseTypes}
                  setException={setException}
                />
              )}
            />
            <PrivateRoute
              exact
              user={user ? user : undefined}
              path={routes.WORKOUTS_EDIT}
              component={() => (
                <WorkoutForm
                  exerciseTypes={exerciseTypes}
                  setException={setException}
                />
              )}
            />
            <PrivateRoute
              exact
              user={user ? user : undefined}
              path={routes.SESSIONS_LIST}
              component={() => <Sessions setException={setException} />}
            />
            <Route
              path={routes.LOG_IN}
              component={() => (
                <Login onLogin={handleLogin} setException={setException} />
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
    </div>
  );
};
export default App;
