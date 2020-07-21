using System.ComponentModel.DataAnnotations;

namespace BodyJournalAPI.Models
{
  public class UpdateExercise
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public int? Weight { get; set; }
    [Required]
    public int Reps { get; set; }
    [Required]
    public int Sets { get; set; }
    [Required]
    public int Intensity { get; set; }
    [Required]
    public int ExerciseId { get; set; }
    [Required]
    public int WorkoutId { get; set; }
  }
}