using System.ComponentModel.DataAnnotations;

namespace BodyJournalAPI.Models
{
  public class CreateExercise
  {
    public int? Weight { get; set; }
    [Required]
    public int Reps { get; set; }
    [Required]
    public int Sets { get; set; }
    [Required]
    public int Intensity { get; set; }
    [Required]
    public int ExerciseId { get; set; }
    public int WorkoutId { get; set; }
  }
}