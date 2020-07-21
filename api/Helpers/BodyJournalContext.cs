using Microsoft.EntityFrameworkCore;
using BodyJournalAPI.Entities;
using System.Security.Cryptography;
using System.Text;
using System;

namespace BodyJournalAPI.Helpers
{
  public class BodyJournalContext : DbContext
  {
    public BodyJournalContext(DbContextOptions options) : base(options)
    {
    }
    public DbSet<Exercise> Exercises { get; set; }
    public DbSet<Workout> Workouts { get; set; }
    public DbSet<Session> Sessions { get; set; }
    public DbSet<Record> Records { get; set; }
    public DbSet<ExerciseWorkout> ExerciseWorkouts { get; set; }
    public DbSet<Recovery> Recovery { get; set; }
    public DbSet<ExerciseMuscle> ExerciseMuscles { get; set; }
    public DbSet<UserExercise> UserExercises { get; set; }
    public DbSet<User> Users { get; set; }

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

      base.OnModelCreating(builder);
      builder.Entity<User>().HasData(
      new User() { Id = 1, FirstName = "Andrew", LastName = "Philpott", UserName = "Nxtstp", Email = "a@gmail.com", PasswordHash = passwordHash, PasswordSalt = passwordSalt },
      new User() { Id = 2, FirstName = "b", LastName = "b", UserName = "b", Email = "b@gmail.com", PasswordHash = passwordHash, PasswordSalt = passwordSalt }
      );


      builder.Entity<Exercise>().HasData(
        new Exercise() { Id = 1, Name = "Squat" },
        new Exercise() { Id = 2, Name = "Leg Press" },
        new Exercise() { Id = 3, Name = "Lunge" },
        new Exercise() { Id = 4, Name = "Deadlift" },
        new Exercise() { Id = 5, Name = "Leg extension" },
        new Exercise() { Id = 6, Name = "Leg curl" },
        new Exercise() { Id = 7, Name = "Standing calf raise" },
        new Exercise() { Id = 8, Name = "Seated calf raise" },
        new Exercise() { Id = 9, Name = "Hip adductor" },
        new Exercise() { Id = 10, Name = "Bench press" },
        new Exercise() { Id = 11, Name = "Chest fly" },
        new Exercise() { Id = 12, Name = "Push-up" },
        new Exercise() { Id = 13, Name = "Pull-down" },
        new Exercise() { Id = 14, Name = "Pull-up" },
        new Exercise() { Id = 15, Name = "Bent-over row" },
        new Exercise() { Id = 16, Name = "Upright row" },
        new Exercise() { Id = 17, Name = "Shoulder press" },
        new Exercise() { Id = 18, Name = "Shoulder fly" },
        new Exercise() { Id = 19, Name = "Lateral raise" },
        new Exercise() { Id = 20, Name = "Shoulder shrug" },
        new Exercise() { Id = 21, Name = "Pushdown" },
        new Exercise() { Id = 22, Name = "Triceps extension" },
        new Exercise() { Id = 23, Name = "Biceps curl" },
        new Exercise() { Id = 24, Name = "Crunch" },
        new Exercise() { Id = 25, Name = "Russian twist" },
        new Exercise() { Id = 26, Name = "Leg raise" },
        new Exercise() { Id = 27, Name = "Back extension" });

      builder.Entity<Muscle>().HasData(
        new Muscle() { Id = 1, Name = "Calves" },
        new Muscle() { Id = 2, Name = "Quadriceps" },
        new Muscle() { Id = 3, Name = "Hamstrings" },
        new Muscle() { Id = 4, Name = "Gluteus" },
        new Muscle() { Id = 5, Name = "Hips" },
        new Muscle() { Id = 6, Name = "Lower back" },
        new Muscle() { Id = 7, Name = "Lats" },
        new Muscle() { Id = 8, Name = "Trapezius" },
        new Muscle() { Id = 9, Name = "Abdominals" },
        new Muscle() { Id = 10, Name = "Pectorals" },
        new Muscle() { Id = 11, Name = "Deltoids" },
        new Muscle() { Id = 12, Name = "Triceps" },
        new Muscle() { Id = 13, Name = "Biceps" },
        new Muscle() { Id = 14, Name = "Forearms" });

