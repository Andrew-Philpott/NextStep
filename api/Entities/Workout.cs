using System.ComponentModel.DataAnnotations.Schema;

namespace BodyJournalAPI.Entities
{
  public class Workout
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public string Notes { get; set; }
    [ForeignKey(nameof(User))]
    public int UserId { get; set; }
  }
}

