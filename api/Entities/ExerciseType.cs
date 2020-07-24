using System.Collections.Generic;

namespace BodyJournalAPI.Entities
{
  public class ExerciseType
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public virtual ICollection<ExerciseMuscle> Muscles { get; set; }
  }
}