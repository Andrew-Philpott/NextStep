using Microsoft.EntityFrameworkCore;
using BodyJournalAPI.Entities;
using Microsoft.Extensions.Configuration;
using System.Security.Cryptography;
using System.Text;
using System;

namespace BodyJournalAPI.Helpers
{
  public class DataContext : DbContext
  {
    public DataContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<Exercise> Exercises { get; set; }
    public virtual DbSet<Workout> Workouts { get; set; }
    public DbSet<Session> Sessions { get; set; }
    public DbSet<Record> Records { get; set; }
    public DbSet<Recovery> Recovery { get; set; }
    public DbSet<ExerciseTypeMuscle> ExerciseTypeMuscles { get; set; }
    public virtual DbSet<ExerciseType> ExerciseTypes { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Muscle> Muscles { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
      byte[] passwordHash;
      byte[] passwordSalt;

      using (var hmac = new HMACSHA512())
      {
        passwordSalt = hmac.Key;
        passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("password"));
      }

      base.OnModelCreating(builder);

      builder.Entity<User>().HasData(
      new User() { UserId = 1, FirstName = "Andrew", LastName = "Philpott", UserName = "Nxtstp", Email = "a@gmail.com", PasswordHash = passwordHash, PasswordSalt = passwordSalt },
      new User() { UserId = 2, FirstName = "b", LastName = "b", UserName = "b", Email = "b@gmail.com", PasswordHash = passwordHash, PasswordSalt = passwordSalt }
      );


      builder.Entity<ExerciseType>().HasData(
        new ExerciseType() { ExerciseTypeId = 1, Name = "Squat" },
        new ExerciseType() { ExerciseTypeId = 2, Name = "Leg Press" },
        new ExerciseType() { ExerciseTypeId = 3, Name = "Lunge" },
        new ExerciseType() { ExerciseTypeId = 4, Name = "Deadlift" },
        new ExerciseType() { ExerciseTypeId = 5, Name = "Leg extension" },
        new ExerciseType() { ExerciseTypeId = 6, Name = "Leg curl" },
        new ExerciseType() { ExerciseTypeId = 7, Name = "Standing calf raise" },
        new ExerciseType() { ExerciseTypeId = 8, Name = "Seated calf raise" },
        new ExerciseType() { ExerciseTypeId = 9, Name = "Hip adductor" },
        new ExerciseType() { ExerciseTypeId = 10, Name = "Bench press" },
        new ExerciseType() { ExerciseTypeId = 11, Name = "Chest fly" },
        new ExerciseType() { ExerciseTypeId = 12, Name = "Push-up" },
        new ExerciseType() { ExerciseTypeId = 13, Name = "Pull-down" },
        new ExerciseType() { ExerciseTypeId = 14, Name = "Pull-up" },
        new ExerciseType() { ExerciseTypeId = 15, Name = "Bent-over row" },
        new ExerciseType() { ExerciseTypeId = 16, Name = "Upright row" },
        new ExerciseType() { ExerciseTypeId = 17, Name = "Shoulder press" },
        new ExerciseType() { ExerciseTypeId = 18, Name = "Shoulder fly" },
        new ExerciseType() { ExerciseTypeId = 19, Name = "Lateral raise" },
        new ExerciseType() { ExerciseTypeId = 20, Name = "Shoulder shrug" },
        new ExerciseType() { ExerciseTypeId = 21, Name = "Pushdown" },
        new ExerciseType() { ExerciseTypeId = 22, Name = "Triceps extension" },
        new ExerciseType() { ExerciseTypeId = 23, Name = "Biceps curl" },
        new ExerciseType() { ExerciseTypeId = 24, Name = "Crunch" },
        new ExerciseType() { ExerciseTypeId = 25, Name = "Russian twist" },
        new ExerciseType() { ExerciseTypeId = 26, Name = "Leg raise" },
        new ExerciseType() { ExerciseTypeId = 27, Name = "Back extension" });

      builder.Entity<Muscle>().HasData(
        new Muscle() { MuscleId = 1, Name = "Calves" },
        new Muscle() { MuscleId = 2, Name = "Quadriceps" },
        new Muscle() { MuscleId = 3, Name = "Hamstrings" },
        new Muscle() { MuscleId = 4, Name = "Gluteus" },
        new Muscle() { MuscleId = 5, Name = "Hips" },
        new Muscle() { MuscleId = 6, Name = "Lower back" },
        new Muscle() { MuscleId = 7, Name = "Lats" },
        new Muscle() { MuscleId = 8, Name = "Trapezius" },
        new Muscle() { MuscleId = 9, Name = "Abdominals" },
        new Muscle() { MuscleId = 10, Name = "Pectorals" },
        new Muscle() { MuscleId = 11, Name = "Deltoids" },
        new Muscle() { MuscleId = 12, Name = "Triceps" },
        new Muscle() { MuscleId = 13, Name = "Biceps" },
        new Muscle() { MuscleId = 14, Name = "Forearms" });

      builder.Entity<Record>().HasData(
        new Record() { RecordId = 1, ExerciseTypeId = 10, Weight = 200, Reps = 8, Sets = 3, UserId = 1, Time = DateTime.Now.ToString("MM/dd/yyyy H:mm") },
        new Record() { RecordId = 2, ExerciseTypeId = 1, Weight = 300, Reps = 5, Sets = 3, Time = DateTime.Now.ToString("MM/dd/yyyy H:mm"), UserId = 1 },
        new Record() { RecordId = 3, ExerciseTypeId = 14, Weight = 0, Reps = 20, Sets = 1, Time = DateTime.Now.ToString("MM/dd/yyyy H:mm"), UserId = 1 },
        new Record() { RecordId = 4, ExerciseTypeId = 17, Weight = 150, Reps = 8, Sets = 3, Time = DateTime.Now.ToString("MM/dd/yyyy H:mm"), UserId = 1 });

      builder.Entity<ExerciseTypeMuscle>().HasData(
          //calves
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 1, ExerciseTypeId = 1, MuscleId = 1, Primary = false },
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 2, ExerciseTypeId = 2, MuscleId = 1, Primary = false },
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 3, ExerciseTypeId = 4, MuscleId = 1, Primary = false },
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 4, ExerciseTypeId = 6, MuscleId = 1, Primary = false },
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 5, ExerciseTypeId = 7, MuscleId = 1, Primary = true },
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 6, ExerciseTypeId = 8, MuscleId = 1, Primary = true },

          //quadriceps
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 7, ExerciseTypeId = 1, MuscleId = 2, Primary = true },
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 8, ExerciseTypeId = 2, MuscleId = 2, Primary = true },
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 9, ExerciseTypeId = 3, MuscleId = 2, Primary = true },
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 10, ExerciseTypeId = 4, MuscleId = 2, Primary = true },
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 11, ExerciseTypeId = 5, MuscleId = 2, Primary = true },

          //hamstrings
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 12, ExerciseTypeId = 1, MuscleId = 3, Primary = false },
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 13, ExerciseTypeId = 2, MuscleId = 3, Primary = false },
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 14, ExerciseTypeId = 3, MuscleId = 3, Primary = true },
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 15, ExerciseTypeId = 4, MuscleId = 3, Primary = true },
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 16, ExerciseTypeId = 6, MuscleId = 3, Primary = true },
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 17, ExerciseTypeId = 27, MuscleId = 3, Primary = true },

          //gluteus
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 18, ExerciseTypeId = 1, MuscleId = 4, Primary = true },
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 19, ExerciseTypeId = 2, MuscleId = 4, Primary = true },
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 20, ExerciseTypeId = 3, MuscleId = 4, Primary = true },
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 21, ExerciseTypeId = 4, MuscleId = 4, Primary = true },
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 22, ExerciseTypeId = 27, MuscleId = 4, Primary = true },

          //hips
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 23, ExerciseTypeId = 1, MuscleId = 5, Primary = true },
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 24, ExerciseTypeId = 3, MuscleId = 5, Primary = true },
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 25, ExerciseTypeId = 4, MuscleId = 5, Primary = true },
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 26, ExerciseTypeId = 9, MuscleId = 5, Primary = true },
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 27, ExerciseTypeId = 26, MuscleId = 5, Primary = true },


          //lower back
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 28, ExerciseTypeId = 1, MuscleId = 6, Primary = false },
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 29, ExerciseTypeId = 4, MuscleId = 6, Primary = true },
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 30, ExerciseTypeId = 27, MuscleId = 6, Primary = true },

          //lats  //13 14 15
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 31, ExerciseTypeId = 13, MuscleId = 7, Primary = true },
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 32, ExerciseTypeId = 14, MuscleId = 7, Primary = true },
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 33, ExerciseTypeId = 15, MuscleId = 7, Primary = true },

          //trapezius
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 34, ExerciseTypeId = 4, MuscleId = 8, Primary = false },
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 35, ExerciseTypeId = 14, MuscleId = 8, Primary = false },
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 36, ExerciseTypeId = 15, MuscleId = 8, Primary = false },
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 37, ExerciseTypeId = 16, MuscleId = 8, Primary = true },
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 38, ExerciseTypeId = 17, MuscleId = 8, Primary = false },
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 39, ExerciseTypeId = 18, MuscleId = 8, Primary = false },
           new ExerciseTypeMuscle { ExerciseTypeMuscleId = 40, ExerciseTypeId = 19, MuscleId = 8, Primary = false },
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 41, ExerciseTypeId = 20, MuscleId = 8, Primary = true },

          //abdominals
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 42, ExerciseTypeId = 1, MuscleId = 9, Primary = true },
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 43, ExerciseTypeId = 4, MuscleId = 9, Primary = false },
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 44, ExerciseTypeId = 12, MuscleId = 9, Primary = false },
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 45, ExerciseTypeId = 24, MuscleId = 9, Primary = true },
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 46, ExerciseTypeId = 25, MuscleId = 9, Primary = true },
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 47, ExerciseTypeId = 26, MuscleId = 9, Primary = false },

          //pectorals
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 48, ExerciseTypeId = 10, MuscleId = 10, Primary = true },
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 49, ExerciseTypeId = 11, MuscleId = 10, Primary = true },
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 50, ExerciseTypeId = 12, MuscleId = 10, Primary = true },
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 51, ExerciseTypeId = 13, MuscleId = 10, Primary = false },
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 52, ExerciseTypeId = 14, MuscleId = 10, Primary = false },

          //deltoids
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 53, ExerciseTypeId = 10, MuscleId = 11, Primary = false },
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 54, ExerciseTypeId = 11, MuscleId = 11, Primary = false },
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 55, ExerciseTypeId = 12, MuscleId = 11, Primary = false },
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 56, ExerciseTypeId = 13, MuscleId = 11, Primary = false },
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 57, ExerciseTypeId = 14, MuscleId = 11, Primary = false },
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 58, ExerciseTypeId = 16, MuscleId = 11, Primary = true },
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 59, ExerciseTypeId = 17, MuscleId = 11, Primary = true },
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 60, ExerciseTypeId = 18, MuscleId = 11, Primary = true },
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 61, ExerciseTypeId = 19, MuscleId = 11, Primary = true },
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 62, ExerciseTypeId = 20, MuscleId = 11, Primary = false },

          //triceps
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 64, ExerciseTypeId = 10, MuscleId = 12, Primary = true },
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 65, ExerciseTypeId = 12, MuscleId = 12, Primary = true },
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 66, ExerciseTypeId = 17, MuscleId = 12, Primary = false },
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 67, ExerciseTypeId = 21, MuscleId = 12, Primary = true },
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 68, ExerciseTypeId = 22, MuscleId = 12, Primary = true },

          //biceps
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 69, ExerciseTypeId = 13, MuscleId = 13, Primary = false },
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 70, ExerciseTypeId = 14, MuscleId = 13, Primary = false },
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 71, ExerciseTypeId = 15, MuscleId = 13, Primary = false },
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 72, ExerciseTypeId = 16, MuscleId = 13, Primary = false },
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 73, ExerciseTypeId = 23, MuscleId = 13, Primary = true },

          //forearms
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 74, ExerciseTypeId = 4, MuscleId = 14, Primary = false },
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 75, ExerciseTypeId = 13, MuscleId = 14, Primary = false },
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 76, ExerciseTypeId = 14, MuscleId = 14, Primary = false },
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 77, ExerciseTypeId = 15, MuscleId = 14, Primary = false },
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 78, ExerciseTypeId = 16, MuscleId = 14, Primary = false },
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 79, ExerciseTypeId = 18, MuscleId = 14, Primary = false },
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 80, ExerciseTypeId = 20, MuscleId = 14, Primary = false },
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 81, ExerciseTypeId = 22, MuscleId = 14, Primary = false },
          new ExerciseTypeMuscle { ExerciseTypeMuscleId = 82, ExerciseTypeId = 23, MuscleId = 14, Primary = false }
       );

      builder.Entity<Workout>().HasData(
                 new Workout() { WorkoutId = 1, Name = "Full Body", Notes = "Rest 1 minute between sets", UserId = 1 });
      //calves, quads, hamstrings, gluteus, hips, abdominals, lower back

      //pectorals, deltoids, triceps
      builder.Entity<Exercise>().HasOne(e => e.Workout).WithMany(w => w.Exercises).OnDelete(DeleteBehavior.NoAction);
      builder.Entity<Exercise>().HasData(
             new Exercise() { ExerciseId = 1, ExerciseTypeId = 10, Weight = 180, Reps = 8, Sets = 3, UserId = 1, WorkoutId = 1 },
             //calves, quads, hamstrings, gluteus, hips, abdominals, lower back
             new Exercise() { ExerciseId = 2, ExerciseTypeId = 1, Weight = 250, Reps = 15, Sets = 3, UserId = 1, WorkoutId = 1 });

      builder.Entity<Session>().HasData(
        new Session() { SessionId = 1, WorkoutId = 1, WorkoutStart = DateTime.Now.ToString("MM/dd/yyyy H:mm"), WorkoutEnd = DateTime.Now.AddHours(1).ToString("MM/dd/yyyy H:mm"), Rating = 5, UserId = 1 }
      );


      builder.Entity<Recovery>().HasData(
        new Recovery() { RecoveryId = 1, MuscleId = 1, Fatigue = 1, Time = DateTime.Now.ToString("MM/dd/yyyy H:mm"), UserId = 1 },
        new Recovery() { RecoveryId = 2, MuscleId = 2, Fatigue = 1, Time = DateTime.Now.ToString("MM/dd/yyyy H:mm"), UserId = 1 },
        new Recovery() { RecoveryId = 3, MuscleId = 3, Fatigue = 1, Time = DateTime.Now.ToString("MM/dd/yyyy H:mm"), UserId = 1 },
        new Recovery() { RecoveryId = 4, MuscleId = 4, Fatigue = 1, Time = DateTime.Now.ToString("MM/dd/yyyy H:mm"), UserId = 1 },
        new Recovery() { RecoveryId = 5, MuscleId = 5, Fatigue = 1, Time = DateTime.Now.ToString("MM/dd/yyyy H:mm"), UserId = 1 },
        new Recovery() { RecoveryId = 6, MuscleId = 6, Fatigue = 1, Time = DateTime.Now.ToString("MM/dd/yyyy H:mm"), UserId = 1 },
        new Recovery() { RecoveryId = 7, MuscleId = 7, Time = DateTime.Now.ToString("MM/dd/yyyy H:mm"), UserId = 1, Fatigue = 1 },
        new Recovery() { RecoveryId = 8, MuscleId = 8, Time = DateTime.Now.ToString("MM/dd/yyyy H:mm"), UserId = 1, Fatigue = 1 },
        new Recovery() { RecoveryId = 9, MuscleId = 9, Fatigue = 1, Time = DateTime.Now.ToString("MM/dd/yyyy H:mm"), UserId = 1 },
        new Recovery() { RecoveryId = 10, MuscleId = 10, Fatigue = 1, Time = DateTime.Now.ToString("MM/dd/yyyy H:mm"), UserId = 1 },
        new Recovery() { RecoveryId = 11, MuscleId = 11, Fatigue = 1, Time = DateTime.Now.ToString("MM/dd/yyyy H:mm"), UserId = 1 },
        new Recovery() { RecoveryId = 12, MuscleId = 12, Fatigue = 1, Time = DateTime.Now.ToString("MM/dd/yyyy H:mm"), UserId = 1 },
        new Recovery() { RecoveryId = 13, MuscleId = 13, Fatigue = 1, Time = DateTime.Now.ToString("MM/dd/yyyy H:mm"), UserId = 1 },
        new Recovery() { RecoveryId = 14, MuscleId = 14, Time = DateTime.Now.ToString("MM/dd/yyyy H:mm"), UserId = 1, Fatigue = 1 });
    }

  }
}