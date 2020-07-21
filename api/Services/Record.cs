
using BodyJournalAPI.Entities;
using BodyJournalAPI.Helpers;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
namespace BodyJournalAPI.Services
{
  public interface IRecordService : IServiceBase<Record>
  {
    Task<Record> GetRecordAsync(int userId, int id);
    Task<IEnumerable<Record>> GetRecordsAsync(int userId);
    Task<IEnumerable<Record>> GetRecordsByExerciseAsync(int userId, int exerciseId);
    void CreateRecord(Record model);
    void UpdateRecord(Record model);
    void DeleteRecord(Record model);
  }
  public class RecordService : ServiceBase<Record>,
  IRecordService
  {
    public RecordService(BodyJournalContext bodyJournalContext) : base(bodyJournalContext)
    {
    }
    public async Task<Record> GetRecordAsync(int userId, int id)
    {
      Record model = await FindByCondition(x => x.UserId == userId && x.Id == id).
      SingleOrDefaultAsync();

      return model;
    }
    public async Task<IEnumerable<Record>> GetRecordsAsync(int id)
    {
      return await FindByCondition(x => x.UserId == id).OrderBy(x => x.Time).ToListAsync();
    }

    public async Task<IEnumerable<Record>> GetRecordsByExerciseAsync(int userId, int exerciseId)
    {
      return await FindByCondition(x => x.UserId == userId && x.ExerciseId == exerciseId).OrderBy(x => x.Time).ToListAsync();
    }

    public void CreateRecord(Record model)
    {
      Create(model);
    }

    public void UpdateRecord(Record model)
    {
      Update(model);
    }

    public void DeleteRecord(Record model)
    {
      Delete(model);
    }
  }
}