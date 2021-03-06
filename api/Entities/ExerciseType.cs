using System.Collections.Generic;

namespace NxtstpApi.Entities
{
  public class ExerciseType
  {
    public ExerciseType()
    {
      this.Muscles = new HashSet<ExerciseTypeMuscle>();
    }
    public short ExerciseTypeId { get; set; }
    public string Name { get; set; }
    public virtual ICollection<ExerciseTypeMuscle> Muscles { get; set; }
  }
}