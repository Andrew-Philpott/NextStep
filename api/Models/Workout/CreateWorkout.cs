using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace BodyJournalAPI.Models
{
  public class CreateWorkout
  {
    [Required]
    public string Name { get; set; }
    public string Notes { get; set; }
    [Required]
    public List<CreateExercise> Exercises { get; set; }
  }
}