namespace BodyJournalAPI.Entities
{
  public class ExerciseMuscle
  {
    public int ExerciseMuscleId { get; set; }
    public int ExerciseId { get; set; }
    public Exercise Exercise { get; set; }
    public int MuscleId { get; set; }
    public Muscle Muscle { get; set; }
    public bool Primary { get; set; }
  }
}