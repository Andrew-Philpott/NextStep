using BodyJournalAPI.Entities;
using BodyJournalAPI.Helpers;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace BodyJournalAPI.Services
{
  public interface IExerciseService
  {
    Task<Exercise> GetExerciseAsync(int id);
    Task<IEnumerable<Exercise>> GetExercisesAsync();
  }
  public class ExerciseService :
  IExerciseService
  {
    private DataContext _context;
    public ExerciseService(DataContext context)
    {
      _context = context;
    }
    public async Task<IEnumerable<Exercise>> GetExercisesAsync()
    {
      return await _context.Exercises.AsQueryable().AsNoTracking().Include(exercise => exercise.Muscles).ThenInclude(muscle => muscle.Muscle).OrderBy(x => x.Name).ToArrayAsync();
    }
    public async Task<Exercise> GetExerciseAsync(int id)
    {
      return await _context.Exercises.AsQueryable().AsNoTracking().Include(x => x.Muscles).ThenInclude(muscle => muscle.Muscle).Where(x => x.Id == id).SingleOrDefaultAsync();
    }
  }
}