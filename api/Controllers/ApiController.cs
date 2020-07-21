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
    private IServiceWrapper _db;
    private IMapper _mapper;
    private readonly AppSettings _appSettings;
    public ApiController(IServiceWrapper db, IMapper mapper, IOptions<AppSettings> appSettings)
    {
      _mapper = mapper;
      _db = db;
      _appSettings = appSettings.Value;
    }
    #region Users
    [AllowAnonymous]
    [HttpPost("users/authenticate")]
    public IActionResult Authenticate([FromBody] AuthenticateUser model)
    {
      var user = _db.User.Authenticate(model.UserName, model.Password);
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
        Expires = DateTime.UtcNow.AddDays(7),
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

    [AllowAnonymous]
    [HttpPost("users/register")]
    public async Task<IActionResult> Register([FromBody] RegisterUser model)
    {
      var user = _mapper.Map<User>(model);
      try
      {
        _db.User.CreateUser(user, model.Password);
        await _db.SaveAsync();
        return Ok();
      }
      catch (Exception ex)
      {
        return BadRequest(new { message = ex.Message });
      }
    }

    [HttpGet("users/{id}")]
    public IActionResult GetById(int id)
    {
      var user = _db.User.GetUserById(id);
      var model = _mapper.Map<ViewUser>(user);
      return Ok(model);
    }

    [HttpPut("users/{id}")]
    public IActionResult Update(int id, [FromBody] UpdateUser model)
    {
      var user = _mapper.Map<User>(model);
      user.Id = id;

      try
      {
        _db.User.UpdateUser(user, model.Password);
        return Ok();
      }
      catch (Exception ex)
      {
        return BadRequest(new { message = ex.Message });
      }
    }

    [HttpDelete("users/{id}")]
    public async Task<IActionResult> Delete(int id)
    {
      var entity = _db.User.GetUserById(id);
      if (entity == null)
        return BadRequest(new { message = "User not in database" });
      _db.User.DeleteUser(entity);
      await _db.SaveAsync();
      return Ok();
    }
    #endregion


    #region exercises

    [AllowAnonymous]
    [HttpGet("exercises/{id}")]
    public async Task<IActionResult> Exercise(int id)
    {
      var model = await _db.Exercise.GetExerciseAsync(id);
      return Ok(model);
    }
    [AllowAnonymous]
    [HttpGet("exercises")]
    public async Task<IActionResult> Exercises()
    {
      var model = await _db.Exercise.GetExercisesAsync();
      return Ok(model);
    }
    #endregion

    #region userexercises
    [HttpGet("users/exercises/{id}")]
    public async Task<IActionResult> GetExercise(int id)
    {
      var currentUserId = int.Parse(User.Identity.Name);
      var entity = await _db.UserExercise.GetExerciseAsync(currentUserId, id);
      var model = _mapper.Map<UserExercise>(entity);
      return Ok(model);
    }

    [HttpGet("users/exercises")]
    public async Task<IActionResult> GetExercises()
    {
      var currentUserId = int.Parse(User.Identity.Name);
      var entities = await _db.UserExercise.GetExercisesAsync(currentUserId);
      var model = _mapper.Map<IEnumerable<UserExercise>>(entities);
      return Ok(model);
    }

    [HttpPost("users/exercises")]
    public async Task<IActionResult> CreateExercise([FromBody] CreateExercise model)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(new { message = "Invalid model" });
      }
      var exercise = await _db.Exercise.GetExerciseAsync(model.ExerciseId);
      if (exercise == null)
        return BadRequest(new { message = "Exercise does not exist in database" });
      var currentUserId = int.Parse(User.Identity.Name);
      UserExercise entity = _mapper.Map<UserExercise>(model);
      entity.Name = exercise.Name;
      entity.UserId = currentUserId;
      _db.UserExercise.CreateExercise(entity);
      await _db.SaveAsync();
      ExerciseWorkout exerciseWorkout = new ExerciseWorkout() { WorkoutId = model.WorkoutId, ExerciseId = entity.Id };
      _db.ExerciseWorkout.Create(exerciseWorkout);
      await _db.SaveAsync();
      return Ok();
    }

    [HttpPut("users/exercises/{id}")]
    public async Task<IActionResult> UpdateExercise(int id, [FromBody] UpdateExercise model)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(new { message = "Invalid model" });
      }
      var currentUserId = int.Parse(User.Identity.Name);

      var entity = await _db.UserExercise.GetExerciseAsync(currentUserId, id);
      if (entity == null)
        return BadRequest(new { message = "Exercise not in database for user" });
      var exercise = await _db.Exercise.GetExerciseAsync(model.ExerciseId);
      if (exercise == null)
        return BadRequest(new { message = "Exercise type does not exist in database" });

      _mapper.Map(model, entity);
      entity.Name = exercise.Name;
      _db.UserExercise.UpdateExercise(entity);
      await _db.SaveAsync();
      return Ok();
    }

    [HttpDelete("users/exercises/{id}")]
    public async Task<IActionResult> DeleteExercise(int id)
    {
      var currentUserId = int.Parse(User.Identity.Name);
      var model = await _db.UserExercise.GetExerciseAsync(currentUserId, id);
      if (model == null)
        return BadRequest(new { message = "Exercise not in database" });
      _db.UserExercise.DeleteExercise(model);
      await _db.SaveAsync();
      return Ok();
    }
    #endregion

    [HttpGet("users/records")]
    public async Task<IActionResult> GetRecords()
    {
      var currentUserId = int.Parse(User.Identity.Name);
      var entities = await _db.Record.GetRecordsAsync(currentUserId);
      var model = _mapper.Map<IEnumerable<ViewRecord>>(entities);
      return Ok(model);
    }

    [HttpGet("users/records/{id}")]
    public async Task<IActionResult> GetRecord(int id)
    {
      var currentUserId = int.Parse(User.Identity.Name);
      var entities = await _db.Record.GetRecordAsync(currentUserId, id);
      var model = _mapper.Map<ViewRecord>(entities);
      return Ok(model);
    }

    [HttpGet("users/records/exercises/{id}")]
    public async Task<IActionResult> GetRecordsByExercise(int id)
    {
      var currentUserId = int.Parse(User.Identity.Name);
      var exercise = await _db.Exercise.GetExerciseAsync(id);
      var entities = await _db.Record.GetRecordsByExerciseAsync(currentUserId, id);

      var model = _mapper.Map<IEnumerable<ViewRecord>>(entities);
      return Ok(model);
    }

    [HttpPost("users/records")]
    public async Task<IActionResult> CreateRecord([FromBody] CreateRecord model)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(new { message = "Invalid model" });
      }
      var exercise = await _db.Exercise.GetExerciseAsync(model.ExerciseId);
      if (exercise == null)
        return BadRequest(new { message = "Exercise does not exist in database" });
      var currentUserId = int.Parse(User.Identity.Name);
      Record entity = _mapper.Map<Record>(model);
      entity.UserId = currentUserId;
      _db.Record.CreateRecord(entity);
      await _db.SaveAsync();
      return Ok();
    }

    [HttpDelete("users/records/{id}")]
    public async Task<IActionResult> DeleteRecord(int id)
    {
      var currentUserId = int.Parse(User.Identity.Name);
      var model = await _db.Record.GetRecordAsync(currentUserId, id);
      if (model == null)
        return BadRequest(new { message = "Record not in database" });
      _db.Record.DeleteRecord(model);
      await _db.SaveAsync();
      return Ok();
    }

    #region Workouts
    [HttpGet("users/workouts/{id}")]
    public async Task<IActionResult> GetWorkout(int id)
    {
      var currentUserId = int.Parse(User.Identity.Name);
      ViewWorkout model = _mapper.Map<ViewWorkout>(await _db.Workout.GetWorkoutAsync(currentUserId, id));

      IEnumerable<ExerciseWorkout> exerciseWorkouts = await _db.ExerciseWorkout.GetExerciseWorkoutsAsync(id);

      IEnumerable<UserExercise> exercises = await _db.UserExercise.GetExercisesAsync(currentUserId);

      IEnumerable<UserExercise> e = from ex in exercises join ew in exerciseWorkouts on ex.Id equals ew.ExerciseId select ex;

      model.Exercises = _mapper.Map<IEnumerable<ViewExercise>>(e);
      return Ok(model);
    }

    [HttpGet("users/workouts")]
    public async Task<IActionResult> GetWorkouts()
    {
      var currentUserId = int.Parse(User.Identity.Name);
      var model = await _db.Workout.GetWorkoutsAsync(currentUserId);
      return Ok(model);
    }

    [HttpPost("users/workouts")]
    public async Task<IActionResult> CreateWorkout([FromBody] CreateWorkout model)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(new { message = "Invalid model" });
      }
      var currentUserId = int.Parse(User.Identity.Name);
      Workout entity = _mapper.Map<Workout>(model);
      entity.UserId = currentUserId;
      _db.Workout.CreateWorkout(entity);
      await _db.SaveAsync();
      foreach (CreateExercise item in model.Exercises)
      {
        item.WorkoutId = entity.Id;
        await CreateExercise(item);
      }

      return Ok();
    }

    [HttpPut("users/workouts/{id}")]
    public async Task<IActionResult> UpdateWorkout(int id, [FromBody] UpdateWorkout model)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(new { message = "Invalid model" });
      }
      var currentUserId = int.Parse(User.Identity.Name);
      var entity = await _db.Workout.GetWorkoutAsync(currentUserId, id);
      if (entity == null)
        return BadRequest(new { message = "Workout does not exist in the database" });
      _mapper.Map(model, entity);
      _db.Workout.UpdateWorkout(entity);

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

    [HttpDelete("users/workouts/{id}")]
    public async Task<IActionResult> DeleteWorkout(int id)
    {
      var currentUserId = int.Parse(User.Identity.Name);
      var model = await _db.Workout.GetWorkoutAsync(currentUserId, id);
      if (model == null)
        return BadRequest(new { message = "Workout does not exist in the database" });
      _db.Workout.DeleteWorkout(model);
      await _db.SaveAsync();
      return Ok();
    }

    [HttpDelete("users/workouts/{id}/exercises/{eid}")]
    public async Task<IActionResult> DeleteExerciseFromWorkout(int id, int eid)
    {
      var currentUserId = int.Parse(User.Identity.Name);
      var model = await _db.ExerciseWorkout.GetExerciseWorkoutAsync(id, eid);
      if (model == null)
        return BadRequest(new { message = "Association does not exist in the database" });
      _db.ExerciseWorkout.Delete(model);
      await _db.SaveAsync();
      return Ok();
    }
    #endregion

    #region Recovery
    [HttpGet("users/recoveries/{id}")]
    public async Task<IActionResult> GetRecovery(int id)
    {
      var currentUserId = int.Parse(User.Identity.Name);
      var entity = await _db.Recovery.GetRecoveryAsync(currentUserId, id);
      if (entity == null)
        return BadRequest(new { message = "Recovery does not exist in the database" });
      var model = _mapper.Map<ViewRecovery>(entity);

      return Ok(model);
    }
    [HttpGet("users/recoveries")]
    public async Task<IActionResult> GetRecoveries()
    {
      var currentUserId = int.Parse(User.Identity.Name);
      var entities = await _db.Recovery.GetRecoveriesAsync(currentUserId);
      var model = _mapper.Map<IEnumerable<ViewRecovery>>(entities);

      return Ok(model);
    }

    // [HttpGet("users/recoveries/current")]
    // public async Task<IActionResult> GetCurrentRecoveries()
    // {
    //   var currentUserId = int.Parse(User.Identity.Name);
    //   var entities = await _db.Recovery.GetCurrentRecoveriesAsync(currentUserId);

    //   var model = _mapper.Map<IEnumerable<ViewRecovery>>(entities);
    //   return Ok(model);
    // }

    [HttpPost("users/recoveries")]
    public async Task<IActionResult> CreateRecovery([FromBody] CreateRecovery model)
    {
      var currentUserId = int.Parse(User.Identity.Name);
      var entity = _mapper.Map<Recovery>(model);
      entity.UserId = currentUserId;
      _db.Recovery.CreateRecovery(entity);
      await _db.SaveAsync();
      return Ok(entity);
    }

    [HttpPut("users/recoveries/{id}")]
    public async Task<IActionResult> UpdateRecovery(int id, [FromBody] UpdateRecovery model)
    {
      var currentUserId = int.Parse(User.Identity.Name);
      var entity = await _db.Recovery.GetRecoveryAsync(currentUserId, id);
      if (entity == null)
        return BadRequest(new { message = "Recovery does not exist in the database" });
      _mapper.Map(model, entity);
      _db.Recovery.UpdateRecovery(entity);
      await _db.SaveAsync();
      var updatedRecovery = await _db.Recovery.GetRecoveryAsync(currentUserId, id);
      return Ok(updatedRecovery);
    }

    [HttpDelete("users/recoveries/{id}")]
    public async Task<IActionResult> DeleteRecovery(int id)
    {
      var currentUserId = int.Parse(User.Identity.Name);
      var entity = await _db.Recovery.GetRecoveryAsync(currentUserId, id);
      if (entity == null)
        return BadRequest(new { message = "Recovery does not exist in the database" });

      _db.Recovery.DeleteRecovery(entity);
      await _db.SaveAsync();
      return Ok();
    }
    #endregion

    #region Session
    [HttpGet("users/sessions/{id}")]
    public async Task<IActionResult> GetSession(int id)
    {
      var currentUserId = int.Parse(User.Identity.Name);
      var entity = await _db.Session.GetSessionAsync(currentUserId, id);
      if (entity == null)
        return BadRequest(new { message = "Session does not exist in the database" });
      var model = _mapper.Map<ViewSession>(entity);
      return Ok(model);
    }

    [HttpGet("users/sessions/current")]
    public async Task<IActionResult> GetCurrentSession()
    {
      var currentUserId = int.Parse(User.Identity.Name);
      var model = await _db.Session.GetCurrentSessionAsync(currentUserId);
      return Ok(model);
    }

    [HttpGet("users/sessions")]
    public async Task<IActionResult> GetSessions()
    {
      var currentUserId = int.Parse(User.Identity.Name);
      var entities = await _db.Session.GetSessionsAsync(currentUserId);
      return Ok(entities);
    }

    [HttpPost("users/sessions")]
    public async Task<IActionResult> CreateSession([FromBody] CreateSession model)
    {
      var currentUserId = int.Parse(User.Identity.Name);
      var entity = _mapper.Map<Session>(model);
      entity.UserId = currentUserId;
      _db.Session.CreateSession(entity);
      await _db.SaveAsync();
      return Ok(entity);
    }

    [HttpPut("users/sessions/{id}")]
    public async Task<IActionResult> UpdateSession(int id, [FromBody] UpdateSession model)
    {
      var currentUserId = int.Parse(User.Identity.Name);
      var entity = await _db.Session.GetSessionAsync(currentUserId, id);
      if (entity == null)
        return BadRequest(new { message = "Session does not exist in the database" });

      if (entity.WorkoutEnd == null)
        entity.WorkoutEnd = DateTime.Now.ToString("MM/dd/yyyy H:mm");

      _mapper.Map(model, entity);
      _db.Session.UpdateSession(entity);
      await _db.SaveAsync();
      return Ok();
    }

    [HttpDelete("users/sessions/{id}")]
    public async Task<IActionResult> DeleteSession(int id)
    {
      var currentUserId = int.Parse(User.Identity.Name);
      var model = await _db.Session.GetSessionAsync(currentUserId, id);
      if (model == null)
        return BadRequest(new { message = "Session does not exist in the database" });
      _db.Session.DeleteSession(model);
      await _db.SaveAsync();
      return Ok();
    }
    #endregion
  }
}
