using System.ComponentModel.DataAnnotations.Schema;
using System;

namespace NxtstpApi.Entities
{
  public class RecoveryDefinition
  {
    public long RecoveryDefinitionId { get; set; }
    [ForeignKey(nameof(Muscle))]
    public byte MuscleId { get; set; }
    public int RecoveryTimeInDays { get; set; }
    [ForeignKey(nameof(User))]
    public int UserId { get; set; }
    public DateTime DateCreated { get; set; }
  }
}