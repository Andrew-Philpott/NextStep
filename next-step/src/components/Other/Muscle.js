import React from "react";

export const Muscle = (props) => {
  const { recoveries, draw, muscleId, onCreateRecovery } = props;
  let fatigue = "";
  let color = "";
  if (recoveries) {
    const fatigueExists = recoveries.filter(
      (x) => x.muscleId === muscleId,
      (x) => {
        return x;
      }
    );

    if (fatigueExists.length !== 0) {
      fatigue = fatigueExists.sort((a, b) => (a.id < b.id ? 1 : -1))[0].fatigue;
    }
  } else {
    fatigue = null;
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
