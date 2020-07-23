
using BodyJournalAPI.Entities;
using BodyJournalAPI.Helpers;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace BodyJournalAPI.Services
{
  public interface IRecoveryService
  {
    Task<Recovery> GetRecoveryAsync(int userId, int id);
    Task<IEnumerable<Recovery>> GetRecoveriesAsync(int userId);
    Task CreateRecoveries(List<Recovery> model);
    Task CreateRecovery(Recovery model);
    void UpdateRecovery(Recovery model);
    void DeleteRecovery(Recovery model);
  }
  public class RecoveryService :
  IRecoveryService
  {
    private DataContext _context;
    public RecoveryService(DataContext context)
    {
      _context = context;
    }

    public async Task<Recovery> GetRecoveryAsync(int userId, int id)
    {
      return await _context.Recovery.AsQueryable().AsNoTracking().Where(x => x.UserId == userId && x.Id == id).SingleOrDefaultAsync();
    }

    public async Task<IEnumerable<Recovery>> GetRecoveriesAsync(int userId)
    {
      return await _context.Recovery.AsQueryable().AsNoTracking().Where(x => x.UserId == userId).ToArrayAsync();
    }

    public async Task CreateRecoveries(List<Recovery> model)
    {
      foreach (Recovery item in model)
      {
        await _context.Recovery.AddAsync(item);
      }
    }
    public async Task CreateRecovery(Recovery model)
    {
      await _context.Recovery.AddAsync(model);
      await _context.SaveChangesAsync();
    }

    public void UpdateRecovery(Recovery model)
    {
      _context.Recovery.Update(model);
      _context.SaveChanges();
    }

    public void DeleteRecovery(Recovery model)
    {
      _context.Recovery.Remove(model);
      _context.SaveChanges();
    }
  }
}