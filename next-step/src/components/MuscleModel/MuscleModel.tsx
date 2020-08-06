import React, { useState, useEffect } from "react";
import { MusclesFront } from "./MusclesFront";
import { MusclesBack } from "./MusclesBack";
import { Grid } from "@material-ui/core";
import { recoveryService } from "../../services";
import { Recovery } from "../../types/types";
import { User } from "../../types/types";

type Props = {
  user: User | null;
  setException: (value: string) => void;
};

export const MuscleModel: React.FunctionComponent<Props> = ({
  user,
  setException,
}) => {
  const [quads, setQuads] = useState<Recovery | null>(null);
  const [biceps, setBiceps] = useState<Recovery | null>(null);
  const [deltoids, setDeltoids] = useState<Recovery | null>(null);
  const [pectorals, setPectorals] = useState<Recovery | null>(null);
  const [abdominals, setAbdominals] = useState<Recovery | null>(null);
  const [calves, setCalves] = useState<Recovery | null>(null);
  const [hamstrings, setHamstrings] = useState<Recovery | null>(null);
  const [glutes, setGlutes] = useState<Recovery | null>(null);
  const [tricpes, setTricpes] = useState<Recovery | null>(null);
  const [forearms, setForearms] = useState<Recovery | null>(null);
  const [lats, setLats] = useState<Recovery | null>(null);
  const [trapezius, setTrapezius] = useState<Recovery | null>(null);

  const handleRecoveries = (response: Array<Recovery>) => {
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
        case 13:
          setBiceps(recovery);
          break;
        case 14:
          setForearms(recovery);
          break;
        default:
          break;
      }
    });
  };

  const handleCreateRecovery = async (muscleId: number) => {
    if (user) {
      if (muscleId > 0 && muscleId <= 14) {
        const answer = window.prompt("Level of fatigue");
        let fatigue = 0;
        if (answer) {
          fatigue = parseInt(answer);
          if (fatigue !== 0 && fatigue >= 1 && fatigue <= 5) {
            try {
              const response: Recovery = await recoveryService.createRecovery({
                recoveryId: 0,
                fatigue: fatigue,
                time: "",
                userId: 0,
                muscleId: muscleId,
              });
              handleRecoveries([response]);
            } catch {
              setException(
                "We're having some technical difficulties. Please try again later."
              );
            }
          }
        }
      }
    }
  };

  useEffect(() => {
    let mounted = true;
    if (user) {
      recoveryService
        .getAllRecoveries()
        .then((response) => {
          if (mounted) {
            handleRecoveries(response);
          }
        })
        .catch(() =>
          setException(
            "We're having some technical difficulties. Please try again later."
          )
        );
      return () => {
        mounted = false;
      };
    }
  }, [user]);

  return (
    <Grid className="muscle-model" container>
      <Grid item xs={6}>
        <MusclesFront
          quads={quads}
          biceps={biceps}
          deltoids={deltoids}
          pectorals={pectorals}
          abdominals={abdominals}
          onCreateRecovery={handleCreateRecovery}
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
          onCreateRecovery={handleCreateRecovery}
        />
      </Grid>
    </Grid>
  );
};
