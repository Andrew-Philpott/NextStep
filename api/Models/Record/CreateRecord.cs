using System.ComponentModel.DataAnnotations;

namespace BodyJournalAPI.Models
{
  public class CreateRecord
  {
    [Required]
    public int ExerciseTypeId { get; set; }
    public int Weight { get; set; }
    public int Reps { get; set; }
    public int Sets { get; set; }
  }
}