using System.ComponentModel.DataAnnotations;

namespace BodyJournalAPI.Models
{
  public class UpdateSession
  {
    [Required]
    public byte Rating { get; set; }
  }
}