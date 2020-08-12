using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;

namespace NxtstpApi.Entities
{
  public class Recovery
  {
    [Required]
    public long RecoveryId { get; set; }
    [Required]
    public byte Fatigue { get; set; }
    public DateTime DateCreated { get; set; }
    [Required]
    [ForeignKey(nameof(User))]
    public int UserId { get; set; }
    [Required]
    [ForeignKey(nameof(Muscle))]
    public byte MuscleId { get; set; }
  }
}