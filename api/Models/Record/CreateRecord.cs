using System.ComponentModel.DataAnnotations;

namespace BodyJournalAPI.Models
{
  public class CreateRecord
  {
    [Required]
    public int ExerciseId { get; set; }
    public int Weight { get; set; }
    [Required]
    public int Reps { get; set; }
    [Required]
    public int Sets { get; set; }
  }
}