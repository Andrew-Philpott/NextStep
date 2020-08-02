import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Button } from "@material-ui/core";
import { PrivateRoute } from "./components/Auth/PrivateRoute";
import { useOnlineStatus } from "./components/Other/useOnlineStatus";
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
import { isNumber } from "util";
import * as types from "./types/types";

function setUserFromLocalStorage() {
  const jsonParserUnknown = (jsonString: string): unknown =>
    JSON.parse(jsonString);
  let userAsStringOrNull: string | null = localStorage.getItem("user");
  let user: types.User = null;
  if (userAsStringOrNull) {
    user = jsonParserUnknown(userAsStringOrNull) as types.User;
  }
  return user;
}

const App = () => {
  const [session, setSession] = useState<types.Session>(null);
  const [exercises, setExercises] = useState(null);
  const [exception, setException] = useState("");
  const [user, setUser] = useState<types.User>(setUserFromLocalStorage);
  const online = useOnlineStatus();

  useEffect(() => {}, [user]);

  const handleLogout = () => {
    userService.logout();
    setUser(null);
  };

  useEffect(() => {
    if (!exercises) {
      (async () => {
        try {
          const response = await exerciseService.getAll();
          (await response) && setExercises(response);
        } catch {
          console.log("error");
          // setException(
          //   "We're having some technical difficulties. Please try again later."
          // );
        }
      })();
    }
  }, [exercises]);

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
        <Router>
          <NavigationBar onLogout={handleLogout} user={user} />
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
              user={user}
              path={routes.ACCOUNT}
              component={() => <Account setException={setException} />}
            />
            <PrivateRoute
              exact
              path={routes.RECORDS_NEW}
              component={() => <RecordForm setException={setException} />}
            />
            <PrivateRoute
              exact
              path={routes.RECORDS_LIST}
              component={() => (
                <Records exercises={exercises} setException={setException} />
              )}
            />
            <PrivateRoute
              exact
              path={routes.RECORD_HISTORY}
              component={() => <RecordHistory setException={setException} />}
            />
            <PrivateRoute
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
            <PrivateRoute
              path={routes.WORKOUTS_NEW}
              component={() => (
                <WorkoutForm
                  exercises={exercises}
                  setException={setException}
                />
              )}
            />
            <PrivateRoute
              exact
              user={user}
              path={routes.WORKOUTS_EDIT}
              component={() => (
                <WorkoutForm
                  exercises={exercises}
                  setException={setException}
                />
              )}
            />
            <PrivateRoute
              exact
              path={routes.SESSIONS_LIST}
              component={() => <Sessions setException={setException} />}
            />
            <Route
              path={routes.LOG_IN}
              component={() => (
                <Login setUser={setUser} setException={setException} />
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
