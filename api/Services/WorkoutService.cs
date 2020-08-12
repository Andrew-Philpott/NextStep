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
  public interface IWorkoutService
  {
    Task<Workout> FindAsync(long id, int uId);
    Task<IEnumerable<Workout>> FindAllAsync(int uId);
    Task<Workout> Create(Workout model, int uId);
    Task<Workout> Update(long id, int uId, Workout model);
    Task<Workout> Delete(long id, int uId);
  }
  public class WorkoutService : IWorkoutService
  {
    private DataContext _context;
    public WorkoutService(DataContext context)
    {
      _context = context;
    }
    public async Task<Workout> FindAsync(long id, int uId)
    {
      var entity = await _context.Workouts.Include(x => x.Exercises).SingleOrDefaultAsync(x => x.UserId == uId && x.WorkoutId == id);
      return entity;
    }
    public async Task<IEnumerable<Workout>> FindAllAsync(int uId)
    {
      var entities = await _context.Workouts.Include(x => x.Exercises).ThenInclude(x => x.ExerciseType).ThenInclude(x => x.Muscles).ThenInclude(x => x.Muscle).Where(x => x.UserId == uId).ToArrayAsync();
      return entities;
    }
    public async Task<Workout> Create(Workout model, int uId)
    {
      Workout workoutEntity = new Workout() { UserId = uId, Notes = model.Notes, Name = model.Name };
      List<Exercise> exerciseList = new List<Exercise>();
      foreach (Exercise item in model.Exercises)
      {
        exerciseList.Add(new Exercise()
        {
          UserId = uId,
          WorkoutId = workoutEntity.WorkoutId,
          Weight = item.Weight,
          Reps = item.Reps,
          Sets = item.Sets,
          ExerciseTypeId = item.ExerciseTypeId
        });
      }
      workoutEntity.Exercises = exerciseList;
      await _context.Workouts.AddAsync(workoutEntity);
      await _context.SaveChangesAsync();
      return workoutEntity;
    }
    public async Task<Workout> Update(long id, int uId, Workout model)
    {
      if (model.Exercises.Count() < 1)
        throw new Exception("Workout must include at least 1 exercise.");

      if (model.Exercises == null)
        throw new Exception("Exercises cannot be null.");

      StringBuilder response = new StringBuilder();

      if (string.IsNullOrWhiteSpace(model.Name))
        response.Append("Workout: Name cannot be null or empty.");

      Workout workoutEntity = await _context.Workouts.Include(x => x.Exercises).SingleOrDefaultAsync(x => x.UserId == uId && x.WorkoutId == id);

      if (workoutEntity == null) throw new Exception("Workout could not be found.");

      workoutEntity.Name = model.Name;
      workoutEntity.Notes = model.Notes;

      List<Exercise> remove = new List<Exercise>();
      foreach (Exercise exerciseEntity in workoutEntity.Exercises)
      {
        var exerciseMatch = model.Exercises.SingleOrDefault(x => x.ExerciseId == exerciseEntity.ExerciseId);
        if (exerciseMatch == null)
        {
          _context.Exercises.Remove(exerciseEntity);
        }
        else
        {
          exerciseEntity.Reps = exerciseMatch.Reps;
          exerciseEntity.Sets = exerciseMatch.Sets;
          exerciseEntity.UserId = exerciseMatch.UserId;
          exerciseEntity.ExerciseId = exerciseMatch.ExerciseId;
          exerciseEntity.Weight = exerciseMatch.Weight;
          _context.Exercises.Update(exerciseEntity);
        }
      }

      for (int i = 0; i < model.Exercises.Count(); i++)
      {
        Exercise exercise = model.Exercises[i];
        StringBuilder exerciseSb = new StringBuilder();
        string exerciseString = $"Exercise {i}: ";

        if (exercise.Reps < 0 || exercise.Reps > 255)
        {
          exerciseSb.Append($"Reps must be between 0 and 255. ");
        }
        if (exercise.Sets < 0 || exercise.Sets > 255)
        {
          exerciseSb.Append("Sets must be between 0 and 255. ");
        }
        if (exercise.Weight < 0 || exercise.Weight > 32767)
        {
          exerciseSb.Append("Weight must be between 0 and 32767. ");
        }
        if (exerciseSb.Length > 0)
        {
          throw new Exception(exerciseSb.Insert(0, exerciseString).ToString());
        }
        exercise.WorkoutId = workoutEntity.WorkoutId;
        exercise.UserId = uId;
        if (exercise.ExerciseId == 0)
        {
          await _context.Exercises.AddAsync(exercise);
        }
      }
      await _context.SaveChangesAsync();
      return workoutEntity;
    }

    public async Task<Workout> Delete(long id, int uId)
    {
      var entity = await _context.Workouts.Include(x => x.Exercises).SingleOrDefaultAsync(x => x.WorkoutId == id && x.UserId == uId);

      if (entity == null)
        throw new Exception("Workout does not exist.");

      foreach (Exercise item in entity.Exercises)
      {
        _context.Exercises.Remove(item);
      }

      _context.Workouts.Remove(entity);
      _context.SaveChanges();
      return entity;
    }
  }
}