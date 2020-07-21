using System.ComponentModel.DataAnnotations;

namespace BodyJournalAPI.Models
{
  public class CreateSession
  {
    [Required]
    public int WorkoutId { get; set; }
  }
}