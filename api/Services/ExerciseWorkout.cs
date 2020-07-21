
using BodyJournalAPI.Entities;
using BodyJournalAPI.Helpers;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
namespace BodyJournalAPI.Services
{
  public interface IExerciseWorkoutService : IServiceBase<ExerciseWorkout>
  {
    Task<IEnumerable<ExerciseWorkout>> GetExerciseWorkoutsAsync(int id);
    Task<ExerciseWorkout> GetExerciseWorkoutAsync(int workoutId, int exerciseId);
    void CreateExerciseWorkout(ExerciseWorkout model);
    void DeleteExerciseWorkout(ExerciseWorkout model);
  }
  public class ExerciseWorkoutService : ServiceBase<ExerciseWorkout>,
  IExerciseWorkoutService
  {
    public ExerciseWorkoutService(BodyJournalContext bodyJournalContext) : base(bodyJournalContext)
    {
    }
    public async Task<IEnumerable<ExerciseWorkout>> GetExerciseWorkoutsAsync(int id)
    {
      return await FindByCondition(x => x.WorkoutId == id).ToListAsync();
    }
    public async Task<ExerciseWorkout> GetExerciseWorkoutAsync(int workoutId, int exerciseId)
    {
      return await FindByCondition(x => x.WorkoutId == workoutId && x.ExerciseId == exerciseId).FirstOrDefaultAsync();
    }

    public void CreateExerciseWorkout(ExerciseWorkout model)
    {
      Create(model);
    }
    public void DeleteExerciseWorkout(ExerciseWorkout model)
    {
      Delete(model);
    }
  }
}