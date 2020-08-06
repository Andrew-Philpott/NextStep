using System;
using System.Text;
using System.Net.Mime;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;
using BodyJournalAPI.Entities;
using BodyJournalAPI.Models;
using BodyJournalAPI.Helpers;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;
using System.Security.Cryptography;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Linq;

namespace BodyJournalAPI.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class ApiController : ControllerBase
  {
    private DataContext _db;
    private readonly AppSettings _appSettings;
    public ApiController(DataContext db, IOptions<AppSettings> appSettings)
    {
      _db = db;
      _appSettings = appSettings.Value;
    }
    #region Users
    [AllowAnonymous]
    [HttpPost("users/authenticate")]
    public async Task<IActionResult> Authenticate([FromBody] AuthenticateUser model)
    {
      try
      {
        if (string.IsNullOrWhiteSpace(model.UserName) || string.IsNullOrWhiteSpace(model.Password))
          return BadRequest(new { message = "Not a valid username or password." });

        var entity = await _db.Users.AsAsyncEnumerable().SingleOrDefaultAsync(x => x.UserName == model.UserName);
        if (entity == null)
          return BadRequest("User not found in the database.");

        if (!VerifyPasswordHash(model.Password, entity.PasswordHash, entity.PasswordSalt))
          return BadRequest("Email or password was incorrect.");

        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
          Subject = new ClaimsIdentity(new Claim[]
          {
            new Claim(ClaimTypes.Name, entity.UserId.ToString())
          }),
          Expires = DateTime.UtcNow.AddDays(1),
          SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        var JWToken = tokenHandler.WriteToken(token);

        return Ok(new
        {
          UserId = entity.UserId,
          Username = entity.UserName,
          FirstName = entity.FirstName,
          LastName = entity.LastName,
          Token = JWToken
        });
      }
      catch
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [AllowAnonymous]
    [HttpPost("users/register")]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Register([FromBody] RegisterUser model)
    {
      try
      {
        if (string.IsNullOrWhiteSpace(model.FirstName))
          return BadRequest("FirstName is required.");

        if (string.IsNullOrWhiteSpace(model.LastName))
          return BadRequest("LastName is required.");

        if (string.IsNullOrWhiteSpace(model.UserName))
          return BadRequest("UserName is required.");

        if (string.IsNullOrWhiteSpace(model.Password))
          return BadRequest("Password is required.");

        if (string.IsNullOrWhiteSpace(model.Email))
          return BadRequest("Email is required.");

        if (await _db.Users.AsAsyncEnumerable().AnyAsync(x => x.UserName == model.UserName))
          return BadRequest($"Username {model.UserName} is already taken.");
        byte[] passwordHash, passwordSalt;
        CreatePasswordHash(model.Password, out passwordHash, out passwordSalt);

        User entity = new User() { PasswordHash = passwordHash, PasswordSalt = passwordSalt, FirstName = model.FirstName, LastName = model.LastName, Email = model.Email };

        await _db.Users.AddAsync(entity);
        await _db.SaveChangesAsync();
        return NoContent();
      }
      catch
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpGet("users/{id}")]
    public async Task<IActionResult> GetById(long? id)
    {
      if (id == null)
        return BadRequest(new { message = "Id cannot be null." });

      try
      {
        var entity = await _db.Users.FindAsync(id);
        if (entity == null)
          return BadRequest(new { message = "User does not exist in database" });

        return Ok(entity);
      }
      catch
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser(long? id, [FromBody] UpdateUser model)
    {
      if (id == null)
        return BadRequest(new { message = "Id cannot be null." });

      if (model == null)
        return BadRequest("User cannot be null.");

      if (string.IsNullOrWhiteSpace(model.FirstName))
        return BadRequest("First name cannot be blank.");

      if (string.IsNullOrWhiteSpace(model.LastName))
        return BadRequest("Last name cannot be blank.");

      if (string.IsNullOrWhiteSpace(model.Password))
        return BadRequest("Password cannot be blank.");

      try
      {
        User entity = await _db.Users.FindAsync(id);

        if (entity == null)
          return BadRequest("User not found in database.");

        if (!string.IsNullOrWhiteSpace(model.UserName) && model.UserName != entity.UserName)
        {
          if (await _db.Users.AsAsyncEnumerable().AnyAsync(x => x.UserName == model.UserName))
          {
            return BadRequest("Username " + model.UserName + " is already taken.");
          }
        }

        byte[] passwordHash, passwordSalt;
        CreatePasswordHash(model.Password, out passwordHash, out passwordSalt);
        entity.PasswordHash = passwordHash;
        entity.PasswordSalt = passwordSalt;


        _db.Users.Update(entity);
        _db.SaveChanges();
        return Ok(entity);
      }
      catch
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpDelete("users/{id}")]
    public async Task<IActionResult> Delete(long? id)
    {
      if (id == null)
        return BadRequest(new { message = "Id cannot be null." });

      try
      {
        var entity = await _db.Users.FindAsync(id);
        if (entity == null)
          return NotFound();

        _db.Users.Remove(entity);
        _db.SaveChanges();

        return Ok(entity);
      }
      catch
      {
        return StatusCode(500, "Internal server error.");
      }
    }
    #endregion


    #region exercises

    [AllowAnonymous]
    [HttpGet("exercises/{id}")]
    public async Task<IActionResult> Exercise(short? id)
    {
      if (id == null)
        return BadRequest(new { message = "Id cannot be null." });

      try
      {
        var entity = await _db.ExerciseTypes.AsQueryable().AsNoTracking().Include(x => x.Muscles).ThenInclude(muscle => muscle.Muscle).ThenInclude(x => x.ExerciseTypes).SingleOrDefaultAsync(x => x.ExerciseTypeId == id);

        if (entity == null)
          return NotFound();

        return Ok(entity);
      }
      catch
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
        var entities = await _db.ExerciseTypes.AsQueryable().AsNoTracking().Include(x => x.Muscles).ThenInclude(z => z.Muscle).OrderByDescending(x => x.Name).ToArrayAsync();
        return Ok(entities);
      }
      catch
      {
        return StatusCode(500, "Internal server error.");
      }
    }
    #endregion

    #region exerciseTypes
    [HttpGet("users/exercises/{id}")]
    public async Task<IActionResult> GetExercise(long? id)
    {
      if (id == null)
        return BadRequest(new { message = "Id cannot be null." });

      var currentUserId = int.Parse(User.Identity.Name);
      try
      {
        var entity = await _db.Exercises.AsAsyncEnumerable().SingleOrDefaultAsync(x => x.UserId == currentUserId && x.ExerciseId == id);

        if (entity == null)
          return NotFound(new { message = "Exercise does not exist." });

        return Ok(entity);
      }
      catch
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpGet("users/exercises")]
    public async Task<IActionResult> GetExercises()
    {
      var currentUserId = int.Parse(User.Identity.Name);
      try
      {
        var entities = await _db.Exercises.AsAsyncEnumerable().Where(x => x.UserId == currentUserId).ToArrayAsync();

        return Ok(entities);
      }
      catch
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpDelete("users/exercises/{id}")]
    public async Task<IActionResult> DeleteExercise(long? id)
    {
      if (id == null)
        return BadRequest(new { message = "Id cannot be null." });

      var currentUserId = int.Parse(User.Identity.Name);
      try
      {
        var entity = await _db.Exercises.AsAsyncEnumerable().SingleOrDefaultAsync(x => x.UserId == currentUserId && x.ExerciseId == id);
        if (entity == null)
          return NotFound(new { message = "Exercise does not exist." });

        _db.Exercises.Remove(entity);
        _db.SaveChanges();
        return Ok(entity);
      }
      catch
      {
        return StatusCode(500, "Internal server error.");
      }
    }
    #endregion

    [HttpGet("users/records")]
    public async Task<IActionResult> GetRecords()
    {
      var currentUserId = int.Parse(User.Identity.Name);
      try
      {
        var entities = await _db.Records.AsAsyncEnumerable().Where(x => x.UserId == currentUserId).ToArrayAsync();

        return Ok(entities);
      }
      catch
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpGet("users/records/{id}")]
    public async Task<IActionResult> GetRecord(short? id)
    {
      if (id == null)
        return BadRequest(new { message = "Id cannot be null." });

      var currentUserId = int.Parse(User.Identity.Name);
      try
      {
        var entity = await _db.Records.AsAsyncEnumerable().SingleOrDefaultAsync(x => x.UserId == currentUserId && x.RecordId == id);
        if (entity == null)
          return NotFound(new { message = "Record does not exist." });

        return Ok(entity);
      }
      catch
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpGet("users/records/exercises/pr")]
    public async Task<IActionResult> GetPRsForExercises()
    {
      var currentUserId = int.Parse(User.Identity.Name);
      try
      {
        var records = await _db.Records.AsAsyncEnumerable().ToListAsync();
        var entities = records.GroupBy(x => x.ExerciseTypeId, (key, g) => g.OrderByDescending(x => x.Weight).FirstOrDefault());
        return Ok(entities);
      }
      catch
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpPost("users/records")]
    public async Task<IActionResult> CreateRecord([FromBody] Record model)
    {
      if (model == null)
        return BadRequest(new { message = "Model cannot be null." });

      string time = DateTime.Now.ToString("MM/dd/yyyy H:mm");

      var currentUserId = int.Parse(User.Identity.Name);
      try
      {
        var exercise = await _db.ExerciseTypes.FindAsync(model.ExerciseTypeId); ;
        if (exercise == null)
          return NotFound(new { message = "Exercise does not exist." });

        Record entity = new Record() { Weight = model.Weight, Reps = model.Reps, Sets = model.Sets, ExerciseTypeId = exercise.ExerciseTypeId, Time = time, UserId = currentUserId };
        await _db.Records.AddAsync(entity);
        await _db.SaveChangesAsync();
        return Ok(entity);
      }
      catch
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpDelete("users/records/{id}")]
    public async Task<IActionResult> DeleteRecord(short? id)
    {
      if (id == null)
        return BadRequest(new { message = "Id cannot be null." });

      var currentUserId = int.Parse(User.Identity.Name);
      try
      {
        var entity = await _db.Records.AsAsyncEnumerable().SingleOrDefaultAsync(x => x.UserId == currentUserId && x.RecordId == id);
        if (entity == null)
          return NotFound(new { message = "Record not in database" });

        _db.Records.Remove(entity);
        _db.SaveChanges();
        return Ok(entity);
      }
      catch
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    #region Workouts
    [HttpGet("users/workouts/{id}")]
    public async Task<IActionResult> GetWorkout(long? id)
    {
      if (id == null)
        return BadRequest(new { message = "Id cannot be null." });

      var currentUserId = int.Parse(User.Identity.Name);
      try
      {
        var entity = await _db.Workouts.Include(x => x.Exercises).SingleOrDefaultAsync(x => x.UserId == currentUserId && x.WorkoutId == id);
        return Ok(entity);
      }
      catch
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpGet("users/workouts")]
    public async Task<IActionResult> GetWorkouts()
    {
      var currentUserId = int.Parse(User.Identity.Name);
      try
      {
        var entities = await _db.Workouts.Include(x => x.Exercises).ThenInclude(x => x.ExerciseType).ThenInclude(x => x.Muscles).ThenInclude(x => x.Muscle).Where(x => x.UserId == currentUserId).ToArrayAsync();

        return Ok(entities);
      }
      catch
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpPost("users/workouts")]
    public async Task<IActionResult> CreateWorkout([FromBody] Workout model)
    {
      if (model == null)
        return BadRequest(new { message = "Model cannot be null." });

      var currentUserId = int.Parse(User.Identity.Name);
      try
      {
        Workout workoutEntity = new Workout() { UserId = currentUserId, Notes = model.Notes, Name = model.Name };
        List<Exercise> exerciseList = new List<Exercise>();
        foreach (Exercise item in model.Exercises)
        {
          exerciseList.Add(new Exercise()
          {
            UserId = currentUserId,
            WorkoutId = workoutEntity.WorkoutId,
            Weight = item.Weight,
            Reps = item.Reps,
            Sets = item.Sets,
            ExerciseTypeId = item.ExerciseTypeId
          });
        }
        workoutEntity.Exercises = exerciseList;
        await _db.Workouts.AddAsync(workoutEntity);
        await _db.SaveChangesAsync();
        return Ok(workoutEntity);
      }
      catch
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpPut("users/workouts/{id}")]
    public async Task<IActionResult> UpdateWorkout(long? id, [FromBody] Workout model)
    {
      if (id == null)
        return BadRequest(new { message = "Id cannot be null." });

      if (model == null)
        return BadRequest(new { message = "Workout cannot be null." });

      if (model.Exercises == null)
        return BadRequest(new { message = "Exercises cannot be null." });

      if (model.Exercises.Count() < 1)
        return BadRequest(new { message = "Workout must include at least 1 exercise." });

      StringBuilder response = new StringBuilder();

      if (string.IsNullOrWhiteSpace(model.Name))
        response.Append("Workout: Name cannot be null or empty.");

      var currentUserId = int.Parse(User.Identity.Name);

      try
      {
        Workout workoutEntity = await _db.Workouts.Include(x => x.Exercises).SingleOrDefaultAsync(x => x.UserId == currentUserId && x.WorkoutId == id);

        if (workoutEntity == null) return BadRequest(new { message = "Workout could not be found." });

        workoutEntity.Name = model.Name;
        workoutEntity.Notes = model.Notes;

        List<Exercise> remove = new List<Exercise>();
        foreach (Exercise exerciseEntity in workoutEntity.Exercises)
        {
          var exerciseMatch = model.Exercises.SingleOrDefault(x => x.ExerciseId == exerciseEntity.ExerciseId);
          if (exerciseMatch == null)
          {
            _db.Exercises.Remove(exerciseEntity);
          }
          else
          {
            exerciseEntity.Reps = exerciseMatch.Reps;
            exerciseEntity.Sets = exerciseMatch.Sets;
            exerciseEntity.UserId = exerciseMatch.UserId;
            exerciseEntity.ExerciseId = exerciseMatch.ExerciseId;
            exerciseEntity.Weight = exerciseMatch.Weight;
            _db.Exercises.Update(exerciseEntity);
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
            return BadRequest(new { message = exerciseSb.Insert(0, exerciseString).ToString() });
          }
          exercise.WorkoutId = workoutEntity.WorkoutId;
          exercise.UserId = currentUserId;
          if (exercise.ExerciseId == 0)
          {
            await _db.Exercises.AddAsync(exercise);
          }
        }
        await _db.SaveChangesAsync();
        return Ok();
      }
      catch
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpDelete("users/workouts/{id}")]
    public async Task<IActionResult> DeleteWorkout(long? id)
    {
      if (id == null)
        return BadRequest(new { message = "id cannot be null." });

      var currentUserId = int.Parse(User.Identity.Name);
      try
      {
        var entity = await _db.Workouts.Include(x => x.Exercises).SingleOrDefaultAsync(x => x.UserId == currentUserId && x.WorkoutId == id);
        if (entity == null)
          return NotFound(new { message = "Workout does not exist in the database" });

        foreach (Exercise exercise in entity.Exercises)
        {
          _db.Exercises.Remove(exercise);
        }
        _db.Workouts.Remove(entity);
        _db.SaveChanges();
        return Ok(entity);
      }
      catch
      {
        return StatusCode(500, "Internal server error.");
      }
    }
    #endregion

    #region Recovery
    [HttpGet("users/recoveries/{id}")]
    public async Task<IActionResult> GetRecovery(long? id)
    {
      if (id == null)
        return BadRequest(new { message = "id cannot be null." });
      var currentUserId = int.Parse(User.Identity.Name);
      try
      {
        var entity = await _db.Recovery.AsAsyncEnumerable().SingleOrDefaultAsync(x => x.UserId == currentUserId && x.RecoveryId == id);
        if (entity == null)
          return NotFound(new { message = "Recovery does not exist in the database" });

        return Ok(entity);
      }
      catch
      {
        return StatusCode(500, "Internal server error.");
      }
    }
    [HttpGet("users/recoveries")]
    public async Task<IActionResult> GetRecoveries()
    {
      var currentUserId = int.Parse(User.Identity.Name);
      try
      {
        var recoveries = await _db.Recovery.AsAsyncEnumerable().Where(x => x.UserId == currentUserId).ToListAsync();
        var entities = recoveries.GroupBy(x => x.MuscleId, (key, g) => g.OrderByDescending(x => x.Time).FirstOrDefault()).ToArray();

        return Ok(entities);
      }
      catch
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpPost("users/recoveries")]
    public async Task<IActionResult> CreateRecovery([FromBody] Recovery model)
    {
      if (model == null)
        return BadRequest(new { message = "Recovery cannot be null." });
      var currentUserId = int.Parse(User.Identity.Name);
      try
      {
        Recovery entity = new Recovery() { Fatigue = model.Fatigue, MuscleId = model.MuscleId, UserId = currentUserId, Time = DateTime.Now.ToString("MM/dd/yyyy H:mm") };

        await _db.Recovery.AddAsync(entity);
        await _db.SaveChangesAsync();
        return Ok(entity);
      }
      catch
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpPut("users/recoveries/{id}")]
    public async Task<IActionResult> UpdateRecovery(long? id, [FromBody] Recovery model)
    {
      if (id == null)
        return BadRequest(new { message = "id cannot be null." });

      var currentUserId = int.Parse(User.Identity.Name);
      try
      {
        var entity = await _db.Recovery.AsAsyncEnumerable().SingleOrDefaultAsync(x => x.UserId == currentUserId && x.RecoveryId == id);
        if (entity == null)
          return NotFound(new { message = "Recovery does not exist in the database" });

        entity.Fatigue = model.Fatigue;
        entity.MuscleId = model.MuscleId;
        _db.Recovery.Update(entity);
        _db.SaveChanges();
        return Ok(entity);
      }
      catch
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpDelete("users/recoveries/{id}")]
    public async Task<IActionResult> DeleteRecovery(long? id)
    {
      if (id == null)
        return BadRequest(new { message = "id cannot be null." });

      var currentUserId = int.Parse(User.Identity.Name);
      try
      {
        var entity = await _db.Recovery.AsAsyncEnumerable().SingleOrDefaultAsync(x => x.UserId == currentUserId && x.RecoveryId == id);
        if (entity == null)
          return NotFound(new { message = "Recovery does not exist in the database." });

        _db.Recovery.Remove(entity);
        _db.SaveChanges();
        return Ok(entity);
      }
      catch
      {
        return StatusCode(500, "Internal server error.");
      }
    }
    #endregion

    #region Session
    [HttpGet("users/sessions/{id}")]
    public async Task<IActionResult> GetSession(long? id)
    {
      if (id == null)
        return BadRequest(new { message = "id cannot be null." });

      var currentUserId = int.Parse(User.Identity.Name);
      try
      {
        var entity = await _db.Sessions.AsAsyncEnumerable().SingleOrDefaultAsync(x => x.UserId == currentUserId && x.SessionId == id);
        if (entity == null)
          return NotFound(new { message = "Session does not exist in the database." });

        return Ok(entity);
      }
      catch
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpGet("users/sessions/current")]
    public async Task<IActionResult> GetCurrentSession()
    {
      var currentUserId = int.Parse(User.Identity.Name);
      try
      {
        var entity = await _db.Sessions.AsAsyncEnumerable().SingleOrDefaultAsync(x => x.UserId == currentUserId && x.WorkoutEnd == null);
        return Ok(entity);
      }
      catch
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpGet("users/sessions")]
    public async Task<IActionResult> GetSessions()
    {
      var currentUserId = int.Parse(User.Identity.Name);
      try
      {
        return Ok(await _db.Sessions.AsAsyncEnumerable().Where(x => x.UserId == currentUserId).ToArrayAsync());
      }
      catch
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpPost("users/sessions")]
    public async Task<IActionResult> CreateSession([FromBody] Session model)
    {
      if (model == null)
        return BadRequest(new { message = "Model cannot be null." });

      var currentUserId = int.Parse(User.Identity.Name);
      try
      {
        Session entity = new Session() { UserId = currentUserId, WorkoutId = model.WorkoutId };

        await _db.Sessions.AddAsync(entity);
        await _db.SaveChangesAsync();
        return Ok(entity);
      }
      catch
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpPut("users/sessions/{id}")]
    public async Task<IActionResult> UpdateSession(long? id, [FromBody] Session model)
    {
      if (id == null)
        return BadRequest(new { message = "id cannot be null." });

      if (model == null)
        return BadRequest(new { message = "Model cannot be null." });

      var currentUserId = int.Parse(User.Identity.Name);
      try
      {
        var entity = await _db.Sessions.AsAsyncEnumerable().SingleOrDefaultAsync(x => x.UserId == currentUserId && x.SessionId == id);
        if (entity == null)
          return NotFound();

        if (entity.WorkoutEnd == null)
          entity.WorkoutEnd = DateTime.Now.ToString("MM/dd/yyyy H:mm");

        entity.Rating = model.Rating;
        _db.Sessions.Update(entity);
        _db.SaveChanges();
        return Ok();
      }
      catch
      {
        return StatusCode(500, "Internal server error.");
      }
    }

    [HttpDelete("users/sessions/{id}")]
    public async Task<IActionResult> DeleteSession(long? id)
    {


      var currentUserId = int.Parse(User.Identity.Name);
      try
      {
        var entity = await _db.Sessions.AsAsyncEnumerable().SingleOrDefaultAsync(x => x.UserId == currentUserId && x.SessionId == id);
        if (entity == null)
          return NotFound();

        _db.Sessions.Remove(entity);
        _db.SaveChanges();
        return Ok(entity);
      }
      catch
      {
        return StatusCode(500, "Internal server error.");
      }
    }
    #endregion


    private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
    {
      if (password == null) throw new ArgumentNullException("password");
      if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or only whitespace.", "password");

      using (var hmac = new HMACSHA512())
      {
        passwordSalt = hmac.Key;
        passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
      }
    }

    private static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
    {
      if (password == null) throw new ArgumentNullException("password");
      if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");
      if (storedHash.Length != 64) throw new ArgumentException("Invalid length of password hash (64 bytes expected).", "passwordHash");
      if (storedSalt.Length != 128) throw new ArgumentException("Invalid length of password salt (128 bytes expected).", "passwordHash");

      using (var hmac = new HMACSHA512(storedSalt))
      {
        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
        for (int i = 0; i < computedHash.Length; i++)
        {
          if (computedHash[i] != storedHash[i]) return false;
        }
      }
      return true;
    }
  }
}
