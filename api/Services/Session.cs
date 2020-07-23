
using BodyJournalAPI.Entities;
using BodyJournalAPI.Helpers;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace BodyJournalAPI.Services
{
  public interface ISessionService
  {
    Task<Session> GetSessionAsync(int userId, int id);
    Task<IEnumerable<Session>> GetSessionsAsync(int userId);
    Task<Session> GetCurrentSessionAsync(int userId);
    Task CreateSession(Session model);
    void UpdateSession(Session model);
    void DeleteSession(Session model);
  }
  public class SessionService :
  ISessionService
  {
    private DataContext _context;
    public SessionService(DataContext context)
    {
      _context = context;
    }
    public async Task<Session> GetSessionAsync(int userId, int id)
    {
      return await _context.Sessions.AsQueryable().AsNoTracking().Where(x => x.UserId == userId && x.Id == id).
       SingleOrDefaultAsync();
    }
    public async Task<IEnumerable<Session>> GetSessionsAsync(int id)
    {
      return await _context.Sessions.AsQueryable().AsNoTracking().Where(x => x.UserId == id).Include(e => e.Workout).ToArrayAsync();
    }

    public async Task<Session> GetCurrentSessionAsync(int id)
    {
      return await _context.Sessions.AsQueryable().AsNoTracking().Where(x => x.WorkoutEnd == null).OrderByDescending(x => x.WorkoutStart).LastOrDefaultAsync();
    }

    public async Task CreateSession(Session model)
    {
      await _context.Sessions.AddAsync(model);
      await _context.SaveChangesAsync();
    }

    public void UpdateSession(Session model)
    {
      _context.Sessions.Update(model);
      _context.SaveChanges();
    }

    public void DeleteSession(Session model)
    {
      _context.Sessions.Remove(model);
      _context.SaveChanges();
    }
  }
}