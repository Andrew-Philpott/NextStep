import React, { useState, Suspense, lazy } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import PrivateRoute from "./components/Auth/PrivateRoute";
import RecordList from "./components/Records/RecordList";
import WorkoutList from "./components/Workouts/WorkoutList";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import NavigationBar from "./components/Other/NavigationBar";
import RecordHistory from "./components/Records/RecordHistory";
import WorkoutForm from "./components/Workouts/WorkoutForm";
import SessionList from "./components/Sessions/SessionList";
import WorkoutDetails from "./components/Workouts/WorkoutDetails";
import * as routes from "./constants/route-constants";
import { sessionService, exerciseService } from "./services";
import Error from "./components/Other/Error";
import "./App.css";
import history from "./helpers/history";
import { Session, ExerciseType, User } from "./types/types";
import getUserFromLs from "../src/helpers/get-user-from-ls";
import Home from "./components/Other/Home";
import useOnlineStatus from "./components/Other/useOnlineStatus";
import CurrentSession from "./components/Sessions/CurrentSession";

const App = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [exerciseTypes, setExerciseTypes] = useState<Array<ExerciseType>>([]);
  const [exception, setException] = useState("");
  const [user, setUser] = useState<User | null>(null);

  const online = useOnlineStatus();
  if (!online) {
    history.push("/login");
  }

  React.useEffect(() => {
    if (!user) {
      setUser(getUserFromLs());
    }
  }, [user]);

  React.useEffect(() => {
    if (exerciseTypes.length === 0 && user) {
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
  }, [user]);

  React.useEffect(() => {
    if (!session && user) {
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
  }, [user]);

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
          sessionId: 0,
          workoutStart: "",
          workoutEnd: "",
          rating: rating,
          workoutId: id,
          userId: 0,
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
          sessionId: 0,
          workoutStart: "",
          workoutEnd: "",
          rating: 0,
          workoutId: id,
          userId: 0,
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
    <div className="App">
      <Router history={history}>
        <NavigationBar user={user} />
        <CurrentSession session={session} onEndSession={handleEndSession} />
        <Switch>
          <Route exact path={routes.LANDING}>
            <Home user={user} setException={setException} />
          </Route>
          <Route exact path={routes.ERROR}>
            <Error exception={exception} />
          </Route>
          <Route path={routes.LOG_IN}>
            <Login setUser={setUser} setException={setException} />
          </Route>
          <Route path={routes.REGISTER}>
            <Register setException={setException} />
          </Route>
          <PrivateRoute exact path={routes.ACCOUNT}>
            <Home user={user} setException={setException} />
          </PrivateRoute>
          <PrivateRoute exact path={routes.RECORDS_LIST}>
            <RecordList
              exerciseTypes={exerciseTypes}
              setException={setException}
            />
          </PrivateRoute>
          <PrivateRoute exact path={routes.RECORD_HISTORY}>
            <RecordHistory setException={setException} />
          </PrivateRoute>
          <PrivateRoute exact path={routes.WORKOUTS_LIST}>
            <WorkoutList
              user={user}
              onCreateSession={handleCreateSession}
              setException={setException}
            />
          </PrivateRoute>
          <PrivateRoute path={routes.WORKOUTS_NEW}>
            <WorkoutForm
              exerciseTypes={exerciseTypes}
              setException={setException}
            />
          </PrivateRoute>
          <PrivateRoute path={routes.WORKOUTS_EDIT}>
            <WorkoutForm
              exerciseTypes={exerciseTypes}
              setException={setException}
            />
          </PrivateRoute>
          <PrivateRoute path={routes.WORKOUTS_DETAILS}>
            <WorkoutDetails setException={setException} />
          </PrivateRoute>
          <PrivateRoute exact path={routes.SESSIONS_LIST}>
            <SessionList setException={setException} />
          </PrivateRoute>
          <Redirect from="*" to={routes.LANDING} />
        </Switch>
      </Router>
    </div>
  );
};
export default App;
