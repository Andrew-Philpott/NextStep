using System.ComponentModel.DataAnnotations.Schema;

namespace BodyJournalAPI.Entities
{
  public class Exercise
  {
    public int Id { get; set; }
    public int? Weight { get; set; }
    public int Reps { get; set; }
    public int Sets { get; set; }
    public int Intensity { get; set; }
    public string Name { get; set; }

    [ForeignKey(nameof(Exercise))]
    public int ExerciseId { get; set; }
    [ForeignKey(nameof(User))]
    public int UserId { get; set; }
  }
}