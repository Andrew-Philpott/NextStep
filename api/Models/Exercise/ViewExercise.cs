namespace BodyJournalAPI.Models
{
  public class ViewExercise
  {
    public int Id { get; set; }
    public int? Weight { get; set; }
    public int Reps { get; set; }
    public int Sets { get; set; }
    public string Name { get; set; }
    public int Intensity { get; set; }
    public int ExerciseId { get; set; }
  }
}