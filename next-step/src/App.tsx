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
import { RecordHistory } from "./components/Records/RecordHistory";
import { WorkoutForm } from "./components/Workouts/WorkoutForm";
import { SessionList } from "./components/Sessions/SessionList";
import * as routes from "./constants/route-constants";
import { sessionService, exerciseService } from "./services";
import { ErrorPage } from "./components/Other/ErrorPage";
import "./App.css";
import history from "./helpers/history";
import * as types from "./types/types";
import getUserFromLs from "../src/helpers/get-user-from-ls";

const App = () => {
  const [session, setSession] = useState<types.Session | null>(null);
  const [exerciseTypes, setExerciseTypes] = useState<Array<types.ExerciseType>>(
    []
  );
  const [exception, setException] = useState("");
  const [user, setUser] = useState<types.User | null>(null);
  const online = useOnlineStatus();

  useEffect(() => {
    if (!user) {
      setUser(getUserFromLs());
    }
  }, []);

  useEffect(() => {
    if (exerciseTypes.length === 0) {
      (async () => {
        try {
          const response = await exerciseService.getAll();
          setExerciseTypes(response);
        } catch {
          setException(
            "We're having some technical difficulties. Please try again later."
          );
        }
      })();
    }
  }, []);

  useEffect(() => {
    if (!session && user && online) {
      (async () => {
        try {
          const response = await sessionService.getCurrentSession();
          setSession(response);
        } catch {
          setException(
            "We're having some technical difficulties. Please try again later."
          );
        }
      })();
    }
  }, []);

  const handleEndSession = async (id: number) => {
    const answer: string | null = window.prompt(
      "How would you rate that workout?"
    );
    let rating: number = 0;
    if (answer) {
      rating = parseInt(answer);
    }
    if (rating >= 1 && rating <= 5) {
      try {
        await sessionService.updateSession(id, {
          rating: rating,
        });
        setSession(null);
      } catch {
        setException(
          "We're having some technical difficulties. Please try again later."
        );
      }
    }
  };

  const handleCreateSession = async (id: number) => {
    if (!session) {
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
          {session ? (
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
          ) : null}
          <Switch>
            {/* {exception && <ErrorPage exception={exception} />} */}
            <Route
              exact
              path={routes.LANDING}
              component={() => <Home user={user} setException={setException} />}
            />
            <Route
              exact
              path={routes.ERROR}
              component={() => <ErrorPage exception={exception} />}
            />

            <PrivateRoute
              exact
              user={user}
              path={routes.RECORDS_LIST}
              component={() => (
                <RecordList
                  exerciseTypes={exerciseTypes}
                  setException={setException}
                />
              )}
            />
            <PrivateRoute
              exact
              user={user}
              path={routes.RECORD_HISTORY}
              component={() => <RecordHistory setException={setException} />}
            />
            <PrivateRoute
              exact
              user={user}
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
              user={user}
              component={() => (
                <WorkoutForm
                  exerciseTypes={exerciseTypes}
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
                  exerciseTypes={exerciseTypes}
                  setException={setException}
                />
              )}
            />
            <PrivateRoute
              exact
              user={user}
              path={routes.SESSIONS_LIST}
              component={() => <SessionList setException={setException} />}
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
