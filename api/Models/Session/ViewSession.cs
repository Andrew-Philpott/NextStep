using System;

namespace BodyJournalAPI.Models
{
  public class ViewSession
  {
    public int Id { get; set; }
    public DateTime WorkoutStart { get; set; }
    public DateTime WorkoutEnd { get; set; }
    public byte Rating { get; set; }
    public ViewWorkout ViewWorkout { get; set; }
  }
}

