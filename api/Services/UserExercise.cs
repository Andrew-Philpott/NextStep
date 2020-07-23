
using BodyJournalAPI.Entities;
using BodyJournalAPI.Helpers;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace BodyJournalAPI.Services
{
  public interface IUserExerciseService
  {
    Task<UserExercise> GetExerciseAsync(int userId, int id);
    Task<IEnumerable<UserExercise>> GetExercisesAsync(int userId);
    Task CreateExercise(UserExercise model);
    void UpdateExercise(UserExercise model);
    void DeleteExercise(UserExercise model);
  }
  public class UserExerciseService :
  IUserExerciseService
  {
    private DataContext _context;
    public UserExerciseService(DataContext context)
    {
      _context = context;
    }

    public async Task<UserExercise> GetExerciseAsync(int userId, int id)
    {
      return await _context.UserExercises.Where(x => x.UserId == userId && x.Id == id).SingleOrDefaultAsync();
    }

    public async Task<IEnumerable<UserExercise>> GetExercisesAsync(int userId)
    {
      return await _context.UserExercises.Where(x => x.UserId == userId).ToArrayAsync();
    }
    public async Task CreateExercise(UserExercise model)
    {
      await _context.UserExercises.AddAsync(model);
      await _context.SaveChangesAsync();
    }

    public void UpdateExercise(UserExercise model)
    {
      _context.UserExercises.Update(model);
      _context.SaveChanges();
    }

    public void DeleteExercise(UserExercise model)
    {
      _context.UserExercises.Remove(model);
      _context.SaveChanges();
    }
  }
}