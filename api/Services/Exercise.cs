
using BodyJournalAPI.Entities;
using BodyJournalAPI.Helpers;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace BodyJournalAPI.Services
{
  public interface IExerciseService : IServiceBase<Exercise>
  {
    Task<Exercise> GetExerciseAsync(int id);
    Task<IEnumerable<Exercise>> GetExercisesAsync();
  }
  public class ExerciseService : ServiceBase<Exercise>,
  IExerciseService
  {
    public ExerciseService(BodyJournalContext bodyJournalContext) : base(bodyJournalContext)
    {
    }
    public async Task<IEnumerable<Exercise>> GetExercisesAsync()
    {
      return await FindAll().Include(exercise => exercise.Muscles).ThenInclude(join => join.Muscle).ToArrayAsync();
    }
    public async Task<Exercise> GetExerciseAsync(int id)
    {
      return await FindByCondition(x => x.Id == id).FirstOrDefaultAsync();
    }
  }
}