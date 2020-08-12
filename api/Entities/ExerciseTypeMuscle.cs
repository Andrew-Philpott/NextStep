namespace NxtstpApi.Entities
{
  public class ExerciseTypeMuscle
  {
    public long ExerciseTypeMuscleId { get; set; }
    public short ExerciseTypeId { get; set; }
    public byte MuscleId { get; set; }
    public ExerciseType ExerciseType { get; set; }
    public Muscle Muscle { get; set; }
    public bool Primary { get; set; }
  }
}