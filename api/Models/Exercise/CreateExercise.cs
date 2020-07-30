using System.ComponentModel.DataAnnotations;

namespace BodyJournalAPI.Models
{
  public class CreateExercise
  {
    [Required]
    public short Weight { get; set; }
    [Required]
    public byte Reps { get; set; }
    [Required]
    public byte Sets { get; set; }
    [Required]
    public short ExerciseTypeId { get; set; }
  }
}