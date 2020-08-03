using System;

namespace BodyJournalAPI.Entities
{
  public class Record
  {
    public short RecordId { get; set; }
    public short? Weight { get; set; }
    public byte Reps { get; set; }
    public byte Sets { get; set; }
    public string Time { get; set; } = DateTime.Now.ToString("MM/dd/yyyy H:mm");
    public int UserId { get; set; }
    public virtual User User { get; set; }
    public short ExerciseTypeId { get; set; }
    public virtual ExerciseType ExerciseType { get; set; }
  }
}

