
using BodyJournalAPI.Entities;
using BodyJournalAPI.Helpers;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
namespace BodyJournalAPI.Services
{
  public interface IWorkoutService
  {
    Task<Workout> GetWorkoutAsync(int userId, int id);
    Task<IEnumerable<Workout>> GetWorkoutsAsync(int userId);
    Task CreateWorkout(Workout model);
    void UpdateWorkout(Workout model);
    void DeleteWorkout(Workout model);
  }
  public class WorkoutService :
  IWorkoutService
  {
    private DataContext _context;
    public WorkoutService(DataContext context)
    {
      _context = context;
    }
    public async Task<Workout> GetWorkoutAsync(int userId, int id)
    {
      return await _context.Workouts.Where(x => x.UserId == userId && x.Id == id).
      SingleOrDefaultAsync();
    }
    public async Task<IEnumerable<Workout>> GetWorkoutsAsync(int id)
    {
      return await _context.Workouts.Where(x => x.UserId == id).OrderByDescending(x => x.Name).ToArrayAsync();
    }

    public async Task CreateWorkout(Workout model)
    {
      await _context.Workouts.AddAsync(model);
      await _context.SaveChangesAsync();
    }

    public void UpdateWorkout(Workout model)
    {
      _context.Workouts.Update(model);
      _context.SaveChanges();
    }

    public void DeleteWorkout(Workout model)
    {
      _context.Workouts.Remove(model);
      _context.SaveChanges();
    }
  }
}