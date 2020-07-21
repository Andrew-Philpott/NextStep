using System.ComponentModel.DataAnnotations.Schema;

namespace BodyJournalAPI.Entities
{
  public class ExerciseMuscle
  {
    public int Id { get; set; }
    [ForeignKey(nameof(Exercise))]
    public int ExerciseId { get; set; }
    [ForeignKey(nameof(Muscle))]
    public int MuscleId { get; set; }
    public Muscle Muscle { get; set; }
    public Exercise Exercise { get; set; }
    public bool Primary { get; set; }
  }
}