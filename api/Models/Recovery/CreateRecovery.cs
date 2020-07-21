using System.ComponentModel.DataAnnotations;

namespace BodyJournalAPI.Models
{
  public class CreateRecovery
  {
    [Required]
    public int MuscleId { get; set; }
    [Required]
    public int Fatigue { get; set; }
  }
}