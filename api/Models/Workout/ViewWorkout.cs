using System.Collections.Generic;

namespace BodyJournalAPI.Models
{
  public class ViewWorkout
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public string Notes { get; set; }
    public IEnumerable<ViewExercise> Exercises { get; set; }
  }
}