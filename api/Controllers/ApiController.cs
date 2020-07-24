using System;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using BodyJournalAPI.Entities;
using BodyJournalAPI.Models;
using BodyJournalAPI.Services;
using BodyJournalAPI.Helpers;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BodyJournalAPI.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class ApiController : ControllerBase
  {
    private IExerciseService _exerciseService;
    private IExerciseWorkoutService _exerciseWorkoutService;
    private IRecordService _recordService;
    private IRecoveryService _recoveryService;
    private ISessionService _sessionService;
    private IUserService _userService;
    private IExerciseTypeService _exerciseTypeService;
    private IWorkoutService _workoutService;
    private IMapper _mapper;
    private readonly AppSettings _appSettings;
    public ApiController(IExerciseService exerciseService, IExerciseWorkoutService exerciseWorkoutService, IRecordService recordService, IRecoveryService recoveryService, ISessionService sessionService, IUserService userService, IWorkoutService workoutService, IExerciseTypeService exerciseTypeService, IMapper mapper, IOptions<AppSettings> appSettings)
    {
      _exerciseService = exerciseService;
      _exerciseWorkoutService = exerciseWorkoutService;
      _recordService = recordService;
      _recoveryService = recoveryService;
      _sessionService = sessionService;
      _userService = userService;
      _exerciseTypeService = exerciseTypeService;
      _workoutService = workoutService;
      _mapper = mapper;
      _appSettings = appSettings.Value;
    }
    #region Users
    [AllowAnonymous]
    [HttpPost("users/authenticate")]
    public async Task<IActionResult> Authenticate([FromBody] AuthenticateUser model)
    {
      try
      {
        var user = await _userService.Authenticate(model.UserName, model.Password);
        if (user == null)
          return BadRequest(new { message = "Username or password is incorrect" });

        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
          Subject = new ClaimsIdentity(new Claim[]
          {
            new Claim(ClaimTypes.Name, user.Id.ToString())
          }),
          Expires = DateTime.UtcNow.AddDays(1),
          SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        var JWToken = tokenHandler.WriteToken(token);
        return Ok(new
        {
          Id = user.Id,
          Username = user.UserName,
          FirstName = user.FirstName,
          LastName = user.LastName,
          Token = JWToken
        });
      }
      catch (Exception)
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [AllowAnonymous]
    [HttpPost("users/register")]
    public async Task<IActionResult> Register([FromBody] RegisterUser model)
    {
      try
      {
        var user = _mapper.Map<User>(model);
        await _userService.CreateUser(user, model.Password);
        return Ok();
      }
      catch (Exception)
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpGet("users/{id}")]
    public async Task<IActionResult> GetById(int id)
    {
      try
      {
        var entity = await _userService.GetUserById(id);
        if (entity == null)
          return NotFound();

        return Ok(_mapper.Map<ViewUser>(entity));
      }
      catch (Exception)
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpPut("users/{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateUser model)
    {
      try
      {
        var entity = await _userService.GetUserById(id);
        if (entity == null)
          return NotFound();

        var user = _mapper.Map<User>(model);
        user.Id = id;
        await _userService.UpdateUser(user, model.Password);
        return Ok();
      }
      catch (Exception)
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpDelete("users/{id}")]
    public async Task<IActionResult> Delete(int id)
    {
      try
      {
        var entity = await _userService.GetUserById(id);
        if (entity == null)
          return NotFound();

        _userService.DeleteUser(entity);

        return Ok();
      }
      catch (Exception)
      {
        return StatusCode(500, "Internal server error.");
      }

    }
    #endregion


    #region exercises

    [AllowAnonymous]
    [HttpGet("exercises/{id}")]
    public async Task<IActionResult> Exercise(int id)
    {
      try
      {
        var entity = await _exerciseTypeService.GetExerciseTypeAsync(id);

        if (entity == null)
          return NotFound();

        return Ok(entity);
      }
      catch (Exception)
      {
        return StatusCode(500, "Internal server error.");
      }
    }
    [AllowAnonymous]
    [HttpGet("exercises")]
    public async Task<IActionResult> Exercises()
    {
      try
      {
        var entities = await _exerciseTypeService.GetExerciseTypesAsync();
        if (entities == null)
          return NotFound(new { message = "Exercises not found." });

        return Ok(entities);
      }
      catch (Exception)
      {
        return StatusCode(500, "Internal server error.");
      }
    }
    #endregion

    #region exerciseTypes
    [HttpGet("users/exercises/{id}")]
    public async Task<IActionResult> GetExercise(int id)
    {
      try
      {
        var entity = await _exerciseService.GetExerciseAsync(int.Parse(User.Identity.Name), id);

        if (entity == null)
          return NotFound(new { message = "Exercise does not exist." });

        return Ok(_mapper.Map<Exercise>(entity));
      }
      catch (Exception)
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpGet("users/exercises")]
    public async Task<IActionResult> GetExercises()
    {
      try
      {
        var entities = await _exerciseService.GetExercisesAsync(int.Parse(User.Identity.Name));

        return Ok(_mapper.Map<IEnumerable<Exercise>>(entities));
      }
      catch (Exception)
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpPost("users/exercises")]
    public async Task<IActionResult> CreateExercise([FromBody] CreateExercise model)
    {
      try
      {
        var exercise = await _exerciseTypeService.GetExerciseTypeAsync(model.ExerciseId);
        if (exercise == null)
          return NotFound(new { message = "Exercise does not exist in database" });

        Exercise entity = _mapper.Map<Exercise>(model);
        entity.Name = exercise.Name;
        entity.UserId = int.Parse(User.Identity.Name);
        await _exerciseService.CreateExercise(entity);
        ExerciseWorkout exerciseWorkout = new ExerciseWorkout() { WorkoutId = model.WorkoutId, ExerciseId = entity.Id };
        await _exerciseWorkoutService.CreateExerciseWorkout(exerciseWorkout);
        return Ok();
      }
      catch (Exception)
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpPut("users/exercises/{id}")]
    public async Task<IActionResult> UpdateExercise(int id, [FromBody] UpdateExercise model)
    {
      try
      {
        var entity = await _exerciseService.GetExerciseAsync(int.Parse(User.Identity.Name), id);
        if (entity == null)
          return NotFound(new { message = "Exercise not in database for user" });
        var exercise = await _exerciseTypeService.GetExerciseTypeAsync(model.ExerciseId);
        if (exercise == null)
          return NotFound(new { message = "Exercise type does not exist in database" });

        _mapper.Map(model, entity);
        entity.Name = exercise.Name;
        _exerciseService.UpdateExercise(entity);

        return Ok();
      }
      catch (Exception)
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpDelete("users/exercises/{id}")]
    public async Task<IActionResult> DeleteExercise(int id)
    {
      try
      {
        var model = await _exerciseService.GetExerciseAsync(int.Parse(User.Identity.Name), id);
        if (model == null)
          return NotFound(new { message = "Exercise does not exist." });

        _exerciseService.DeleteExercise(model);

        return Ok();
      }
      catch (Exception)
      {
        return StatusCode(500, "Internal server error.");
      }
    }
    #endregion

    [HttpGet("users/records")]
    public async Task<IActionResult> GetRecords()
    {
      try
      {
        var entities = await _recordService.GetRecordsAsync(int.Parse(User.Identity.Name));

        return Ok(_mapper.Map<IEnumerable<ViewRecord>>(entities));
      }
      catch (Exception)
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpGet("users/records/{id}")]
    public async Task<IActionResult> GetRecord(int id)
    {
      try
      {
        var entity = await _recordService.GetRecordAsync(int.Parse(User.Identity.Name), id);
        if (entity == null)
          return NotFound(new { message = "Record does not exist." });

        return Ok(_mapper.Map<ViewRecord>(entity));
      }
      catch (Exception)
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpGet("users/records/exercises/{id}")]
    public async Task<IActionResult> GetRecordsByExercise(int id)
    {
      try
      {
        var entity = await _exerciseTypeService.GetExerciseTypeAsync(id);
        if (entity == null)
          return NotFound(new { message = "Record does not exist." });

        var entities = await _recordService.GetRecordsByExerciseAsync(int.Parse(User.Identity.Name), id);

        return Ok(_mapper.Map<IEnumerable<ViewRecord>>(entities));
      }
      catch (Exception)
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpPost("users/records")]
    public async Task<IActionResult> CreateRecord([FromBody] CreateRecord model)
    {
      try
      {
        var exercise = await _exerciseTypeService.GetExerciseTypeAsync(model.ExerciseId); ;
        if (exercise == null)
          return NotFound(new { message = "Exercise does not exist." });

        Record entity = _mapper.Map<Record>(model);
        entity.UserId = int.Parse(User.Identity.Name);
        await _recordService.CreateRecord(entity);
        return Ok();
      }
      catch (Exception)
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpDelete("users/records/{id}")]
    public async Task<IActionResult> DeleteRecord(int id)
    {
      try
      {
        var model = await _recordService.GetRecordAsync(int.Parse(User.Identity.Name), id);
        if (model == null)
          return NotFound(new { message = "Record not in database" });

        _recordService.DeleteRecord(model);
        return Ok();
      }
      catch (Exception)
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    #region Workouts
    [HttpGet("users/workouts/{id}")]
    public async Task<IActionResult> GetWorkout(int id)
    {
      try
      {
        ViewWorkout model = _mapper.Map<ViewWorkout>(await _workoutService.GetWorkoutAsync(int.Parse(User.Identity.Name), id));

        _mapper.Map<IEnumerable<ViewExercise>>(model.Exercises);
        return Ok(model);
      }
      catch (Exception)
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpGet("users/workouts")]
    public async Task<IActionResult> GetWorkouts()
    {
      try
      {
        var entities = await _workoutService.GetWorkoutsAsync(int.Parse(User.Identity.Name));
        IEnumerable<ViewWorkout> mappedEntities = _mapper.Map<IEnumerable<ViewWorkout>>(entities);


        return Ok(mappedEntities);
      }
      catch (Exception)
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpPost("users/workouts")]
    public async Task<IActionResult> CreateWorkout([FromBody] CreateWorkout model)
    {
      try
      {
        Workout entity = _mapper.Map<Workout>(model);
        entity.UserId = int.Parse(User.Identity.Name);
        await _workoutService.CreateWorkout(entity);

        foreach (CreateExercise item in model.Exercises)
        {
          item.WorkoutId = entity.Id;
          await CreateExercise(item);
        }

        return Ok();
      }
      catch (Exception)
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpPut("users/workouts/{id}")]
    public async Task<IActionResult> UpdateWorkout(int id, [FromBody] UpdateWorkout model)
    {
      try
      {
        var entity = await _workoutService.GetWorkoutAsync(int.Parse(User.Identity.Name), id);
        if (entity == null)
          return NotFound(new { message = "Workout does not exist in the database" });

        _mapper.Map(model, entity);
        _workoutService.UpdateWorkout(entity);

        foreach (UpdateExercise updateExercise in model.UpdateExercises)
        {
          await UpdateExercise(updateExercise.Id, updateExercise);
        }

        foreach (CreateExercise item in model.NewExercises)
        {
          item.WorkoutId = entity.Id;
          await CreateExercise(item);
        }

        return Ok();
      }
      catch (Exception)
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpDelete("users/workouts/{id}")]
    public async Task<IActionResult> DeleteWorkout(int id)
    {
      try
      {
        var model = await _workoutService.GetWorkoutAsync(int.Parse(User.Identity.Name), id);
        if (model == null)
          return NotFound(new { message = "Workout does not exist in the database" });

        _workoutService.DeleteWorkout(model);
        return Ok();
      }
      catch (Exception)
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpDelete("users/workouts/{id}/exercises/{eid}")]
    public async Task<IActionResult> DeleteExerciseFromWorkout(int id, int eid)
    {
      try
      {
        var model = await _exerciseWorkoutService.GetExerciseWorkoutAsync(id, eid);
        if (model == null)
          return NotFound(new { message = "Association does not exist in the database" });

        _exerciseWorkoutService.DeleteExerciseWorkout(model);
        return Ok();
      }
      catch (Exception)
      {
        return StatusCode(500, "Internal server error.");
      }
    }
    #endregion

    #region Recovery
    [HttpGet("users/recoveries/{id}")]
    public async Task<IActionResult> GetRecovery(int id)
    {
      try
      {
        var entity = await _recoveryService.GetRecoveryAsync(int.Parse(User.Identity.Name), id);
        if (entity == null)
          return NotFound(new { message = "Recovery does not exist in the database" });

        return Ok(_mapper.Map<ViewRecovery>(entity));
      }
      catch (Exception)
      {
        return StatusCode(500, "Internal server error.");
      }
    }
    [HttpGet("users/recoveries")]
    public async Task<IActionResult> GetRecoveries()
    {
      try
      {
        var entities = await _recoveryService.GetRecoveriesAsync(int.Parse(User.Identity.Name));

        return Ok(_mapper.Map<IEnumerable<ViewRecovery>>(entities));
      }
      catch (Exception)
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpPost("users/recoveries")]
    public async Task<IActionResult> CreateRecovery([FromBody] CreateRecovery model)
    {
      try
      {
        var entity = _mapper.Map<Recovery>(model);
        entity.UserId = int.Parse(User.Identity.Name);
        await _recoveryService.CreateRecovery(entity);

        return Ok(entity);
      }
      catch (Exception)
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpPut("users/recoveries/{id}")]
    public async Task<IActionResult> UpdateRecovery(int id, [FromBody] UpdateRecovery model)
    {
      try
      {
        var entity = await _recoveryService.GetRecoveryAsync(int.Parse(User.Identity.Name), id);
        if (entity == null)
          return NotFound(new { message = "Recovery does not exist in the database" });

        _mapper.Map(model, entity);
        _recoveryService.UpdateRecovery(entity);

        var updatedRecovery = await _recoveryService.GetRecoveryAsync(int.Parse(User.Identity.Name), id);
        return Ok(updatedRecovery);
      }
      catch (Exception)
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpDelete("users/recoveries/{id}")]
    public async Task<IActionResult> DeleteRecovery(int id)
    {
      try
      {
        var entity = await _recoveryService.GetRecoveryAsync(int.Parse(User.Identity.Name), id);
        if (entity == null)
          return NotFound(new { message = "Recovery does not exist in the database." });

        _recoveryService.DeleteRecovery(entity);
        return Ok();
      }
      catch (Exception)
      {
        return StatusCode(500, "Internal server error.");
      }
    }
    #endregion

    #region Session
    [HttpGet("users/sessions/{id}")]
    public async Task<IActionResult> GetSession(int id)
    {
      try
      {
        var entity = await _sessionService.GetSessionAsync(int.Parse(User.Identity.Name), id);
        if (entity == null)
          return NotFound(new { message = "Session does not exist in the database." });

        var model = _mapper.Map<ViewSession>(entity);
        return Ok(model);
      }
      catch (Exception)
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpGet("users/sessions/current")]
    public async Task<IActionResult> GetCurrentSession()
    {
      try
      {
        var model = await _sessionService.GetCurrentSessionAsync(int.Parse(User.Identity.Name));
        return Ok(model);
      }
      catch (Exception)
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpGet("users/sessions")]
    public async Task<IActionResult> GetSessions()
    {
      try
      {
        return Ok(await _sessionService.GetSessionsAsync(int.Parse(User.Identity.Name)));
      }
      catch (Exception)
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpPost("users/sessions")]
    public async Task<IActionResult> CreateSession([FromBody] CreateSession model)
    {
      try
      {
        var entity = _mapper.Map<Session>(model);
        entity.UserId = int.Parse(User.Identity.Name);
        await _sessionService.CreateSession(entity);

        return Ok(entity);
      }
      catch (Exception)
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpPut("users/sessions/{id}")]
    public async Task<IActionResult> UpdateSession(int id, [FromBody] UpdateSession model)
    {
      try
      {
        var entity = await _sessionService.GetSessionAsync(int.Parse(User.Identity.Name), id);
        if (entity == null)
          return NotFound();

        if (entity.WorkoutEnd == null)
          entity.WorkoutEnd = DateTime.Now.ToString("MM/dd/yyyy H:mm");

        _mapper.Map(model, entity);
        _sessionService.UpdateSession(entity);

        return Ok();
      }
      catch (Exception)
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpDelete("users/sessions/{id}")]
    public async Task<IActionResult> DeleteSession(int id)
    {
      try
      {
        var model = await _sessionService.GetSessionAsync(int.Parse(User.Identity.Name), id);
        if (model == null)
          return NotFound();

        _sessionService.DeleteSession(model);

        return Ok();
      }
      catch (Exception)
      {
        return StatusCode(500, "Internal server error.");
      }
    }
    #endregion
  }
}
