using BodyJournalAPI.Entities;
using BodyJournalAPI.Helpers;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace BodyJournalAPI.Services
{
  public interface IExerciseTypeService
  {
    Task<ExerciseType> GetExerciseTypeAsync(int id);
    Task<IEnumerable<ExerciseType>> GetExerciseTypesAsync();
  }
  public class ExerciseTypeService :
  IExerciseTypeService
  {
    private DataContext _context;
    public ExerciseTypeService(DataContext context)
    {
      _context = context;
    }
    public async Task<IEnumerable<ExerciseType>> GetExerciseTypesAsync()
    {
      return await _context.ExerciseTypes.AsQueryable().AsNoTracking().Include(ExerciseType => ExerciseType.Muscles).ThenInclude(muscle => muscle.Muscle).OrderBy(x => x.Name).ToArrayAsync();
    }
    public async Task<ExerciseType> GetExerciseTypeAsync(int id)
    {
      return await _context.ExerciseTypes.AsQueryable().AsNoTracking().Include(x => x.Muscles).ThenInclude(muscle => muscle.Muscle).Where(x => x.Id == id).SingleOrDefaultAsync();
    }
  }
}