using System;
using System.Text;
using BodyJournalAPI.Entities;
using System.Threading.Tasks;
using BodyJournalAPI.Helpers;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace BodyJournalAPI.Services
{
  public interface IRecoveryService
  {
    Task<Recovery> FindAsync(long id, int uId);
    Task<IEnumerable<Recovery>> FindAllAsync(int uId);
    Task<Recovery> Create(Recovery Recovery, int uId);
    Task<Recovery> Update(long id, int uId, Recovery model);
    Task<Recovery> Delete(long id, int uId);
  }
  public class RecoveryService : IRecoveryService
  {
    private DataContext _context;
    public RecoveryService(DataContext context)
    {
      _context = context;
    }
    public async Task<Recovery> FindAsync(long id, int uId)
    {
      var entity = await _context.Recovery.AsAsyncEnumerable().SingleOrDefaultAsync(x => x.UserId == uId && x.RecoveryId == id);
      return entity;
    }
    public async Task<IEnumerable<Recovery>> FindAllAsync(int uId)
    {
      var recoveries = await _context.Recovery.AsAsyncEnumerable().Where(x => x.UserId == uId).ToListAsync();
      var entities = recoveries.GroupBy(x => x.MuscleId, (key, g) => g.OrderByDescending(x => x.Time).FirstOrDefault()).ToArray();
      return entities;
    }
    public async Task<Recovery> Create(Recovery model, int uId)
    {
      Recovery entity = new Recovery() { Fatigue = model.Fatigue, MuscleId = model.MuscleId, UserId = uId, Time = DateTime.Now.ToString("MM/dd/yyyy H:mm") };
      await _context.Recovery.AddAsync(entity);
      await _context.SaveChangesAsync();
      return entity;
    }
    public async Task<Recovery> Update(long id, int uId, Recovery model)
    {
      var entity = await _context.Recovery.AsAsyncEnumerable().SingleOrDefaultAsync(x => x.UserId == uId && x.RecoveryId == id);
      entity.Fatigue = model.Fatigue;
      entity.MuscleId = model.MuscleId;
      _context.Recovery.Update(entity);
      _context.SaveChanges();
      return entity;
    }

    public async Task<Recovery> Delete(long id, int uId)
    {
      var entity = await _context.Recovery.AsAsyncEnumerable().SingleOrDefaultAsync(x => x.RecoveryId == id && x.UserId == uId);

      if (entity == null)
        throw new Exception("Recovery does not exist.");

      _context.Recovery.Remove(entity);
      _context.SaveChanges();
      return entity;
    }
  }
}