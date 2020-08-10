using System.Collections.Generic;

namespace BodyJournalAPI.Entities
{
  public class Muscle
  {
    public Muscle()
    {
      this.ExerciseTypes = new HashSet<ExerciseTypeMuscle>();
    }
    public byte MuscleId { get; set; }
    public string Name { get; set; }
    public virtual ICollection<ExerciseTypeMuscle> ExerciseTypes { get; set; }
  }
}