namespace BodyJournalAPI.Entities
{
  public class ExerciseWorkout
  {
    public int ExerciseWorkoutId { get; set; }
    public int ExerciseId { get; set; }
    public Exercise Exercise { get; set; }
    public int WorkoutId { get; set; }
    public Workout Workout { get; set; }
  }
}