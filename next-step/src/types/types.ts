export type User = {
  userId?: number;
  userName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  token?: string;
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
  dateCreated: undefined;
  userId: number;
  muscleId: number;
};
export type RecoveryDefinition = {
  recoveryDefinitionId: number;
  muscleId: number;
  recoveryTimeInDays: number;
  dateCreated?: Date;
};

export type Exercise = {
  exerciseId: number;
  weight: number | string;
  reps: number | string;
  sets: number | string;
  exerciseTypeId: number | string;
  exerciseType?: ExerciseType;
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
  recordId: number;
  weight: number | string;
  reps: number | string;
  sets: number | string;
  dateCreated: Date;
  userId?: number;
  user?: User;
  exerciseTypeId?: number;
  exerciseType?: ExerciseType;
};
