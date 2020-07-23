
using BodyJournalAPI.Entities;
using BodyJournalAPI.Helpers;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace BodyJournalAPI.Services
{
  public interface IExerciseWorkoutService
  {
    Task<IEnumerable<ExerciseWorkout>> GetExerciseWorkoutsAsync(int id);
    Task<ExerciseWorkout> GetExerciseWorkoutAsync(int workoutId, int exerciseId);
    Task CreateExerciseWorkout(ExerciseWorkout model);
    void DeleteExerciseWorkout(ExerciseWorkout model);
  }
  public class ExerciseWorkoutService :
  IExerciseWorkoutService
  {
    private DataContext _context;
    public ExerciseWorkoutService(DataContext context)
    {
      _context = context;
    }
    public async Task<IEnumerable<ExerciseWorkout>> GetExerciseWorkoutsAsync(int id)
    {
      return await _context.ExerciseWorkouts.AsQueryable().AsNoTracking().Where(x => x.WorkoutId == id).ToArrayAsync();
    }
    public async Task<ExerciseWorkout> GetExerciseWorkoutAsync(int workoutId, int exerciseId)
    {
      return await _context.ExerciseWorkouts.AsQueryable().AsNoTracking().Where(x => x.WorkoutId == workoutId && x.ExerciseId == exerciseId).FirstOrDefaultAsync();
    }

    public async Task CreateExerciseWorkout(ExerciseWorkout model)
    {
      await _context.ExerciseWorkouts.AddAsync(model);
      await _context.SaveChangesAsync();
    }
    public void DeleteExerciseWorkout(ExerciseWorkout model)
    {
      _context.ExerciseWorkouts.Remove(model);
      _context.SaveChanges();
    }
  }
}