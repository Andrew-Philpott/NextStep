using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace BodyJournalAPI.Entities
{
  public class Workout
  {
    public Workout()
    {
      this.Exercises = new HashSet<Exercise>();
    }
    public int Id { get; set; }
    public string Name { get; set; }
    public string Notes { get; set; }
    [ForeignKey(nameof(User))]
    public int UserId { get; set; }
    public virtual ICollection<Exercise> Exercises { get; set; }
  }
}

