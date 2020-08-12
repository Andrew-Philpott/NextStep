using System;

namespace NxtstpApi.Entities
{
  public class Record
  {
    public short RecordId { get; set; }
    public short? Weight { get; set; }
    public byte Reps { get; set; }
    public byte Sets { get; set; }
    public DateTime DateCreated { get; set; }
    public int UserId { get; set; }
    public short ExerciseTypeId { get; set; }
  }
}

