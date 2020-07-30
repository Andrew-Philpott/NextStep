using System.ComponentModel.DataAnnotations;

namespace BodyJournalAPI.Models
{
  public class CreateSession
  {
    [Required]
    public long WorkoutId { get; set; }
  }
}