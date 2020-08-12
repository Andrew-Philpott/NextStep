import React from "react";
import { Recovery, RecoveryDefinition } from "../../types/types";

type Props = {
  recovery: Recovery | RecoveryDefinition | null;
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
  let status: number = 0;
  let color: string = "";

  if (recovery) {
    if ("fatigue" in recovery) {
      status = recovery.fatigue;
    } else {
      status = recovery.recoveryTimeInDays;
    }
  } else {
    status = 0;
  }

  switch (status) {
    case 5:
      color = "red";
      break;
    case 4:
      color = "orangered";
      break;
    case 3:
      color = "orange";
      break;
    case 2:
      color = "yellow";
      break;
    case 1:
      color = "lime";
      break;
    default:
      color = "lime";
      break;
  }

  return (
    <path onClick={() => onCreateRecovery(muscleId)} d={draw} fill={color} />
  );
};
