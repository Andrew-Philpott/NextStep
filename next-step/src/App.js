import React, { useEffect, useState } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { Button } from "@material-ui/core";
import { UserRoute } from "./components/Auth/UserRoute";
import { Home } from "./components/Other/Home";
import { Records } from "./components/Records/Records";
import { Workouts } from "./components/Workouts/Workouts";
import { Login } from "./components/Auth/Login";
import { Register } from "./components/Auth/Register";
import { NavigationBar } from "./components/Other/NavigationBar";
import { ExerciseDetails } from "./components/Records/ExerciseDetails";
import { WorkoutDetails } from "./components/Workouts/WorkoutDetails";
import { WorkoutForm } from "./components/Workouts/WorkoutForm";
import { Sessions } from "./components/Sessions/Sessions";
import { RecordForm } from "./components/Records/RecordForm";
import * as routes from "./constants/route-constants";
import { Account } from "./components/Auth/Account";
import { userService } from "./services/user-service";
import { history } from "./helpers/history";
import { ErrorModal } from "./components/Other/ErrorModal";
import "./App.css";

function App() {
  const [session, setSession] = useState(null);
  const [exception, setException] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const user = localStorage.getItem("user");
  // useEffect(() => {
  //   if (
  //     JSON.parse(
  //       localStorage.getItem("user") !== null &&
  //         history.location.pathname == "/" &&
  //         !session
  //     )
  //   ) {
  //     (async () => {
  //       try {
  //         const response = await userService.getCurrentSession();
  //         setSession(response);
  //       } catch (error) {
  //         setException(error);
  //       }
  //     })();
  //   }
  // }, [session]);

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
    <div style={{ height: "100%", width: "100%" }} className="App">
      <Router history={history}>
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
        <NavigationBar user={user} />
        {/* {exception && (
          <ErrorModal exception={exception} setException={setException} />
        )} */}

        <Switch>
          <Route exact path={routes.LANDING} component={Home} />
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
            path={routes.RECORDS}
            component={() => <Records setException={setException} />}
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
          <UserRoute
            exact
            path={routes.SESSIONS_LIST}
            component={() => <Sessions setException={setException} />}
          />
          <Route
            path={routes.LOG_IN}
            component={() => (
              <Login
                setLoggedIn={setLoggedIn}
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
