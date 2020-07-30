using System.Collections.Generic;

namespace BodyJournalAPI.Entities
{
  public class ExerciseType
  {
    public ExerciseType()
    {
      this.Muscles = new HashSet<ExerciseTypeMuscle>();
    }
    public short ExerciseTypeId { get; set; }
    public string Name { get; set; }
    public ICollection<ExerciseTypeMuscle> Muscles { get; set; }
  }
}