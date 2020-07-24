
using BodyJournalAPI.Entities;
using BodyJournalAPI.Helpers;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace BodyJournalAPI.Services
{
  public interface IExerciseService
  {
    Task<Exercise> GetExerciseAsync(int userId, int id);
    Task<IEnumerable<Exercise>> GetExercisesAsync(int userId);
    Task CreateExercise(Exercise model);
    void UpdateExercise(Exercise model);
    void DeleteExercise(Exercise model);
  }
  public class ExerciseService :
  IExerciseService
  {
    private DataContext _context;
    public ExerciseService(DataContext context)
    {
      _context = context;
    }

    public async Task<Exercise> GetExerciseAsync(int userId, int id)
    {
      return await _context.Exercises.Where(x => x.UserId == userId && x.Id == id).SingleOrDefaultAsync();
    }

    public async Task<IEnumerable<Exercise>> GetExercisesAsync(int userId)
    {
      return await _context.Exercises.Where(x => x.UserId == userId).ToArrayAsync();
    }
    public async Task CreateExercise(Exercise model)
    {
      await _context.Exercises.AddAsync(model);
      await _context.SaveChangesAsync();
    }

    public void UpdateExercise(Exercise model)
    {
      _context.Exercises.Update(model);
      _context.SaveChanges();
    }

    public void DeleteExercise(Exercise model)
    {
      _context.Exercises.Remove(model);
      _context.SaveChanges();
    }
  }
}