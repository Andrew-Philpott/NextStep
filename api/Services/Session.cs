
using BodyJournalAPI.Entities;
using BodyJournalAPI.Helpers;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
namespace BodyJournalAPI.Services
{
  public interface ISessionService : IServiceBase<Session>
  {
    Task<Session> GetSessionAsync(int userId, int id);
    Task<IEnumerable<Session>> GetSessionsAsync(int userId);
    Task<Session> GetCurrentSessionAsync(int userId);
    void CreateSession(Session model);
    void UpdateSession(Session model);
    void DeleteSession(Session model);
  }
  public class SessionService : ServiceBase<Session>,
  ISessionService
  {
    public SessionService(BodyJournalContext bodyJournalContext) : base(bodyJournalContext)
    {
    }
    public async Task<Session> GetSessionAsync(int userId, int id)
    {
      Session model = await FindByCondition(x => x.UserId == userId && x.Id == id).
      SingleOrDefaultAsync();

      return model;
    }
    public async Task<IEnumerable<Session>> GetSessionsAsync(int id)
    {
      return await FindByCondition(x => x.UserId == id).Include(e => e.Workout).OrderBy(x => x.WorkoutStart).ToListAsync();
    }

    public async Task<Session> GetCurrentSessionAsync(int id)
    {
      return await FindByCondition(x => x.WorkoutEnd == null).OrderByDescending(x => x.WorkoutStart).LastOrDefaultAsync();
    }

    public void CreateSession(Session model)
    {
      Create(model);
    }

    public void UpdateSession(Session model)
    {
      Update(model);
    }

    public void DeleteSession(Session model)
    {
      Delete(model);
    }
  }
}