      builder.Entity<Record>().HasData(
        new Record() { Id = 1, ExerciseId = 10, Weight = 200, Reps = 8, Sets = 3, UserId = 1, Time = DateTime.Now.ToString("MM/dd/yyyy H:mm") },
        new Record() { Id = 2, ExerciseId = 1, Weight = 300, Reps = 5, Sets = 3, Time = DateTime.Now.ToString("MM/dd/yyyy H:mm") },
        new Record() { Id = 3, ExerciseId = 14, Weight = 0, Reps = 20, Sets = 1, Time = DateTime.Now.ToString("MM/dd/yyyy H:mm") },
        new Record() { Id = 4, ExerciseId = 17, Weight = 150, Reps = 8, Sets = 3, Time = DateTime.Now.ToString("MM/dd/yyyy H:mm") });

      builder.Entity<ExerciseMuscle>().HasData(
          //calves
          new ExerciseMuscle() { Id = 1, ExerciseId = 1, MuscleId = 1, Primary = false },
          new ExerciseMuscle() { Id = 2, ExerciseId = 2, MuscleId = 1, Primary = false },
          new ExerciseMuscle() { Id = 3, ExerciseId = 4, MuscleId = 1, Primary = false },
          new ExerciseMuscle() { Id = 4, ExerciseId = 6, MuscleId = 1, Primary = false },
          new ExerciseMuscle() { Id = 5, ExerciseId = 7, MuscleId = 1, Primary = true },
          new ExerciseMuscle() { Id = 6, ExerciseId = 8, MuscleId = 1, Primary = true },

          //quadriceps
          new ExerciseMuscle() { Id = 7, ExerciseId = 1, MuscleId = 2, Primary = true },
          new ExerciseMuscle() { Id = 8, ExerciseId = 2, MuscleId = 2, Primary = true },
          new ExerciseMuscle() { Id = 9, ExerciseId = 3, MuscleId = 2, Primary = true },
          new ExerciseMuscle() { Id = 10, ExerciseId = 4, MuscleId = 2, Primary = true },
          new ExerciseMuscle() { Id = 11, ExerciseId = 5, MuscleId = 2, Primary = true },

          //hamstrings
          new ExerciseMuscle() { Id = 12, ExerciseId = 1, MuscleId = 3, Primary = false },
          new ExerciseMuscle() { Id = 13, ExerciseId = 2, MuscleId = 3, Primary = false },
          new ExerciseMuscle() { Id = 14, ExerciseId = 3, MuscleId = 3, Primary = true },
          new ExerciseMuscle() { Id = 15, ExerciseId = 4, MuscleId = 3, Primary = true },
          new ExerciseMuscle() { Id = 16, ExerciseId = 6, MuscleId = 3, Primary = true },
          new ExerciseMuscle() { Id = 17, ExerciseId = 27, MuscleId = 3, Primary = true },

          //gluteus
          new ExerciseMuscle() { Id = 18, ExerciseId = 1, MuscleId = 4, Primary = true },
          new ExerciseMuscle() { Id = 19, ExerciseId = 2, MuscleId = 4, Primary = true },
          new ExerciseMuscle() { Id = 20, ExerciseId = 3, MuscleId = 4, Primary = true },
          new ExerciseMuscle() { Id = 21, ExerciseId = 4, MuscleId = 4, Primary = true },
          new ExerciseMuscle() { Id = 22, ExerciseId = 27, MuscleId = 4, Primary = true },

          //hips
          new ExerciseMuscle() { Id = 23, ExerciseId = 1, MuscleId = 5, Primary = true },
          new ExerciseMuscle() { Id = 24, ExerciseId = 3, MuscleId = 5, Primary = true },
          new ExerciseMuscle() { Id = 25, ExerciseId = 4, MuscleId = 5, Primary = true },
          new ExerciseMuscle() { Id = 26, ExerciseId = 9, MuscleId = 5, Primary = true },
          new ExerciseMuscle() { Id = 27, ExerciseId = 26, MuscleId = 5, Primary = true },


          //lower back
          new ExerciseMuscle() { Id = 28, ExerciseId = 1, MuscleId = 6, Primary = false },
          new ExerciseMuscle() { Id = 29, ExerciseId = 4, MuscleId = 6, Primary = true },
          new ExerciseMuscle() { Id = 30, ExerciseId = 27, MuscleId = 6, Primary = true },

          //lats  //13 14 15
          new ExerciseMuscle() { Id = 31, ExerciseId = 13, MuscleId = 7, Primary = true },
          new ExerciseMuscle() { Id = 32, ExerciseId = 14, MuscleId = 7, Primary = true },
          new ExerciseMuscle() { Id = 33, ExerciseId = 15, MuscleId = 7, Primary = true },

          //trapezius
          new ExerciseMuscle() { Id = 34, ExerciseId = 4, MuscleId = 8, Primary = false },
          new ExerciseMuscle() { Id = 35, ExerciseId = 14, MuscleId = 8, Primary = false },
          new ExerciseMuscle() { Id = 36, ExerciseId = 15, MuscleId = 8, Primary = false },
          new ExerciseMuscle() { Id = 37, ExerciseId = 16, MuscleId = 8, Primary = true },
          new ExerciseMuscle() { Id = 38, ExerciseId = 17, MuscleId = 8, Primary = false },
          new ExerciseMuscle() { Id = 39, ExerciseId = 18, MuscleId = 8, Primary = false },
           new ExerciseMuscle() { Id = 40, ExerciseId = 19, MuscleId = 8, Primary = false },
          new ExerciseMuscle() { Id = 41, ExerciseId = 20, MuscleId = 8, Primary = true },

          //abdominals
          new ExerciseMuscle() { Id = 42, ExerciseId = 1, MuscleId = 9, Primary = true },
          new ExerciseMuscle() { Id = 43, ExerciseId = 4, MuscleId = 9, Primary = false },
          new ExerciseMuscle() { Id = 44, ExerciseId = 12, MuscleId = 9, Primary = false },
          new ExerciseMuscle() { Id = 45, ExerciseId = 24, MuscleId = 9, Primary = true },
          new ExerciseMuscle() { Id = 46, ExerciseId = 25, MuscleId = 9, Primary = true },
          new ExerciseMuscle() { Id = 47, ExerciseId = 26, MuscleId = 9, Primary = false },

          //pectorals
          new ExerciseMuscle() { Id = 48, ExerciseId = 10, MuscleId = 10, Primary = true },
          new ExerciseMuscle() { Id = 49, ExerciseId = 11, MuscleId = 10, Primary = true },
          new ExerciseMuscle() { Id = 50, ExerciseId = 12, MuscleId = 10, Primary = true },
          new ExerciseMuscle() { Id = 51, ExerciseId = 13, MuscleId = 10, Primary = false },
          new ExerciseMuscle() { Id = 52, ExerciseId = 14, MuscleId = 10, Primary = false },

          //deltoids
          new ExerciseMuscle() { Id = 53, ExerciseId = 10, MuscleId = 11, Primary = false },
          new ExerciseMuscle() { Id = 54, ExerciseId = 11, MuscleId = 11, Primary = false },
          new ExerciseMuscle() { Id = 55, ExerciseId = 12, MuscleId = 11, Primary = false },
          new ExerciseMuscle() { Id = 56, ExerciseId = 13, MuscleId = 11, Primary = false },
          new ExerciseMuscle() { Id = 57, ExerciseId = 14, MuscleId = 11, Primary = false },
          new ExerciseMuscle() { Id = 58, ExerciseId = 16, MuscleId = 11, Primary = true },
          new ExerciseMuscle() { Id = 59, ExerciseId = 17, MuscleId = 11, Primary = true },
          new ExerciseMuscle() { Id = 60, ExerciseId = 18, MuscleId = 11, Primary = true },
          new ExerciseMuscle() { Id = 61, ExerciseId = 19, MuscleId = 11, Primary = true },
          new ExerciseMuscle() { Id = 62, ExerciseId = 20, MuscleId = 11, Primary = false },

          //triceps
          new ExerciseMuscle() { Id = 64, ExerciseId = 10, MuscleId = 12, Primary = true },
          new ExerciseMuscle() { Id = 65, ExerciseId = 12, MuscleId = 12, Primary = true },
          new ExerciseMuscle() { Id = 66, ExerciseId = 17, MuscleId = 12, Primary = false },
          new ExerciseMuscle() { Id = 67, ExerciseId = 21, MuscleId = 12, Primary = true },
          new ExerciseMuscle() { Id = 68, ExerciseId = 22, MuscleId = 12, Primary = true },

          //biceps
          new ExerciseMuscle() { Id = 69, ExerciseId = 13, MuscleId = 13, Primary = false },
          new ExerciseMuscle() { Id = 70, ExerciseId = 14, MuscleId = 13, Primary = false },
          new ExerciseMuscle() { Id = 71, ExerciseId = 15, MuscleId = 13, Primary = false },
          new ExerciseMuscle() { Id = 72, ExerciseId = 16, MuscleId = 13, Primary = false },
          new ExerciseMuscle() { Id = 73, ExerciseId = 23, MuscleId = 13, Primary = true },

          //forearms
          new ExerciseMuscle() { Id = 74, ExerciseId = 4, MuscleId = 14, Primary = false },
          new ExerciseMuscle() { Id = 75, ExerciseId = 13, MuscleId = 14, Primary = false },
          new ExerciseMuscle() { Id = 76, ExerciseId = 14, MuscleId = 14, Primary = false },
          new ExerciseMuscle() { Id = 77, ExerciseId = 15, MuscleId = 14, Primary = false },
          new ExerciseMuscle() { Id = 78, ExerciseId = 16, MuscleId = 14, Primary = false },
          new ExerciseMuscle() { Id = 79, ExerciseId = 18, MuscleId = 14, Primary = false },
          new ExerciseMuscle() { Id = 80, ExerciseId = 20, MuscleId = 14, Primary = false },
          new ExerciseMuscle() { Id = 81, ExerciseId = 22, MuscleId = 14, Primary = false },
          new ExerciseMuscle() { Id = 82, ExerciseId = 23, MuscleId = 14, Primary = false }
       );
      //pectorals, deltoids, triceps
      builder.Entity<UserExercise>().HasData(
             new UserExercise() { Id = 1, ExerciseId = 10, Name = "Bench Press", Weight = 180, Reps = 8, Sets = 3, Intensity = 4, UserId = 1 },
             //calves, quads, hamstrings, gluteus, hips, abdominals, lower back
             new UserExercise() { Id = 2, ExerciseId = 1, Name = "Squat", Weight = 250, Reps = 15, Sets = 3, Intensity = 4 });

