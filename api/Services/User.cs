
using BodyJournalAPI.Entities;
using BodyJournalAPI.Helpers;
using System.Collections.Generic;
using System.Linq;
using System;
using System.Text;
using System.Security.Cryptography;
using BodyJournalAPI.Services;
using System.Threading.Tasks;
namespace BodyJournalAPI.Services
{
  public interface IUserService
  {
    User Authenticate(string username, string password);
    IEnumerable<User> GetAllUsers();
    User GetUserById(int id);
    User CreateUser(User user, string password);
    void UpdateUser(User user, string password = null);
    void DeleteUser(User user);
  }
  public class UserService : ServiceBase<User>,
  IUserService
  {
    public UserService(BodyJournalContext bodyJournalContext) : base(bodyJournalContext)
    {
    }
    public User GetUserById(int id)
    {
      return FindByCondition(x => x.Id == id).SingleOrDefault();
    }

    public IEnumerable<User> GetAllUsers()
    {
      return FindAll();
    }
    public User Authenticate(string username, string password)
    {
      if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
        return null;

      User user = FindByCondition(x => x.UserName == username).SingleOrDefault();

      if (user == null)
        return null;

      if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
        return null;

      return user;
    }
    public User CreateUser(User user, string password)
    {
      if (string.IsNullOrWhiteSpace(password))
        throw new Exception("Password is required");

      if (FindAll().Any(x => x.UserName == user.UserName))
        throw new Exception($"Username {user.UserName} is already taken");

      byte[] passwordHash, passwordSalt;
      CreatePasswordHash(password, out passwordHash, out passwordSalt);

      user.PasswordHash = passwordHash;
      user.PasswordSalt = passwordSalt;

      Create(user);

      return user;
    }

    public void UpdateUser(User user, string password = null)
    {
      var userToUpdate = GetUserById(user.Id);

      if (userToUpdate == null)
        throw new Exception("User not found");

      if (!string.IsNullOrWhiteSpace(user.UserName) && user.UserName != userToUpdate.UserName)
      {
        if (FindAll().Any(x => x.UserName == user.UserName))
          throw new Exception("Username " + user.UserName + " is already taken");

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

      UpdateUser(userToUpdate);
    }

    public void DeleteUser(User model)
    {
      Delete(model);
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