import React from "react";
import { Recovery } from "../../types/types";

type Props = {
  recovery: Recovery | null | undefined;
  draw: string | undefined;
  muscleId: number;
  onCreateRecovery: (value: number) => void;
};

export const MuscleItem: React.FunctionComponent<Props> = ({
  recovery,
  draw,
  muscleId,
  onCreateRecovery,
}) => {
  let fatigue: number = 0;
  let color: string = "";

  if (recovery) {
    fatigue = recovery.fatigue;
  } else {
    fatigue = 0;
  }

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

  return (
    <path
      onClick={() => (recovery ? onCreateRecovery(muscleId) : null)}
      d={draw}
      fill={color}
    />
  );
};
