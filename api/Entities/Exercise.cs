using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BodyJournalAPI.Entities
{
  public class Exercise
  {
    [Required]
    public long ExerciseId { get; set; }
    [Required]
    public short Weight { get; set; }
    [Required]
    public byte Reps { get; set; }
    [Required]
    public byte Sets { get; set; }
    [Required]
    public short ExerciseTypeId { get; set; }
    public virtual ExerciseType ExerciseType { get; set; }
    [ForeignKey(nameof(User))]
    public int UserId { get; set; }
    public long WorkoutId { get; set; }
    public virtual Workout Workout { get; set; }
  }
}