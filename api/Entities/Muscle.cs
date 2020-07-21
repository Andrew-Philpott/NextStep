using System.Collections.Generic;

namespace BodyJournalAPI.Entities
{
  public class Muscle
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public ICollection<ExerciseMuscle> Exercises { get; set; }
  }
}