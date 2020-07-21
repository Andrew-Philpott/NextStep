using System;

namespace BodyJournalAPI.Models
{
  public class ViewRecovery
  {
    public int Id { get; set; }
    public int MuscleId { get; set; }
    public int Fatigue { get; set; }
    public DateTime Time { get; set; }
  }
}