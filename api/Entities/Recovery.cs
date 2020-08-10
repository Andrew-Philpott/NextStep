using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;

namespace BodyJournalAPI.Entities
{
  public class Recovery
  {
    [Required]
    public long RecoveryId { get; set; }
    [Required]
    public byte Fatigue { get; set; }
    public string Time { get; set; } = DateTime.Now.ToString("MM/dd/yyyy H:mm");
    [Required]
    [ForeignKey(nameof(User))]
    public int UserId { get; set; }
    [Required]
    [ForeignKey(nameof(Muscle))]
    public byte MuscleId { get; set; }
  }
}