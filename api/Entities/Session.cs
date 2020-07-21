using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace BodyJournalAPI.Entities
{
  public class Session
  {
    public int Id { get; set; }
    public string WorkoutStart { get; set; } = DateTime.Now.ToString("MM/dd/yyyy H:mm");
    public string WorkoutEnd { get; set; } = null;
    public byte Rating { get; set; }

    [ForeignKey(nameof(Workout))]
    public int WorkoutId { get; set; }
    public virtual Workout Workout { get; set; }

    [ForeignKey(nameof(User))]
    public int UserId { get; set; }
  }
}

