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