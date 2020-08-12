import React from "react";
import { Grid, Button, Paper, Popover, Typography } from "@material-ui/core";
import { MuscleModel } from "../MuscleModel/MuscleModel";
import { User } from "../../types/types";
import InfoIcon from "@material-ui/icons/Info";

type Props = {
  setException: (value: string) => void;
  user: User | null;
};

const Home: React.FunctionComponent<Props> = ({ user, setException }) => {
  const [
    recoveryDefintionsVisible,
    setRecoveryDefinitionsVisible,
  ] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <Grid container>
      {user === null && (
        <React.Fragment>
          <h1>Welcome to NextStep Fitness</h1>
          <br></br>
          <p>
            <i>Keep easy tabs on your bodys recovery</i>
          </p>
        </React.Fragment>
      )}

      <Grid container>
        <div className="spacer-32" />
        <Grid item xs={3} sm={3} md={3} lg={3} xl={3} />
        <Grid
          style={{ padding: "20px" }}
          component={Paper}
          item
          xs={6}
          sm={6}
          md={6}
          lg={6}
          xl={6}
        >
          {user && (
            <React.Fragment>
              <span
                className="float-right"
                area-aria-describedby={id}
                onClick={handleClick}
              >
                <InfoIcon />
              </span>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                style={{ width: "80%" }}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <Typography style={{ padding: "20px" }}>
                  {recoveryDefintionsVisible ? (
                    <React.Fragment>
                      The fatigue level of each muscle group and how many days
                      it will take to recover as a function of the muscle
                      recovery profile you established. Green: 0 days. Red: Max
                      days. You can change your fatigue level by clicking on the
                      model and entering a number between 1(not sore at all) and
                      5(very sore).
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      The muscle recovery profile for your body and how long it
                      will take for each muscle to recover after an intense
                      workout specific to that muscle group. Green: 0 days. Red:
                      Max days. You can change your muscle recovery profile for
                      each muscle group by clicking on it and entering the
                      number of days it would take for it to recover.
                    </React.Fragment>
                  )}
                </Typography>
              </Popover>
              {recoveryDefintionsVisible ? (
                <h1>Recovery definitions</h1>
              ) : (
                <h1>Current recovery</h1>
              )}
            </React.Fragment>
          )}
          <MuscleModel
            setException={setException}
            user={user}
            defineRecoveries={recoveryDefintionsVisible}
          />
          <Button
            onClick={() =>
              setRecoveryDefinitionsVisible(!recoveryDefintionsVisible)
            }
            className="button blue-background"
          >
            {recoveryDefintionsVisible ? (
              <span>View fatigue profile</span>
            ) : (
              <span>View recovery profile</span>
            )}
          </Button>
        </Grid>
        <Grid item xs={3} sm={3} md={3} lg={3} xl={3} />
      </Grid>
    </Grid>
  );
};

export default Home;
