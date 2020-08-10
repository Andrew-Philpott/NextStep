using System;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using BodyJournalAPI.Entities;
using BodyJournalAPI.Helpers;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;
using BodyJournalAPI.Services;

namespace BodyJournalAPI.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class ApiController : ControllerBase
  {
    private IUserService _userService;
    private IWorkoutService _workoutService;
    private ISessionService _sessionService;
    private IRecordService _recordService;
    private IExerciseTypeService _exerciseTypeService;
    private IRecoveryService _recoveryService;
    private readonly AppSettings _appSettings;
    public ApiController(DataContext db, IUserService userService, IWorkoutService workoutService, ISessionService sessionService, IRecordService recordService, IExerciseTypeService exerciseTypeService, IRecoveryService recoveryService, IOptions<AppSettings> appSettings)
    {
      _userService = userService;
      _workoutService = workoutService;
      _sessionService = sessionService;
      _recordService = recordService;
      _exerciseTypeService = exerciseTypeService;
      _recoveryService = recoveryService;
      _appSettings = appSettings.Value;
    }
    #region Users
    [AllowAnonymous]
    [HttpPost("users/authenticate")]
    public async Task<IActionResult> Authenticate([FromBody] User model)
    {
      try
      {
        var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
        var entity = await _userService.Authenticate(model, key);
        return Ok(entity);
      }
      catch (Exception ex)
      {
        System.Console.WriteLine(ex);
        return BadRequest(new { message = ex.Message });
      }
    }

    [AllowAnonymous]
    [HttpPost("users/register")]
    public async Task<IActionResult> Register([FromBody] User model)
    {
      try
      {
        var entity = await _userService.Register(model);
        return Ok(entity);
      }
      catch (Exception ex)
      {
        return BadRequest(new { message = ex });
      }
    }

    [HttpGet("users/{id}")]
    public async Task<IActionResult> GetById(int id)
    {
      try
      {
        var entity = await _userService.FindAsync(id);
        return Ok(entity);
      }
      catch (Exception ex)
      {
        return BadRequest(new { message = ex.Message });
      }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser(int id, [FromBody] User model)
    {
      try
      {
        var entity = await _userService.Update(id, model);
        return Ok(entity);
      }
      catch (Exception ex)
      {
        return BadRequest(new { message = ex.Message });
      }
    }

    [HttpDelete("users/{id}")]
    public async Task<IActionResult> Delete(int id)
    {
      try
      {
        await _userService.Delete(id);
        return Ok(id);
      }
      catch (Exception ex)
      {
        return BadRequest(new { message = ex.Message });
      }
    }
    #endregion


    #region exercises
    [AllowAnonymous]
    [HttpGet("exercises/{id}")]
    public async Task<IActionResult> Exercise(short id)
    {
      try
      {
        var entity = await _exerciseTypeService.FindAsync(id);
        return Ok(entity);
      }
      catch (Exception ex)
      {
        return BadRequest(new { message = ex.Message });
      }
    }
    [AllowAnonymous]
    [HttpGet("exercises")]
    public async Task<IActionResult> Exercises()
    {
      try
      {
        var entities = await _exerciseTypeService.FindAllAsync();
        return Ok(entities);
      }
      catch (Exception ex)
      {
        return BadRequest(new { message = ex.Message });
      }
    }
    #endregion

    [HttpGet("users/records")]
    public async Task<IActionResult> GetRecords()
    {
      var currentUserId = int.Parse(User.Identity.Name);
      try
      {
        var entities = await _recordService.FindAllAsync(currentUserId);
        return Ok(entities);
      }
      catch (Exception ex)
      {
        return BadRequest(new { message = ex.Message });
      }
    }

    [HttpGet("users/records/{id}")]
    public async Task<IActionResult> GetRecord(short id)
    {
      var currentUserId = int.Parse(User.Identity.Name);
      try
      {
        var entity = await _recordService.FindAsync(id, currentUserId);
        return Ok(entity);
      }
      catch (Exception ex)
      {
        return BadRequest(new { message = ex.Message });
      }
    }

    [HttpGet("users/records/exercises/{id}")]
    public async Task<IActionResult> GetRecordsForExercise(short id)
    {
      var currentUserId = int.Parse(User.Identity.Name);
      try
      {
        var entities = await _recordService.FindRecordsForExerciseAsync(id, currentUserId);
        return Ok(entities);
      }
      catch (Exception ex)
      {
        return BadRequest(new { message = ex.Message });
      }
    }


    [HttpGet("users/records/exercises/pr")]
    public async Task<IActionResult> GetPRsForExercises()
    {
      var currentUserId = int.Parse(User.Identity.Name);
      try
      {
        var entities = await _recordService.FindPRsForExercisesAsync(currentUserId);
        return Ok(entities);
      }
      catch (Exception ex)
      {
        return BadRequest(new { message = ex.Message });
      }
    }

    [HttpPost("users/records")]
    public async Task<IActionResult> CreateRecord([FromBody] Record model)
    {
      var currentUserId = int.Parse(User.Identity.Name);
      try
      {
        var exercise = await _exerciseTypeService.FindAsync(model.ExerciseTypeId);
        var record = await _recordService.Create(model, exercise, currentUserId);
        return Ok(record);
      }
      catch (Exception ex)
      {
        return BadRequest(new { message = ex.Message });
      }
    }

    [HttpDelete("users/records/{id}")]
    public async Task<IActionResult> DeleteRecord(short id)
    {
      var currentUserId = int.Parse(User.Identity.Name);
      try
      {
        var entity = await _recordService.Delete(id, currentUserId);
        return Ok(entity);
      }
      catch (Exception ex)
      {
        return BadRequest(new { message = ex.Message });
      }
    }

    #region Workouts
    [HttpGet("users/workouts/{id}")]
    public async Task<IActionResult> GetWorkout(long id)
    {
      var currentUserId = int.Parse(User.Identity.Name);
      try
      {
        var entity = await _workoutService.FindAsync(id, currentUserId);
        return Ok(entity);
      }
      catch (Exception ex)
      {
        return BadRequest(new { message = ex.Message });
      }
    }

    [HttpGet("users/workouts")]
    public async Task<IActionResult> GetWorkouts()
    {
      var currentUserId = int.Parse(User.Identity.Name);
      try
      {
        var entities = await _workoutService.FindAllAsync(currentUserId);
        return Ok(entities);
      }
      catch (Exception ex)
      {
        return BadRequest(new { message = ex.Message });
      }
    }

    [HttpPost("users/workouts")]
    public async Task<IActionResult> CreateWorkout([FromBody] Workout model)
    {
      var currentUserId = int.Parse(User.Identity.Name);
      try
      {
        var entity = await _workoutService.Create(model, currentUserId);
        return Ok(entity);
      }
      catch (Exception ex)
      {
        return BadRequest(new { message = ex.Message });
      }
    }

    [HttpPut("users/workouts/{id}")]
    public async Task<IActionResult> UpdateWorkout(long id, [FromBody] Workout model)
    {
      var currentUserId = int.Parse(User.Identity.Name);
      try
      {
        var entity = await _workoutService.Update(id, currentUserId, model);
        return Ok(entity);
      }
      catch (Exception ex)
      {
        return BadRequest(new { message = ex.Message });
      }
    }

    [HttpDelete("users/workouts/{id}")]
    public async Task<IActionResult> DeleteWorkout(long id)
    {
      var currentUserId = int.Parse(User.Identity.Name);
      try
      {
        var entity = await _workoutService.Delete(id, currentUserId);
        return Ok(entity);
      }
      catch (Exception ex)
      {
        return BadRequest(new { message = ex.Message });
      }
    }
    #endregion

    #region Recovery
    [HttpGet("users/recoveries/{id}")]
    public async Task<IActionResult> GetRecovery(long id)
    {
      var currentUserId = int.Parse(User.Identity.Name);
      try
      {
        var entity = await _recoveryService.FindAsync(id, currentUserId);
        return Ok(entity);
      }
      catch (Exception ex)
      {
        return BadRequest(new { message = ex.Message });
      }
    }
    [HttpGet("users/recoveries")]
    public async Task<IActionResult> GetRecoveries()
    {
      var currentUserId = int.Parse(User.Identity.Name);
      try
      {
        var entities = await _recoveryService.FindAllAsync(currentUserId);
        return Ok(entities);
      }
      catch (Exception ex)
      {
        return BadRequest(new { message = ex.Message });
      }
    }

    [HttpPost("users/recoveries")]
    public async Task<IActionResult> CreateRecovery([FromBody] Recovery model)
    {
      var currentUserId = int.Parse(User.Identity.Name);
      try
      {
        var entity = await _recoveryService.Create(model, currentUserId);
        return Ok(entity);
      }
      catch (Exception ex)
      {
        return BadRequest(new { message = ex.Message });
      }
    }

    [HttpPut("users/recoveries/{id}")]
    public async Task<IActionResult> UpdateRecovery(long id, [FromBody] Recovery model)
    {
      var currentUserId = int.Parse(User.Identity.Name);
      try
      {
        var entity = await _recoveryService.Update(id, currentUserId, model);
        return Ok(entity);
      }
      catch (Exception ex)
      {
        return BadRequest(new { message = ex.Message });
      }
    }

    [HttpDelete("users/recoveries/{id}")]
    public async Task<IActionResult> DeleteRecovery(long id)
    {
      var currentUserId = int.Parse(User.Identity.Name);
      try
      {
        var entity = await _recoveryService.Delete(id, currentUserId);
        return Ok(entity);
      }
      catch (Exception ex)
      {
        return BadRequest(new { message = ex.Message });
      }
    }
    #endregion

    #region Session
    [HttpGet("users/sessions/{id}")]
    public async Task<IActionResult> GetSession(long id)
    {
      var currentUserId = int.Parse(User.Identity.Name);
      try
      {
        var entity = await _sessionService.FindAsync(id, currentUserId);
        return Ok(entity);
      }
      catch (Exception ex)
      {
        return BadRequest(new { message = ex.Message });
      }
    }

    [HttpGet("users/sessions/current")]
    public async Task<IActionResult> GetCurrentSession()
    {
      var currentUserId = int.Parse(User.Identity.Name);
      try
      {
        var entity = await _sessionService.FindCurrentSessionAsync(currentUserId);
        return Ok(entity);
      }
      catch (Exception ex)
      {
        return BadRequest(new { message = ex.Message });
      }
    }

    [HttpGet("users/sessions")]
    public async Task<IActionResult> GetSessions()
    {
      var currentUserId = int.Parse(User.Identity.Name);
      try
      {
        var entities = await _sessionService.FindAllAsync(currentUserId);
        return Ok(entities);
      }
      catch (Exception ex)
      {
        return BadRequest(new { message = ex.Message });
      }
    }

    [HttpPost("users/sessions")]
    public async Task<IActionResult> CreateSession([FromBody] Session model)
    {
      var currentUserId = int.Parse(User.Identity.Name);
      try
      {
        var entity = await _sessionService.Create(model, currentUserId);
        return Ok(entity);
      }
      catch (Exception ex)
      {
        System.Console.WriteLine(ex);
        return BadRequest(new { message = ex.Message });
      }
    }

    [HttpPut("users/sessions/{id}")]
    public async Task<IActionResult> UpdateSession(long id, [FromBody] Session model)
    {
      var currentUserId = int.Parse(User.Identity.Name);
      try
      {
        var entity = await _sessionService.Update(id, currentUserId, model);
        return Ok(entity);
      }
      catch (Exception ex)
      {
        return BadRequest(new { message = ex.Message });
      }
    }

    [HttpDelete("users/sessions/{id}")]
    public async Task<IActionResult> DeleteSession(long id)
    {
      var currentUserId = int.Parse(User.Identity.Name);
      try
      {
        var entity = await _sessionService.Delete(id, currentUserId);
        return Ok(entity);
      }
      catch (Exception ex)
      {
        return BadRequest(new { message = ex.Message });
      }
    }
    #endregion
  }
}
