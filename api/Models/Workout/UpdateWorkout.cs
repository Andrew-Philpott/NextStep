using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace BodyJournalAPI.Models
{
  public class UpdateWorkout
  {
    [Required]
    public string Name { get; set; }
    public string Notes { get; set; }
    [Required]
    public IEnumerable<UpdateExercise> UpdateExercises { get; set; }
    public IEnumerable<CreateExercise> NewExercises { get; set; }
  }
}