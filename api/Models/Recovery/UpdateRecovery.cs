using System.ComponentModel.DataAnnotations;

namespace BodyJournalAPI.Models
{
  public class UpdateRecovery
  {
    [Required]
    public int Fatigue { get; set; }
  }
}