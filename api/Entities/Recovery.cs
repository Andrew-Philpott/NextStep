using System.ComponentModel.DataAnnotations.Schema;
using System;

namespace BodyJournalAPI.Entities
{
  public class Recovery
  {
    public long RecoveryId { get; set; }
    public byte Fatigue { get; set; }
    public string Time { get; set; } = DateTime.Now.ToString("MM/dd/yyyy H:mm");
    [ForeignKey(nameof(User))]
    public int UserId { get; set; }
    [ForeignKey(nameof(Muscle))]
    public byte MuscleId { get; set; }
  }
}