using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BodyJournalAPI.Entities
{
  public class Session
  {
    [Required]
    public long SessionId { get; set; }
    [Required]
    public string WorkoutStart { get; set; } = DateTime.Now.ToString("MM/dd/yyyy H:mm");
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