      builder.Entity<Workout>().HasData(
                 new Workout() { Id = 1, Name = "Full Body", Notes = "Rest 1 minute between sets", UserId = 1 });
      //calves, quads, hamstrings, gluteus, hips, abdominals, lower back

      builder.Entity<ExerciseWorkout>().HasData(
        new ExerciseWorkout() { Id = 1, WorkoutId = 1, ExerciseId = 1 },
        new ExerciseWorkout() { Id = 2, WorkoutId = 1, ExerciseId = 2 }
      );

      builder.Entity<Session>().HasData(
        new Session() { Id = 1, WorkoutId = 1, WorkoutStart = DateTime.Now.ToString("MM/dd/yyyy H:mm"), WorkoutEnd = DateTime.Now.AddHours(1).ToString("MM/dd/yyyy H:mm"), Rating = 5, UserId = 1 }
      );


      builder.Entity<Recovery>().HasData(
        new Recovery() { Id = 1, MuscleId = 1, Fatigue = 1, Time = DateTime.Now.ToString("MM/dd/yyyy H:mm"), UserId = 1 },
        new Recovery() { Id = 2, MuscleId = 2, Fatigue = 1, Time = DateTime.Now.ToString("MM/dd/yyyy H:mm"), UserId = 1 },
        new Recovery() { Id = 3, MuscleId = 3, Fatigue = 1, Time = DateTime.Now.ToString("MM/dd/yyyy H:mm"), UserId = 1 },
        new Recovery() { Id = 4, MuscleId = 4, Fatigue = 1, Time = DateTime.Now.ToString("MM/dd/yyyy H:mm"), UserId = 1 },
        new Recovery() { Id = 5, MuscleId = 5, Fatigue = 1, Time = DateTime.Now.ToString("MM/dd/yyyy H:mm"), UserId = 1 },
        new Recovery() { Id = 6, MuscleId = 6, Fatigue = 1, Time = DateTime.Now.ToString("MM/dd/yyyy H:mm"), UserId = 1 },
        new Recovery() { Id = 7, MuscleId = 7, Time = DateTime.Now.ToString("MM/dd/yyyy H:mm"), UserId = 1, Fatigue = 1 },
        new Recovery() { Id = 8, MuscleId = 8, Time = DateTime.Now.ToString("MM/dd/yyyy H:mm"), UserId = 1, Fatigue = 1 },
        new Recovery() { Id = 9, MuscleId = 9, Fatigue = 1, Time = DateTime.Now.ToString("MM/dd/yyyy H:mm"), UserId = 1 },
        new Recovery() { Id = 10, MuscleId = 10, Fatigue = 1, Time = DateTime.Now.ToString("MM/dd/yyyy H:mm"), UserId = 1 },
        new Recovery() { Id = 11, MuscleId = 11, Fatigue = 1, Time = DateTime.Now.ToString("MM/dd/yyyy H:mm"), UserId = 1 },
        new Recovery() { Id = 12, MuscleId = 12, Fatigue = 1, Time = DateTime.Now.ToString("MM/dd/yyyy H:mm"), UserId = 1 },
        new Recovery() { Id = 13, MuscleId = 13, Fatigue = 1, Time = DateTime.Now.ToString("MM/dd/yyyy H:mm"), UserId = 1 },
        new Recovery() { Id = 14, MuscleId = 14, Time = DateTime.Now.ToString("MM/dd/yyyy H:mm"), UserId = 1, Fatigue = 1 });
    }

  }
}