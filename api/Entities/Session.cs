using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NxtstpApi.Entities
{
  public class Session
  {
    [Required]
    public long SessionId { get; set; }
    public DateTime WorkoutStart { get; set; }
    public string WorkoutEnd { get; set; } = null;
    [Required]
    public byte Rating { get; set; }
    [Required]
    [ForeignKey(nameof(Workout))]
    public long WorkoutId { get; set; }
    [Required]
    [ForeignKey(nameof(User))]
    public int UserId { get; set; }
  }
}

