
using BodyJournalAPI.Entities;
using BodyJournalAPI.Helpers;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace BodyJournalAPI.Services
{
  public interface IExerciseMuscleService : IServiceBase<ExerciseMuscle>
  {
    Task<ExerciseMuscle> GetExerciseMuscleAsync(int id);
    Task<IEnumerable<ExerciseMuscle>> GetExerciseMusclesAsync();
  }
  public class ExerciseMuscleService : ServiceBase<ExerciseMuscle>,
  IExerciseMuscleService
  {
    public ExerciseMuscleService(BodyJournalContext bodyJournalContext) : base(bodyJournalContext)
    {
    }
    public async Task<ExerciseMuscle> GetExerciseMuscleAsync(int id)
    {
      return await FindByCondition(x => x.Id == id).SingleOrDefaultAsync();
    }
    public async Task<IEnumerable<ExerciseMuscle>> GetExerciseMusclesAsync()
    {
      return await FindAll().ToArrayAsync();
    }
  }
}