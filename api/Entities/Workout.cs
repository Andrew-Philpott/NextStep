using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BodyJournalAPI.Entities
{
  public class Workout
  {
    public Workout()
    {
      this.Exercises = new List<Exercise>();
    }
    public long WorkoutId { get; set; }
    public string Name { get; set; }
    public string Notes { get; set; }
    [ForeignKey(nameof(User))]
    public int UserId { get; set; }
    public virtual IList<Exercise> Exercises { get; set; }
  }
}

