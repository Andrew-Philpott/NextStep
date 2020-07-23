using System.ComponentModel.DataAnnotations.Schema;

namespace BodyJournalAPI.Entities
{
  public class ExerciseWorkout
  {
    public int Id { get; set; }
    [ForeignKey(nameof(Exercise))]
    public int ExerciseId { get; set; }
    public Exercise Exercise { get; set; }
    [ForeignKey(nameof(Workout))]
    public int WorkoutId { get; set; }
    public Workout Workout { get; set; }
  }
}