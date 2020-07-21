
using BodyJournalAPI.Entities;
using BodyJournalAPI.Helpers;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
namespace BodyJournalAPI.Services
{
  public interface IWorkoutService : IServiceBase<Workout>
  {
    Task<Workout> GetWorkoutAsync(int userId, int id);
    Task<IEnumerable<Workout>> GetWorkoutsAsync(int userId);
    void CreateWorkout(Workout model);
    void UpdateWorkout(Workout model);
    void DeleteWorkout(Workout model);
  }
  public class WorkoutService : ServiceBase<Workout>,
  IWorkoutService
  {
    public WorkoutService(BodyJournalContext bodyJournalContext) : base(bodyJournalContext)
    {
    }
    public async Task<Workout> GetWorkoutAsync(int userId, int id)
    {
      Workout model = await FindByCondition(x => x.UserId == userId && x.Id == id).
      SingleOrDefaultAsync();

      return model;
    }
    public async Task<IEnumerable<Workout>> GetWorkoutsAsync(int id)
    {
      return await FindByCondition(x => x.UserId == id).OrderBy(x => x.Name).ToListAsync();
    }

    public void CreateWorkout(Workout model)
    {
      Create(model);
    }

    public void UpdateWorkout(Workout model)
    {
      Update(model);
    }

    public void DeleteWorkout(Workout model)
    {
      Delete(model);
    }
  }
}