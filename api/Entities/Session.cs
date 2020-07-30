using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace BodyJournalAPI.Entities
{
  public class Session
  {
    public long SessionId { get; set; }
    public string WorkoutStart { get; set; } = DateTime.Now.ToString("MM/dd/yyyy H:mm");
    public string WorkoutEnd { get; set; } = null;
    public byte Rating { get; set; }
    [ForeignKey(nameof(Workout))]
    public long WorkoutId { get; set; }
    [ForeignKey(nameof(User))]
    public int UserId { get; set; }
  }
}

