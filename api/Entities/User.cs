using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace BodyJournalAPI.Entities
{
  public class User
  {
    public int UserId { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string UserName { get; set; }
    public string Email { get; set; }
    [JsonIgnore]
    public string Password { get; set; }
    public byte[] PasswordHash { get; set; }
    public byte[] PasswordSalt { get; set; }
  }
}