using System.ComponentModel.DataAnnotations.Schema;
using System;

namespace BodyJournalAPI.Entities
{
  public class Record
  {
    public int Id { get; set; }
    public int Weight { get; set; }
    public int Reps { get; set; }
    public int Sets { get; set; }
    public string Time { get; set; } = DateTime.Now.ToString("MM/dd/yyyy H:mm");
    [ForeignKey(nameof(User))]
    public int UserId { get; set; }
    [ForeignKey(nameof(Exercise))]
    public int ExerciseId { get; set; }
  }
}

