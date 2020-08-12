using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace NxtstpApi.Entities
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
    [ForeignKey(nameof(ExerciseType))]
    public short ExerciseTypeId { get; set; }
    public ExerciseType ExerciseType { get; set; }
    [ForeignKey(nameof(User))]
    public int UserId { get; set; }
    [ForeignKey(nameof(Workout))]
    public long WorkoutId { get; set; }
    public Workout Workout { get; set; }
  }
}