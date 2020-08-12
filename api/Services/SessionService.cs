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
  public interface ISessionService
  {
    Task<Session> FindAsync(long id, int uId);
    Task<IEnumerable<Session>> FindAllAsync(int uId);
    Task<Session> FindCurrentSessionAsync(int uId);
    Task<Session> Create(Session model, int uId);
    Task<Session> Update(long id, int uId, Session model);
    Task<Session> Delete(long id, int uId);
  }
  public class SessionService : ISessionService
  {
    private DataContext _context;
    public SessionService(DataContext context)
    {
      _context = context;
    }
    public async Task<Session> FindAsync(long id, int uId)
    {
      var entity = await _context.Sessions.AsAsyncEnumerable().SingleOrDefaultAsync(x => x.UserId == uId && x.SessionId == id);
      return entity;
    }
    public async Task<IEnumerable<Session>> FindAllAsync(int uId)
    {
      var entities = await _context.Sessions.AsAsyncEnumerable().ToArrayAsync();
      return entities;
    }

    public async Task<Session> FindCurrentSessionAsync(int uId)
    {
      var entity = await _context.Sessions.AsAsyncEnumerable().SingleOrDefaultAsync(x => x.UserId == uId && x.WorkoutEnd == null);
      return entity;
    }
    public async Task<Session> Create(Session model, int uId)
    {
      Session entity = new Session() { UserId = uId, WorkoutId = model.WorkoutId };
      await _context.Sessions.AddAsync(entity);
      await _context.SaveChangesAsync();
      return entity;
    }
    public async Task<Session> Update(long id, int uId, Session model)
    {
      var entity = await _context.Sessions.AsAsyncEnumerable().SingleOrDefaultAsync(x => x.UserId == uId && x.SessionId == id);
      if (entity == null)
        throw new Exception("Session does not exist.");

      if (entity.WorkoutEnd == null)
        entity.WorkoutEnd = DateTime.Now.ToString("MM/dd/yyyy H:mm");

      entity.Rating = model.Rating;
      _context.Sessions.Update(entity);
      _context.SaveChanges();
      return entity;
    }

    public async Task<Session> Delete(long id, int uId)
    {
      var entity = await _context.Sessions.AsAsyncEnumerable().SingleOrDefaultAsync(x => x.SessionId == id && x.UserId == uId);

      if (entity == null)
        throw new Exception("Session does not exist.");

      _context.Sessions.Remove(entity);
      _context.SaveChanges();
      return entity;
    }
  }
}