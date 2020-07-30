import React, { useState, useEffect } from "react";
import { MusclesFront } from "./MusclesFront";
import { MusclesBack } from "./MusclesBack";
import { Grid } from "@material-ui/core";
import { recoveryService } from "../../services";
import { useHistory } from "react-router-dom";

export const MuscleModel = ({ ...props }) => {
  const { active, setException } = props;
  const [recoveries, setRecoveries] = useState(null);
  const history = useHistory();

  const handleCreateRecovery = (muscleId) => {
    if (active) {
      if (muscleId > 0 && muscleId <= 14) {
        const fatigue = parseInt(window.prompt("Level of fatigue"));
        if (fatigue) {
          (async () => {
            const response = await recoveryService.createRecovery({
              recoveryId: 0,
              fatigue: fatigue,
              time: "",
              userId: 0,
              muscleId: muscleId,
            });
            (await response) && setRecoveries([...recoveries, response]);
          })();
        }
      }
    }
  };

  useEffect(() => {
    if (!recoveries && active) {
      (async () => {
        try {
          const response = await recoveryService.getAllRecoveries();
          (await response) && setRecoveries(response);
        } catch (error) {
          setException(error);
          history.push("/error");
        }
      })();
    }
  }, [recoveries]);

  return (
    <Grid className="muscle-model" container>
      <Grid item xs={6}>
        <MusclesFront
          recoveries={recoveries ? recoveries : null}
          onCreateRecovery={handleCreateRecovery}
        />
      </Grid>
      <Grid item xs={6}>
        <MusclesBack
          recoveries={recoveries ? recoveries : null}
          onCreateRecovery={handleCreateRecovery}
        />
      </Grid>
    </Grid>
  );
};
