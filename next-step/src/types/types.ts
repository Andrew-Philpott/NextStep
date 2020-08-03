export type User = {
  userId: number;
  userName: string;
  firstName: string;
  lastName: string;
  token: string;
};
export type Session = {
  sessionId: number;
  workoutStart: string;
  workoutEnd?: string;
  workout: Workout;
  rating: number;
  workoutId: number;
  userId: number;
};
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
export type Record = {
  recordId?: number;
  weight?: number;
  reps?: number;
  sets?: number;
  time?: string;
  userId?: number;
  user?: User;
  exerciseTypeId?: number;
  exerciseType?: ExerciseType;
};
export type CreateRecord = {
  weight?: number;
  reps?: number;
  sets?: number;
};
