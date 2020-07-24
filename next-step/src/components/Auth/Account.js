import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { userService } from "../../services/user-service";
import { HumanModel } from "../Other/HumanModel";

export const Account = (props) => {
  const [recoveries, setRecoveries] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const { setException } = props;
  useEffect(() => {
    if (!loaded) {
      userService
        .getAllRecoveries()
        .then((response) => {
          setRecoveries(response);
        })
        .catch((error) => {
          setException(error);
        });
    }
  }, [loaded]);

  const handleCreateRecovery = (muscleId) => {
    if (muscleId > 0 && muscleId <= 14) {
      const fatigue = parseInt(window.prompt("Level of fatigue"));
      if (fatigue) {
        (async () => {
          const response = await userService.createRecovery({
            muscleId: muscleId,
            fatigue: fatigue,
          });
          setRecoveries([...recoveries, response]);
        })();
      }
    }
  };

  return (
    <Grid container>
      <div className="spacer" />
      <Grid item xs={2} sm={2} md={2} lg={2} xl={2} />
      <Grid item xs={4} sm={4} md={4} lg={4} xl={4}></Grid>
      <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
        <HumanModel
          recoveries={recoveries}
          onCreateRecovery={handleCreateRecovery}
        />
      </Grid>
    </Grid>
  );
};
