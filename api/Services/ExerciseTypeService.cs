using System;
using System.Text;
using NxtstpApi.Entities;
using System.Threading.Tasks;
using NxtstpApi.Helpers;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace NxtstpApi.Services
{
  public interface IExerciseTypeService
  {
    Task<ExerciseType> FindAsync(long id);
    Task<IEnumerable<ExerciseType>> FindAllAsync();
  }
  public class ExerciseTypeService : IExerciseTypeService
  {
    private DataContext _context;
    public ExerciseTypeService(DataContext context)
    {
      _context = context;
    }
    public async Task<ExerciseType> FindAsync(long id)
    {
      var entity = await _context.ExerciseTypes.AsQueryable().Include(x => x.Muscles).ThenInclude(muscle => muscle.Muscle).ThenInclude(x => x.ExerciseTypes).SingleOrDefaultAsync(x => x.ExerciseTypeId == id);
      return entity;
    }
    public async Task<IEnumerable<ExerciseType>> FindAllAsync()
    {
      var entities = await _context.ExerciseTypes.AsQueryable().AsNoTracking().Include(x => x.Muscles).ThenInclude(z => z.Muscle).OrderByDescending(x => x.Name).ToArrayAsync();
      return entities;
    }
  }
}