namespace BodyJournalAPI.Entities
{
  public class ExerciseTypeMuscle
  {
    public long ExerciseTypeMuscleId { get; set; }
    public short ExerciseTypeId { get; set; }
    public byte MuscleId { get; set; }
    public virtual ExerciseType ExerciseType { get; set; }
    public virtual Muscle Muscle { get; set; }
    public bool Primary { get; set; }
  }
}