using System;
using System.Text;
using NxtstpApi.Entities;
using System.Threading.Tasks;
using NxtstpApi.Helpers;
using System.Security.Cryptography;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace NxtstpApi.Services
{
  public class AuthenticatedUser
  {
    internal AuthenticatedUser(User user, string token)
    {
      this.UserId = user.UserId;
      this.FirstName = user.FirstName;
      this.LastName = user.LastName;
      this.Email = user.Email;
      this.UserName = user.UserName;
      this.Token = token;
    }
    public int UserId { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string UserName { get; set; }
    public string Email { get; set; }
    public string Token { get; set; }
  }

  public interface IUserService
  {
    Task<User> Register(User model);
    Task<AuthenticatedUser> Authenticate(User model, byte[] key);
    Task<User> FindAsync(int id);
    Task<User> Update(int id, User model);
    Task Delete(int id);
  }
  public class UserService : IUserService
  {
    private DataContext _context;
    public UserService(DataContext context)
    {
      _context = context;
    }

    public async Task<User> Register(User model)
    {
      if (string.IsNullOrWhiteSpace(model.FirstName) || string.IsNullOrWhiteSpace(model.LastName))
        throw new Exception("First name and last name is required.");

      if (string.IsNullOrWhiteSpace(model.UserName) || string.IsNullOrWhiteSpace(model.Password))
        throw new Exception("Username and password is required.");

      if (string.IsNullOrWhiteSpace(model.Email))
        throw new Exception("Email is required.");

      if (await _context.Users.AsAsyncEnumerable().AnyAsync(x => x.UserName == model.UserName))
        throw new Exception($"Username {model.UserName} is already taken.");
      byte[] passwordHash, passwordSalt;
      CreatePasswordHash(model.Password, out passwordHash, out passwordSalt);

      User entity = new User() { PasswordHash = passwordHash, PasswordSalt = passwordSalt, FirstName = model.FirstName, LastName = model.LastName, Email = model.Email, UserName = model.UserName };

      await _context.Users.AddAsync(entity);
      await _context.SaveChangesAsync();
      model.Password = null;
      return model;
    }

    public async Task<AuthenticatedUser> Authenticate(User model, byte[] key)
    {
      if (string.IsNullOrWhiteSpace(model.UserName) || string.IsNullOrWhiteSpace(model.Password))
        throw new Exception("Not a valid username or password.");

      var entity = await _context.Users.AsAsyncEnumerable().SingleOrDefaultAsync(x => x.UserName == model.UserName);
      if (entity == null)
        throw new Exception("User not found in the database.");

      if (!VerifyPasswordHash(model.Password, entity.PasswordHash, entity.PasswordSalt))
        throw new Exception("Email or password was incorrect.");

      var tokenHandler = new JwtSecurityTokenHandler();

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
      string JWToken = tokenHandler.WriteToken(token);

      return new AuthenticatedUser(model, JWToken);
    }

    public async Task<User> FindAsync(int id)
    {
      var entity = await _context.Users.FindAsync(id);
      if (entity == null)
        throw new Exception("User does not exist in database");

      return entity;
    }

    public async Task<User> Update(int id, User model)
    {
      var entity = await _context.Users.FindAsync(id);
      if (entity == null)
        throw new Exception("User does not exist in database");

      if (string.IsNullOrWhiteSpace(model.FirstName))
        throw new Exception("First name cannot be blank.");

      if (string.IsNullOrWhiteSpace(model.LastName))
        throw new Exception("Last name cannot be blank.");

      if (string.IsNullOrWhiteSpace(model.Password))
        throw new Exception("Password cannot be blank.");

      if (!string.IsNullOrWhiteSpace(model.UserName) && model.UserName != entity.UserName)
      {
        if (await _context.Users.AsAsyncEnumerable().AnyAsync(x => x.UserName == model.UserName))
        {
          throw new Exception("Username " + model.UserName + " is already taken.");
        }
      }

      byte[] passwordHash, passwordSalt;
      CreatePasswordHash(model.Password, out passwordHash, out passwordSalt);
      entity.PasswordHash = passwordHash;
      entity.PasswordSalt = passwordSalt;
      _context.Users.Update(entity);
      _context.SaveChanges();
      return entity;
    }

    public async Task Delete(int id)
    {
      var entity = await _context.Users.FindAsync(id);
      if (entity == null)
        throw new Exception("User does not exist in database");
      _context.Users.Remove(entity);
      _context.SaveChanges();
    }


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