import React from "react";
import { Recovery } from "../../types/types";

type Props = {
  recoveries: Array<Recovery>;
  draw: string | undefined;
  muscleId: number;
  onCreateRecovery: (value: number) => void;
};

export const Muscle: React.FunctionComponent<Props> = (props) => {
  const { recoveries, draw, muscleId, onCreateRecovery } = props;
  let fatigue: number = 0;
  let color: string = "";

  if (recoveries) {
    const fatigueExists = recoveries.filter((x) => x.muscleId === muscleId);

    if (fatigueExists.length !== 0) {
      fatigue = fatigueExists.sort((a, b) =>
        a.recoveryId < b.recoveryId ? 1 : -1
      )[0].fatigue;
    }
  } else {
    fatigue = 0;
  }

  if (fatigue === null) {
    color = "lime";
  } else {
    switch (fatigue) {
      case 5:
        color = "red";
        break;
      case 4:
        color = "orange";
        break;
      case 3:
        color = "yellow";
        break;
      case 2:
        color = "lime";
        break;
      case 1:
        color = "lime";
        break;
      default:
        color = "lime";
        break;
    }
  }

  return (
    <path
      onClick={() => (recoveries ? onCreateRecovery(muscleId) : null)}
      d={draw}
      fill={color}
    />
  );
};
