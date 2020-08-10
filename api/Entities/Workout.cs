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
    [Required]
    public long WorkoutId { get; set; }
    [Required]
    public string Name { get; set; }
    [Required]
    public string Notes { get; set; }
    [Required]
    [ForeignKey(nameof(User))]
    public int UserId { get; set; }
    public IList<Exercise> Exercises { get; set; }
  }
}

