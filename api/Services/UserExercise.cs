
using BodyJournalAPI.Entities;
using BodyJournalAPI.Helpers;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace BodyJournalAPI.Services
{
  public interface IUserExerciseService : IServiceBase<UserExercise>
  {
    Task<UserExercise> GetExerciseAsync(int userId, int id);
    Task<IEnumerable<UserExercise>> GetExercisesAsync(int userId);
    void CreateExercise(UserExercise model);
    void UpdateExercise(UserExercise model);
    void DeleteExercise(UserExercise model);
  }
  public class UserExerciseService : ServiceBase<UserExercise>,
  IUserExerciseService
  {
    public UserExerciseService(BodyJournalContext bodyJournalContext) : base(bodyJournalContext)
    {
    }

    public async Task<UserExercise> GetExerciseAsync(int userId, int id)
    {
      return await FindByCondition(x => x.UserId == userId && x.Id == id).SingleOrDefaultAsync();
    }

    public async Task<IEnumerable<UserExercise>> GetExercisesAsync(int userId)
    {
      return await FindByCondition(x => x.UserId == userId).ToListAsync();
    }
    public void CreateExercise(UserExercise model)
    {
      Create(model);
    }

    public void UpdateExercise(UserExercise model)
    {
      Update(model);
    }

    public void DeleteExercise(UserExercise model)
    {
      Delete(model);
    }
  }
}