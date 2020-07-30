using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using BodyJournalAPI.Entities;

namespace BodyJournalAPI.Models
{
  public class UpdateWorkout
  {
    [Required]
    public string Name { get; set; }
    public string Notes { get; set; }
    public List<UpdateExercise> UpdateExercises { get; set; }
    public List<CreateExercise> CreateExercises { get; set; }
  }
}