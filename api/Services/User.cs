
using BodyJournalAPI.Entities;
using BodyJournalAPI.Helpers;
using System.Collections.Generic;
using System.Linq;
using System;
using System.Text;
using System.Security.Cryptography;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace BodyJournalAPI.Services
{
  public interface IUserService
  {
    Task<User> Authenticate(string username, string password);
    Task<IEnumerable<User>> GetAllUsers();
    Task<User> GetUserById(int id);
    Task CreateUser(User user, string password);
    Task UpdateUser(User user, string password = null);
    void DeleteUser(User user);
  }
  public class UserService :
  IUserService
  {
    private DataContext _context;
    public UserService(DataContext context)
    {
      _context = context;
    }
    public async Task<User> GetUserById(int id)
    {
      return await _context.Users.FindAsync(id);
    }

    public async Task<IEnumerable<User>> GetAllUsers()
    {
      return await _context.Users.ToListAsync();
    }
    public async Task<User> Authenticate(string username, string password)
    {
      if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
        return null;

      User user = await _context.Users.Where(x => x.UserName == username).SingleOrDefaultAsync();

      if (user == null)
        return null;

      if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
        return null;

      return user;
    }
    public async Task CreateUser(User user, string password)
    {
      if (string.IsNullOrWhiteSpace(password))
        throw new Exception("Password is required");

      var result = await _context.Users.Where(x => x.UserName == user.UserName).SingleOrDefaultAsync();
      if (result != null)
        throw new Exception($"Username {user.UserName} is already taken");

      byte[] passwordHash, passwordSalt;
      CreatePasswordHash(password, out passwordHash, out passwordSalt);

      user.PasswordHash = passwordHash;
      user.PasswordSalt = passwordSalt;

      await _context.Users.AddAsync(user);
      await _context.SaveChangesAsync();
    }

    public async Task UpdateUser(User user, string password = null)
    {
      var userToUpdate = await GetUserById(user.Id);

      if (userToUpdate == null)
        throw new Exception("User not found");

      if (!string.IsNullOrWhiteSpace(user.UserName) && user.UserName != userToUpdate.UserName)
      {
        var result = await _context.Users.Where(x => x.UserName == user.UserName).SingleOrDefaultAsync();
        if (result != null)
          throw new Exception($"Username {user.UserName} is already taken");

        userToUpdate.UserName = user.UserName;
      }

      if (!string.IsNullOrWhiteSpace(user.FirstName))
        userToUpdate.FirstName = user.FirstName;

      if (!string.IsNullOrWhiteSpace(user.LastName))
        userToUpdate.LastName = user.LastName;

      if (!string.IsNullOrWhiteSpace(password))
      {
        byte[] passwordHash, passwordSalt;
        CreatePasswordHash(password, out passwordHash, out passwordSalt);
        user.PasswordHash = passwordHash;
        user.PasswordSalt = passwordSalt;
      }

      _context.Users.Update(userToUpdate);
      _context.SaveChanges();
    }

    public void DeleteUser(User model)
    {
      _context.Users.Remove(model);
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