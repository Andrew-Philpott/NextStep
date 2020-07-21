using BodyJournalAPI.Helpers;
using System.Threading.Tasks;

namespace BodyJournalAPI.Services
{
  public interface IServiceWrapper
  {
    IUserExerciseService UserExercise { get; }
    IExerciseService Exercise { get; }
    IWorkoutService Workout { get; }
    IRecordService Record { get; }
    ISessionService Session { get; }
    IRecoveryService Recovery { get; }
    IExerciseWorkoutService ExerciseWorkout { get; }
    IExerciseMuscleService ExerciseMuscle { get; }
    IUserService User { get; }
    Task SaveAsync();
  }
  public class ServiceWrapper : IServiceWrapper
  {
    private BodyJournalContext _bodyJournalContext;
    private IUserExerciseService _userExercise;
    private IExerciseWorkoutService _exerciseWorkout;
    private IWorkoutService _workout;
    private ISessionService _session;
    private IRecordService _record;
    private IExerciseService _exercise;
    private IRecoveryService _recovery;
    private IExerciseMuscleService _exerciseMuscle;
    private IUserService _user;

    public ServiceWrapper(BodyJournalContext bodyJournalContext)
    {
      _bodyJournalContext = bodyJournalContext;
    }


    public IUserExerciseService UserExercise
    {
      get
      {
        if (_userExercise == null)
        {
          _userExercise = new UserExerciseService(_bodyJournalContext);
        }

        return _userExercise;
      }
    }
    public IRecordService Record
    {
      get
      {
        if (_record == null)
        {
          _record = new RecordService(_bodyJournalContext);
        }

        return _record;
      }
    }


    public IWorkoutService Workout
    {
      get
      {
        if (_workout == null)
        {
          _workout = new WorkoutService(_bodyJournalContext);
        }

        return _workout;
      }
    }

    public ISessionService Session
    {
      get
      {
        if (_session == null)
        {
          _session = new SessionService(_bodyJournalContext);
        }

        return _session;
      }
    }
    public IRecoveryService Recovery
    {
      get
      {
        if (_recovery == null)
        {
          _recovery = new RecoveryService(_bodyJournalContext);
        }
        return _recovery;
      }
    }
    public IExerciseWorkoutService ExerciseWorkout
    {
      get
      {
        if (_exerciseWorkout == null)
        {
          _exerciseWorkout = new ExerciseWorkoutService(_bodyJournalContext);
        }

        return _exerciseWorkout;
      }
    }

    public IExerciseMuscleService ExerciseMuscle
    {
      get
      {
        if (_exerciseMuscle == null)
        {
          _exerciseMuscle = new ExerciseMuscleService(_bodyJournalContext);
        }

        return _exerciseMuscle;
      }
    }

    public IExerciseService Exercise
    {
      get
      {
        if (_exercise == null)
        {
          _exercise = new ExerciseService(_bodyJournalContext);
        }

        return _exercise;
      }
    }

    public IUserService User
    {
      get
      {
        if (_user == null)
        {
          _user = new UserService(_bodyJournalContext);
        }

        return _user;
      }
    }
    public async Task SaveAsync()
    {
      await _bodyJournalContext.SaveChangesAsync();
    }
  }
}