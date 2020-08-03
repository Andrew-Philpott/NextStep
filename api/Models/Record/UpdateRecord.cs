using System.ComponentModel.DataAnnotations;

namespace BodyJournalAPI.Models
{
  public class UpdateRecord
  {
    [Required]
    public int ExerciseId { get; set; }
    public int Weight { get; set; }
    public int Reps { get; set; }
    public int Sets { get; set; }
  }
}