import React from "react";
import { MusclesFront } from "./MusclesFront";
import { MusclesBack } from "./MusclesBack";
import { Grid } from "@material-ui/core";
import { recoveryService, recoveryDefinitionService } from "../../services";
import { Recovery, RecoveryDefinition } from "../../types/types";
import { User } from "../../types/types";

type Props = {
  user: User | null;
  defineRecoveries: boolean;
  setException: (value: string) => void;
};

export const MuscleModel: React.FunctionComponent<Props> = ({
  user,
  defineRecoveries,
  setException,
}) => {
  const [quads, setQuads] = React.useState<
    Recovery | RecoveryDefinition | null
  >(null);
  const [biceps, setBiceps] = React.useState<
    Recovery | RecoveryDefinition | null
  >(null);
  const [deltoids, setDeltoids] = React.useState<
    Recovery | RecoveryDefinition | null
  >(null);

  const [pectorals, setPectorals] = React.useState<
    Recovery | RecoveryDefinition | null
  >(null);
  const [abdominals, setAbdominals] = React.useState<
    Recovery | RecoveryDefinition | null
  >(null);
  const [calves, setCalves] = React.useState<
    Recovery | RecoveryDefinition | null
  >(null);
  const [hamstrings, setHamstrings] = React.useState<
    Recovery | RecoveryDefinition | null
  >(null);
  const [glutes, setGlutes] = React.useState<
    Recovery | RecoveryDefinition | null
  >(null);
  const [tricpes, setTricpes] = React.useState<
    Recovery | RecoveryDefinition | null
  >(null);
  const [forearms, setForearms] = React.useState<
    Recovery | RecoveryDefinition | null
  >(null);
  const [lats, setLats] = React.useState<Recovery | RecoveryDefinition | null>(
    null
  );
  const [trapezius, setTrapezius] = React.useState<
    Recovery | RecoveryDefinition | null
  >(null);

  const handleRecoveries = (
    response: Array<Recovery | RecoveryDefinition> | null
  ) => {
    if (response === null) {
      setCalves(null);
      setQuads(null);
      setHamstrings(null);
      setGlutes(null);
      setBiceps(null);
      setForearms(null);
      setLats(null);
      setTrapezius(null);
      setAbdominals(null);
      setPectorals(null);
      setDeltoids(null);
      setTricpes(null);
    } else {
      response.map((recovery) => {
        switch (recovery?.muscleId) {
          case 1:
            setCalves(recovery);
            break;
          case 2:
            setQuads(recovery);
            break;
          case 3:
            setHamstrings(recovery);
            break;
          case 4:
            setGlutes(recovery);
            break;
          case 5:
            setBiceps(recovery);
            break;
          case 6:
            setForearms(recovery);
            break;
          case 7:
            setLats(recovery);
            break;
          case 8:
            setTrapezius(recovery);
            break;
          case 9:
            setAbdominals(recovery);
            break;
          case 10:
            setPectorals(recovery);
            break;
          case 11:
            setDeltoids(recovery);
            break;
          case 12:
            setTricpes(recovery);
            break;
          default:
            break;
        }
      });
    }
  };

  const handleCreateRecoveryOrRecoveryDefinitionDefinition = async (
    muscleId: number
  ) => {
    try {
      if (user && muscleId > 0 && muscleId <= 12) {
        let answer: string | null;
        if (defineRecoveries) {
          answer = window.prompt("Number of days to recover");
        } else {
          answer = window.prompt("Level of fatigue");
        }
        let parsedAnswer = answer && parseInt(answer);
        if (typeof parsedAnswer === "number") {
          let response: Recovery | RecoveryDefinition | null = null;
          if (defineRecoveries && parsedAnswer >= 1 && parsedAnswer <= 7) {
            response = await recoveryDefinitionService.createRecoveryDefinition(
              {
                recoveryDefinitionId: 0,
                muscleId: muscleId,
                recoveryTimeInDays: parsedAnswer,
                dateCreated: undefined,
              }
            );
          } else if (parsedAnswer >= 1 && parsedAnswer <= 5) {
            response = await recoveryService.createRecovery({
              recoveryId: 0,
              fatigue: parsedAnswer,
              dateCreated: undefined,
              userId: 0,
              muscleId: muscleId,
            });
          }
          response !== null && handleRecoveries([response]);
        }
      }
    } catch {
      setException(
        "We're having some technical difficulties. Please try again later."
      );
    }
  };

  React.useEffect(() => {
    if (user) {
      handleRecoveries(null);
      let response: Array<Recovery | RecoveryDefinition> | null = null;
      (async () => {
        if (defineRecoveries) {
          response = await recoveryDefinitionService.getCurrentRecoveryDefinitions();
        } else {
          response = await recoveryService.getCurrentRecoveries();
        }
        handleRecoveries(response);
      })();
    }
  }, [user, defineRecoveries]);

  return (
    <Grid className="muscle-model" container>
      <Grid item xs={6}>
        <MusclesFront
          quads={quads}
          biceps={biceps}
          deltoids={deltoids}
          pectorals={pectorals}
          abdominals={abdominals}
          onCreateRecovery={handleCreateRecoveryOrRecoveryDefinitionDefinition}
        />
      </Grid>
      <Grid item xs={6}>
        <MusclesBack
          calves={calves}
          hamstrings={hamstrings}
          glutes={glutes}
          triceps={tricpes}
          forearms={forearms}
          lats={lats}
          trapezius={trapezius}
          onCreateRecovery={handleCreateRecoveryOrRecoveryDefinitionDefinition}
        />
      </Grid>
    </Grid>
  );
};
