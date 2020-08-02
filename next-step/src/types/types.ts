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
