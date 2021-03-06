import React from "react";
import { MuscleItem } from "./MuscleItem";
import { Recovery, RecoveryDefinition } from "../../types/types";

type Props = {
  onCreateRecovery: (muscleId: number) => void;
  calves: Recovery | RecoveryDefinition | null;
  hamstrings: Recovery | RecoveryDefinition | null;
  glutes: Recovery | RecoveryDefinition | null;
  triceps: Recovery | RecoveryDefinition | null;
  forearms: Recovery | RecoveryDefinition | null;
  lats: Recovery | RecoveryDefinition | null;
  trapezius: Recovery | RecoveryDefinition | null;
};

export const MusclesBack: React.FunctionComponent<Props> = ({
  onCreateRecovery,
  calves,
  hamstrings,
  glutes,
  triceps,
  forearms,
  lats,
  trapezius,
}) => {
  return (
    <React.Fragment>
      <svg
        viewBox="0 0 82 170"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <MuscleItem
          onCreateRecovery={onCreateRecovery}
          key="left-calf"
          muscleId={1}
          draw={
            "M52.885,132.39c0,0 -5.718,7.108 -6.096,10.007c-0.378,2.898 -0.387,16.918 0.677,19.353c0.779,1.782 4.588,-3.96 5.545,-7.56c0.956,-3.6 -0.014,3.34 2.394,5.922c0.407,0.436 4.674,-13.753 3.447,-18.453c-1.702,-6.519 -2.344,-8.369 -1.913,-11.391c0.678,-4.752 -2.574,2.122 -3.046,4.264c-0.472,2.142 -1.008,-2.142 -1.008,-2.142Z"
          }
          recovery={calves}
        />
        <MuscleItem
          onCreateRecovery={onCreateRecovery}
          key="right-calf"
          muscleId={1}
          draw={
            "M29.244,132.39c0,0 5.718,7.108 6.096,10.007c0.378,2.898 0.387,16.918 -0.677,19.353c-0.779,1.782 -4.588,-3.96 -5.545,-7.56c-0.957,-3.6 0.014,3.34 -2.394,5.922c-0.407,0.436 -4.674,-13.753 -3.447,-18.453c1.702,-6.519 2.344,-8.369 1.913,-11.391c-0.678,-4.752 2.574,2.122 3.046,4.264c0.472,2.142 1.008,-2.142 1.008,-2.142Z"
          }
          recovery={calves}
        />
        <MuscleItem
          onCreateRecovery={onCreateRecovery}
          key="left-hamstring"
          muscleId={3}
          draw={
            "M44.031,98.726c0,0 12.347,0.487 14.305,-1.231c1.959,-1.718 2.481,9.396 0,21.406c-2.48,12.01 -0.916,13.351 -1.279,13.035c-2.739,-2.372 -4.386,-8.297 -4.578,-8.153c-0.152,0.115 -5.704,8.313 -4.791,14.7c0.052,0.368 -5.202,-28.975 -5.985,-32.542c-0.783,-3.567 -1.965,-6.826 2.328,-7.215Z"
          }
          recovery={hamstrings}
        />
        <MuscleItem
          onCreateRecovery={onCreateRecovery}
          key="right-hamstring"
          muscleId={3}
          draw={
            "M37.912,98.726c0,0 -12.283,0.487 -14.231,-1.231c-1.947,-1.718 -2.467,9.396 0,21.406c2.468,12.01 0.912,13.351 1.273,13.035c2.725,-2.372 4.363,-8.297 4.554,-8.153c0.152,0.115 5.675,8.313 4.767,14.7c-0.052,0.368 5.175,-28.975 5.954,-32.542c0.778,-3.567 0.171,-7.106 -2.317,-7.215Z"
          }
          recovery={hamstrings}
        />
        <MuscleItem
          onCreateRecovery={onCreateRecovery}
          key="left-glute"
          muscleId={4}
          draw={
            "M26.292,69.962c0.806,-0.134 13.533,6.223 14.226,16.039c0.693,9.815 -6.928,13.33 -13.359,11.611c-6.43,-1.719 -5.954,-9.396 -5.786,-11.242c0.12,-1.318 1.27,-4.277 2.315,-11.444c0.181,-1.241 1.798,-4.83 2.604,-4.964Z"
          }
          recovery={glutes}
        />
        <MuscleItem
          onCreateRecovery={onCreateRecovery}
          key="right-glute"
          muscleId={4}
          draw={
            "M57.461,71.166c-0.718,-0.286 -13.58,3.525 -15.977,13.028c-2.396,9.503 3.994,14.407 10.225,13.947c6.231,-0.459 7.168,-8.085 7.344,-9.93c0.126,-1.316 -0.403,-4.44 -0.083,-11.675c0.056,-1.253 -0.79,-5.085 -1.509,-5.37Z"
          }
          recovery={glutes}
        />
        <MuscleItem
          onCreateRecovery={onCreateRecovery}
          key="left-tricep"
          muscleId={12}
          draw={
            "M59.266,29.372c0,0 3.715,-2.597 5.023,-1.85c1.309,0.748 3.739,5.515 4.02,7.478c0.28,1.963 1.495,17.573 1.495,17.573c0,0 -0.467,1.945 -1.776,2.422c-1.308,0.476 -1.121,-4.059 -2.113,-4.555c-0.991,-0.496 -0.045,3.516 -1.037,3.832c-0.991,0.315 -3.876,-1.082 -3.876,-1.082l-2.194,-6.446c0,0 2.058,-13.917 0.458,-17.372Z"
          }
          recovery={triceps}
        />
        <MuscleItem
          onCreateRecovery={onCreateRecovery}
          key="right-tricep"
          muscleId={12}
          draw={
            "M22.671,29.372c0,0 -3.715,-2.597 -5.023,-1.85c-1.309,0.748 -3.739,5.515 -4.02,7.478c-0.28,1.963 -1.495,17.573 -1.495,17.573c0,0 0.467,1.945 1.776,2.422c1.308,0.476 1.121,-4.059 2.113,-4.555c0.991,-0.496 0.045,3.516 1.036,3.832c0.992,0.315 3.877,-1.082 3.877,-1.082l2.194,-6.446c0,0 -2.058,-13.917 -0.458,-17.372Z"
          }
          recovery={triceps}
        />
        <MuscleItem
          onCreateRecovery={onCreateRecovery}
          key="left-forearm"
          muscleId={6}
          draw={
            "M69.804,53.41c0,0 3.727,5.905 4.477,10.404c0.75,4.499 -0.094,13.404 2.062,15.466c2.156,2.062 -6.235,3.749 -6.539,1.687c-0.303,-2.062 -9.5,-17.601 -8.458,-20.433c0.282,-0.766 -0.281,-7.405 -0.281,-7.405l3.241,1.866c0,0 0.696,2.821 -0.898,3.664c-1.593,0.844 0.938,3.281 1.969,2.25c1.031,-1.031 1.687,-3 2.905,-3.375c1.219,-0.375 -0.937,-2.104 -0.187,-2.504c0.75,-0.401 1.709,-1.62 1.709,-1.62Z"
          }
          recovery={forearms}
        />
        <MuscleItem
          onCreateRecovery={onCreateRecovery}
          key="right-forearm"
          muscleId={6}
          draw={
            "M12.444,53.41c0,0 -3.727,5.905 -4.477,10.404c-0.75,4.499 0.094,13.404 -2.062,15.466c-2.156,2.062 6.236,3.749 6.539,1.687c0.303,-2.062 9.5,-17.601 8.458,-20.433c-0.282,-0.766 0.281,-7.405 0.281,-7.405l-3.241,1.866c0,0 -0.696,2.821 0.898,3.664c1.593,0.844 -0.937,3.281 -1.968,2.25c-1.032,-1.031 -1.688,-3 -2.906,-3.375c-1.219,-0.375 0.937,-2.104 0.187,-2.504c-0.749,-0.401 -1.709,-1.62 -1.709,-1.62Z"
          }
          recovery={forearms}
        />
        <MuscleItem
          onCreateRecovery={onCreateRecovery}
          key="left-lat"
          muscleId={7}
          draw={
            "M44.34,55.599c0,0 5.048,5.158 5.597,8.231c0.549,3.073 0.557,8.648 3.183,8.231c0.035,-0.005 -0.895,-2.038 0.325,-4.136c4.193,-7.206 4.394,-15.619 4.394,-15.619l1.427,-13.718c0,0 -3.915,1.393 -7.024,-0.659c-0.623,-0.411 -0.256,4.772 -3.251,7.473c-1.226,1.105 -5.858,7.124 -4.651,10.197Z"
          }
          recovery={lats}
        />
        <MuscleItem
          onCreateRecovery={onCreateRecovery}
          key="right-lat"
          muscleId={7}
          draw={
            "M37.775,55.599c0,0 -5.049,5.158 -5.597,8.231c-0.549,3.073 -0.557,8.648 -3.183,8.231c-0.035,-0.005 0.895,-2.038 -0.326,-4.136c-4.192,-7.206 -4.393,-15.619 -4.393,-15.619l-1.427,-13.718c0,0 3.915,1.393 7.024,-0.659c0.623,-0.411 0.255,4.772 3.251,7.473c1.226,1.105 5.858,7.124 4.651,10.197Z"
          }
          recovery={lats}
        />
        <MuscleItem
          onCreateRecovery={onCreateRecovery}
          key="trapezius"
          muscleId={8}
          draw={
            "M39.543,56.453c0.075,0.385 0.737,-2.948 1.567,-2.58c0.829,0.369 1.852,2.584 1.842,2.488c-0.26,-2.728 2.184,-6.972 3.963,-9.859c1.932,-3.136 2.94,-3.318 4.238,-7.371c0.517,-1.615 0,-12.163 2.211,-16.033c2.212,-3.869 3.778,-3.473 5.437,-4.422c0.362,-0.207 -13.577,-1.309 -14.779,-10.719c-0.198,-1.556 -0.211,-2.973 0.036,-4.392c0.247,-1.42 -7.247,-1.995 -7.647,-0.092c-0.612,2.906 4.562,11.205 -13.084,13.913c-1.239,0.19 3.655,2.08 6.357,6.173c0.659,0.998 0.647,3.367 2.672,16.678c0.453,2.976 6.322,11.786 7.187,16.216Z"
          }
          recovery={trapezius}
        />
      </svg>
    </React.Fragment>
  );
};
