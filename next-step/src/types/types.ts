export type User = { userId: number; token: string } | null | undefined;
export type Session =
  | {
      sessionId: number;
      workoutStart: string;
      workoutEnd?: string;
      rating: number;
      workoutId: number;
      userId: number;
    }
  | null
  | undefined;
export type Recovery = {
  recoveryId: number;
  fatigue: number;
  time: string;
  userId: number;
  muscleId: number;
};
export type Exercise = {
  exerciseId: number;
  weight?: number;
  reps: number;
  sets: number;
  exerciseTypeId: number;
  exerciseType: ExerciseType;
  userId: number;
  workoutId: number;
};
export type Workout = {
  workoutId: number;
  name: string;
  notes: string;
  userId: number;
  exercises: Array<Exercise>;
};
export type ExerciseType = {
  exerciseTypeId: number;
  name: string;
  muscles: Array<ExerciseTypeMuscle>;
};
export type ExerciseTypeMuscle = {
  ExerciseTypeMuscleId: number;
  exerciseTypeId: number;
  muscleId: number;
  exerciseType: ExerciseType;
  muscle: Muscle;
  primary: boolean;
};
export type Muscle = {
  muscleId: number;
  name: string;
  exerciseTypes: Array<ExerciseType>;
};
