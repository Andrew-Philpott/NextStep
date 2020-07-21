
using BodyJournalAPI.Entities;
using BodyJournalAPI.Helpers;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace BodyJournalAPI.Services
{
  public interface IRecoveryService : IServiceBase<Recovery>
  {
    Task<Recovery> GetRecoveryAsync(int userId, int id);
    Task<IEnumerable<Recovery>> GetRecoveriesAsync(int userId);
    // Task<Recovery> GetCurrentMuscleRecoveryAsync(int id, int muscleId);
    // Task<IEnumerable<Recovery>> GetCurrentRecoveriesAsync(int userId);
    void CreateRecoveries(List<Recovery> model);
    void CreateRecovery(Recovery model);
    void UpdateRecovery(Recovery model);
    void DeleteRecovery(Recovery model);
  }
  public class RecoveryService : ServiceBase<Recovery>,
  IRecoveryService
  {
    public RecoveryService(BodyJournalContext bodyJournalContext) : base(bodyJournalContext)
    {
    }

    public async Task<Recovery> GetRecoveryAsync(int userId, int id)
    {
      return await FindByCondition(x => x.UserId == userId && x.Id == id).SingleOrDefaultAsync();
    }

    // public async Task<Recovery> GetCurrentMuscleRecoveryAsync(int id, int muscleId)
    // {
    //   return await FindByCondition(x => x.UserId == id && x.MuscleId == muscleId).OrderByDescending(x => x.Time).FirstOrDefaultAsync();
    // }

    public async Task<IEnumerable<Recovery>> GetRecoveriesAsync(int userId)
    {
      return await FindByCondition(x => x.UserId == userId).ToListAsync();
    }

    public void CreateRecoveries(List<Recovery> model)
    {
      foreach (Recovery item in model)
      {
        Create(item);
      }
    }
    public void CreateRecovery(Recovery model)
    {
      Create(model);
    }

    public void UpdateRecovery(Recovery model)
    {
      Update(model);
    }

    public void DeleteRecovery(Recovery model)
    {
      Delete(model);
    }
  }
}