import React from "react";
import { Muscle } from "./Muscle";

export const MusclesFront = ({ ...props }) => {
  const { exercises, recoveries, onCreateRecovery } = props;
  return (
    <React.Fragment>
      <svg
        viewBox="0 0 76 152"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Muscle
          onCreateRecovery={onCreateRecovery}
          key="left-quad"
          muscleId={2}
          draw={
            "M21.536,75.898c0,0 11.073,23.633 10.268,34.698c-0.805,11.065 -2.012,14.887 -2.012,17.704c0,2.816 0.361,-4.209 -3.165,-4.225c-4.132,-0.019 -7.219,3.332 -8.338,7.023c-0.159,0.527 -0.999,-10.497 -0.999,-10.497c0,0 -1.416,-3.038 -2.386,-13.241c-1.468,-15.448 10.299,-21.015 6.632,-31.462"
          }
          recoveries={recoveries}
          exercises={exercises}
        />

        <Muscle
          onCreateRecovery={onCreateRecovery}
          muscleId={2}
          key="right-quad"
          draw={
            "M46.329,75.898c0,0 -11.073,23.633 -10.268,34.698c0.804,11.065 2.012,14.887 2.012,17.704c0,2.816 -0.361,-4.209 3.165,-4.225c4.131,-0.019 7.219,3.332 8.337,7.023c0.16,0.527 0.999,-10.497 0.999,-10.497c0,0 1.417,-3.038 2.387,-13.241c1.468,-15.448 -10.299,-21.015 -6.632,-31.462"
          }
          recoveries={recoveries}
          exercises={exercises}
        />

        <Muscle
          onCreateRecovery={onCreateRecovery}
          key="left-bicep"
          muscleGroup="Biceps"
          muscleId={13}
          draw={
            "M15.232,28.934c0,0 1.105,16.785 -0.186,17.535c-1.481,0.86 -2.239,9.14 -2.239,9.14c0,0 -0.746,-2.099 -1.585,-2.005c-0.84,0.093 -2.425,1.679 -2.752,2.238c-0.326,0.56 -5.223,-17.301 6.762,-26.908Z"
          }
          recoveries={recoveries}
          exercises={exercises}
        />

        <Muscle
          onCreateRecovery={onCreateRecovery}
          key="right-bicep"
          muscleGroup="Biceps"
          muscleId={13}
          draw={
            "M53.528,31.098c0,0 -1.105,16.784 0.187,17.534c1.481,0.861 2.238,9.141 2.238,9.141c0,0 0.746,-2.099 1.586,-2.005c0.839,0.093 2.425,1.678 2.751,2.238c0.327,0.56 5.223,-17.302 -6.762,-26.908Z"
          }
          recoveries={recoveries}
          exercises={exercises}
        />

        <Muscle
          onCreateRecovery={onCreateRecovery}
          key="left-deltoid"
          muscleId={11}
          draw={
            "M25.684,18.139c0,0 -12.432,-7.085 -17.512,3.476c-1.869,3.885 -0.459,16.146 -0.401,16.71c0.038,0.373 3.69,-7.88 6.817,-9.625c0.537,-0.299 -0.144,-8.31 11.096,-10.561Z"
          }
          recoveries={recoveries}
          exercises={exercises}
        />

        <Muscle
          onCreateRecovery={onCreateRecovery}
          key="right-deltoid"
          muscleId={11}
          draw={
            "M42.463,18.139c0,0 12.432,-7.085 17.512,3.476c1.869,3.885 0.459,16.146 0.401,16.71c-0.038,0.373 -3.69,-7.88 -6.818,-9.625c-0.536,-0.299 0.145,-8.31 -11.095,-10.561Z"
          }
          recoveries={recoveries}
          exercises={exercises}
        />

        <Muscle
          onCreateRecovery={onCreateRecovery}
          key="left-pectoral"
          muscleGroup="Pectorals"
          muscleId={10}
          draw={
            "M32.057,20.112c-0.311,3.984 2.007,8.955 2.037,11.938c0.04,4.039 -0.33,7.303 -7.463,8.098c-5.733,0.638 -7.022,-1.737 -8.88,-2.919c-1.159,-0.738 -1.515,-8.373 -2.573,-9.527c-0.723,-0.788 3.991,-8.909 10.523,-8.851c6.532,0.057 6.421,0.425 6.356,1.261Z"
          }
          recoveries={recoveries}
          exercises={exercises}
        />

        <Muscle
          onCreateRecovery={onCreateRecovery}
          key="right-pectoral"
          muscleGroup="Pectorals"
          muscleId={10}
          draw={
            "M36.136,20.112c0.311,3.984 -2.008,8.955 -2.037,11.938c-0.04,4.039 0.329,7.303 7.463,8.098c5.733,0.638 7.022,-1.737 8.879,-2.919c1.16,-0.738 1.515,-8.373 2.574,-9.527c0.723,-0.788 -3.991,-8.909 -10.523,-8.851c-6.533,0.057 -6.422,0.425 -6.356,1.261Z"
          }
          recoveries={recoveries}
          exercises={exercises}
        />

        <Muscle
          onCreateRecovery={onCreateRecovery}
          muscleGroup="Abdominals"
          muscleId={9}
          key="abdominals"
          draw={
            "M34.343,40.277c0,0 -5.885,-1.868 -8.56,1.474c-2.675,3.341 0.465,16.298 -0.248,21.113c-0.713,4.815 3.292,24.8 5.331,25.563c1.267,0.475 2.143,0.569 3.567,-0.089c1.256,-0.58 7.126,-13.883 7.896,-25.594c0.356,-5.416 4.855,-21.729 -2.992,-22.913c-4.539,-0.685 -4.994,0.446 -4.994,0.446Z"
          }
          recoveries={recoveries}
          exercises={exercises}
        />
      </svg>
    </React.Fragment>
  );
};
