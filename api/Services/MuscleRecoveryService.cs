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
  public interface IRecoveryDefinitionService
  {
    Task<RecoveryDefinition> FindAsync(long id, int uId);
    Task<IEnumerable<RecoveryDefinition>> FindCurrentAsync(int uId);
    Task<RecoveryDefinition> Create(RecoveryDefinition model, int uId);
    Task<RecoveryDefinition> Update(long id, int uId, RecoveryDefinition model);
    Task<RecoveryDefinition> Delete(long id, int uId);
  }
  public class RecoveryDefinitionService : IRecoveryDefinitionService
  {
    private DataContext _context;
    public RecoveryDefinitionService(DataContext context)
    {
      _context = context;
    }
    public async Task<RecoveryDefinition> FindAsync(long id, int uId)
    {
      var entity = await _context.RecoveryDefinitions.AsAsyncEnumerable().SingleOrDefaultAsync(x => x.UserId == uId && x.RecoveryDefinitionId == id);
      return entity;
    }
    public async Task<IEnumerable<RecoveryDefinition>> FindCurrentAsync(int uId)
    {
      var recoveries = await _context.RecoveryDefinitions.AsAsyncEnumerable().Where(x => x.UserId == uId).ToListAsync();
      var entities = recoveries.GroupBy(x => x.MuscleId, (key, g) => g.OrderByDescending(x => x.DateCreated).FirstOrDefault()).ToArray();
      return entities;
    }
    public async Task<RecoveryDefinition> Create(RecoveryDefinition model, int uId)
    {
      RecoveryDefinition entity = new RecoveryDefinition() { RecoveryTimeInDays = model.RecoveryTimeInDays, MuscleId = model.MuscleId, UserId = uId, DateCreated = DateTime.Now };
      await _context.RecoveryDefinitions.AddAsync(entity);
      await _context.SaveChangesAsync();
      return entity;
    }
    public async Task<RecoveryDefinition> Update(long id, int uId, RecoveryDefinition model)
    {
      var entity = await _context.RecoveryDefinitions.AsAsyncEnumerable().SingleOrDefaultAsync(x => x.UserId == uId && x.RecoveryDefinitionId == id);
      entity.RecoveryTimeInDays = model.RecoveryTimeInDays;
      entity.MuscleId = model.MuscleId;
      _context.RecoveryDefinitions.Update(entity);
      _context.SaveChanges();
      return entity;
    }

    public async Task<RecoveryDefinition> Delete(long id, int uId)
    {
      var entity = await _context.RecoveryDefinitions.AsAsyncEnumerable().SingleOrDefaultAsync(x => x.RecoveryDefinitionId == id && x.UserId == uId);

      if (entity == null)
        throw new Exception("RecoveryDefinition does not exist.");

      _context.RecoveryDefinitions.Remove(entity);
      _context.SaveChanges();
      return entity;
    }
  }
}