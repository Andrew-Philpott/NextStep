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
  public interface IRecordService
  {
    Task<Record> FindAsync(short id, int uId);
    Task<IEnumerable<Record>> FindAllAsync(int uId);
    Task<IEnumerable<Record>> FindPRsForExercisesAsync(int uId);
    Task<IEnumerable<Record>> FindRecordsForExerciseAsync(short id, int uId);
    Task<Record> Create(Record record, ExerciseType exerciseType, int uId);
    Task<Record> Update(short id, int uId, Record model, ExerciseType exerciseType);
    Task<Record> Delete(short id, int uId);
  }
  public class RecordService : IRecordService
  {
    private DataContext _context;
    public RecordService(DataContext context)
    {
      _context = context;
    }
    public async Task<Record> FindAsync(short id, int uId)
    {
      var entity = await _context.Records.AsAsyncEnumerable().SingleOrDefaultAsync(x => x.UserId == uId && x.RecordId == id);
      return entity;
    }
    public async Task<IEnumerable<Record>> FindAllAsync(int uId)
    {
      var entities = await _context.Records.AsAsyncEnumerable().ToArrayAsync();
      return entities;
    }

    public async Task<IEnumerable<Record>> FindPRsForExercisesAsync(int uId)
    {
      var records = await _context.Records.AsAsyncEnumerable().ToListAsync();
      var entities = records.GroupBy(x => x.ExerciseTypeId, (key, g) => g.OrderByDescending(x => x.Weight).FirstOrDefault());
      return entities;
    }

    public async Task<IEnumerable<Record>> FindRecordsForExerciseAsync(short id, int uId)
    {
      var entities = await _context.Records.AsAsyncEnumerable().Where(x => x.ExerciseTypeId == id).OrderByDescending(x => x.Weight).ToListAsync();
      return entities;
    }
    public async Task<Record> Create(Record model, ExerciseType exerciseType, int uId)
    {
      DateTime time = DateTime.Now;
      Record entity = new Record() { Weight = model.Weight, Reps = model.Reps, Sets = model.Sets, ExerciseTypeId = exerciseType.ExerciseTypeId, DateCreated = time, UserId = uId };
      await _context.Records.AddAsync(entity);
      await _context.SaveChangesAsync();
      return entity;
    }
    public async Task<Record> Update(short id, int uId, Record model, ExerciseType exerciseType)
    {
      DateTime time = DateTime.Now;
      var entity = await _context.Records.AsAsyncEnumerable().SingleOrDefaultAsync(x => x.UserId == uId && x.RecordId == id);
      if (entity == null)
        throw new Exception("Record does not exist.");

      entity = new Record() { Weight = model.Weight, Reps = model.Reps, Sets = model.Sets, ExerciseTypeId = exerciseType.ExerciseTypeId, DateCreated = time, UserId = uId };
      _context.Records.Update(entity);
      _context.SaveChanges();
      return entity;
    }

    public async Task<Record> Delete(short id, int uId)
    {
      var entity = await _context.Records.AsAsyncEnumerable().SingleOrDefaultAsync(x => x.RecordId == id && x.UserId == uId);

      if (entity == null)
        throw new Exception("Record does not exist.");

      _context.Records.Remove(entity);
      _context.SaveChanges();
      return entity;
    }
  }
}