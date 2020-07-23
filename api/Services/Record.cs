
using BodyJournalAPI.Entities;
using BodyJournalAPI.Helpers;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace BodyJournalAPI.Services
{
  public interface IRecordService
  {
    Task<Record> GetRecordAsync(int userId, int id);
    Task<IEnumerable<Record>> GetRecordsAsync(int userId);
    Task<IEnumerable<Record>> GetRecordsByExerciseAsync(int userId, int exerciseId);
    Task CreateRecord(Record model);
    void UpdateRecord(Record model);
    void DeleteRecord(Record model);
  }
  public class RecordService :
  IRecordService
  {
    private DataContext _context;
    public RecordService(DataContext context)
    {
      _context = context;
    }
    public async Task<Record> GetRecordAsync(int userId, int id)
    {
      Record model = await _context.Records.AsQueryable().AsNoTracking().Where(x => x.UserId == userId && x.Id == id).SingleOrDefaultAsync();

      return model;
    }
    public async Task<IEnumerable<Record>> GetRecordsAsync(int id)
    {
      return await _context.Records.AsQueryable().AsNoTracking().Where(x => x.UserId == id).ToArrayAsync();
    }

    public async Task<IEnumerable<Record>> GetRecordsByExerciseAsync(int userId, int exerciseId)
    {
      return await _context.Records.AsQueryable().AsNoTracking().Where(x => x.UserId == userId && x.ExerciseId == exerciseId).OrderBy(x => x.Time).ToArrayAsync();
    }

    public async Task CreateRecord(Record model)
    {
      await _context.Records.AddAsync(model);
      await _context.SaveChangesAsync();
    }

    public void UpdateRecord(Record model)
    {
      _context.Records.Update(model);
      _context.SaveChanges();
    }

    public void DeleteRecord(Record model)
    {
      _context.Records.Remove(model);
      _context.SaveChanges();
    }
  }
}