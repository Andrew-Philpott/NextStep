using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BodyJournalApi.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Exercises",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Exercises", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Muscle",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Muscle", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Records",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Weight = table.Column<int>(nullable: false),
                    Reps = table.Column<int>(nullable: false),
                    Sets = table.Column<int>(nullable: false),
                    Time = table.Column<string>(nullable: true),
                    UserId = table.Column<int>(nullable: false),
                    ExerciseId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Records", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Recovery",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Fatigue = table.Column<int>(nullable: false),
                    Time = table.Column<string>(nullable: true),
                    UserId = table.Column<int>(nullable: false),
                    MuscleId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Recovery", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserExercises",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Weight = table.Column<int>(nullable: true),
                    Reps = table.Column<int>(nullable: false),
                    Sets = table.Column<int>(nullable: false),
                    Intensity = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    ExerciseId = table.Column<int>(nullable: false),
                    UserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserExercises", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    UserName = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    PasswordHash = table.Column<byte[]>(nullable: true),
                    PasswordSalt = table.Column<byte[]>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Workouts",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    Notes = table.Column<string>(nullable: true),
                    UserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Workouts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ExerciseMuscles",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ExerciseId = table.Column<int>(nullable: false),
                    MuscleId = table.Column<int>(nullable: false),
                    Primary = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExerciseMuscles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ExerciseMuscles_Exercises_ExerciseId",
                        column: x => x.ExerciseId,
                        principalTable: "Exercises",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ExerciseMuscles_Muscle_MuscleId",
                        column: x => x.MuscleId,
                        principalTable: "Muscle",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ExerciseWorkouts",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ExerciseId = table.Column<int>(nullable: false),
                    WorkoutId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExerciseWorkouts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ExerciseWorkouts_Exercises_ExerciseId",
                        column: x => x.ExerciseId,
                        principalTable: "Exercises",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ExerciseWorkouts_Workouts_WorkoutId",
                        column: x => x.WorkoutId,
                        principalTable: "Workouts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Sessions",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    WorkoutStart = table.Column<string>(nullable: true),
                    WorkoutEnd = table.Column<string>(nullable: true),
                    Rating = table.Column<byte>(nullable: false),
                    WorkoutId = table.Column<int>(nullable: false),
                    UserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sessions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Sessions_Workouts_WorkoutId",
                        column: x => x.WorkoutId,
                        principalTable: "Workouts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Exercises",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Squat" },
                    { 27, "Back extension" },
                    { 26, "Leg raise" },
                    { 25, "Russian twist" },
                    { 24, "Crunch" },
                    { 23, "Biceps curl" },
                    { 22, "Triceps extension" },
                    { 21, "Pushdown" },
                    { 20, "Shoulder shrug" },
                    { 19, "Lateral raise" },
                    { 18, "Shoulder fly" },
                    { 16, "Upright row" },
                    { 15, "Bent-over row" },
                    { 17, "Shoulder press" },
                    { 13, "Pull-down" },
                    { 2, "Leg Press" },
                    { 3, "Lunge" },
                    { 4, "Deadlift" },
                    { 14, "Pull-up" },
                    { 6, "Leg curl" },
                    { 7, "Standing calf raise" },
                    { 5, "Leg extension" },
                    { 9, "Hip adductor" },
                    { 10, "Bench press" },
                    { 11, "Chest fly" },
                    { 12, "Push-up" },
                    { 8, "Seated calf raise" }
                });

            migrationBuilder.InsertData(
                table: "Muscle",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 9, "Abdominals" },
                    { 14, "Forearms" },
                    { 13, "Biceps" },
                    { 12, "Triceps" },
                    { 11, "Deltoids" },
                    { 10, "Pectorals" },
                    { 8, "Trapezius" },
                    { 5, "Hips" },
                    { 6, "Lower back" },
                    { 7, "Lats" },
                    { 4, "Gluteus" },
                    { 3, "Hamstrings" },
                    { 2, "Quadriceps" },
                    { 1, "Calves" }
                });

            migrationBuilder.InsertData(
                table: "Records",
                columns: new[] { "Id", "ExerciseId", "Reps", "Sets", "Time", "UserId", "Weight" },
                values: new object[,]
                {
                    { 4, 17, 8, 3, "07/20/2020 14:10", 0, 150 },
                    { 3, 14, 20, 1, "07/20/2020 14:10", 0, 0 },
                    { 1, 10, 8, 3, "07/20/2020 14:10", 1, 200 },
                    { 2, 1, 5, 3, "07/20/2020 14:10", 0, 300 }
                });

            migrationBuilder.InsertData(
                table: "Recovery",
                columns: new[] { "Id", "Fatigue", "MuscleId", "Time", "UserId" },
                values: new object[,]
                {
                    { 9, 1, 9, "07/20/2020 14:10", 1 },
                    { 13, 1, 13, "07/20/2020 14:10", 1 },
                    { 12, 1, 12, "07/20/2020 14:10", 1 },
                    { 11, 1, 11, "07/20/2020 14:10", 1 },
                    { 10, 1, 10, "07/20/2020 14:10", 1 },
                    { 14, 1, 14, "07/20/2020 14:10", 1 },
                    { 8, 1, 8, "07/20/2020 14:10", 1 },
                    { 5, 1, 5, "07/20/2020 14:10", 1 },
                    { 6, 1, 6, "07/20/2020 14:10", 1 },
                    { 4, 1, 4, "07/20/2020 14:10", 1 },
                    { 3, 1, 3, "07/20/2020 14:10", 1 },
                    { 2, 1, 2, "07/20/2020 14:10", 1 },
                    { 1, 1, 1, "07/20/2020 14:10", 1 },
                    { 7, 1, 7, "07/20/2020 14:10", 1 }
                });

            migrationBuilder.InsertData(
                table: "UserExercises",
                columns: new[] { "Id", "ExerciseId", "Intensity", "Name", "Reps", "Sets", "UserId", "Weight" },
                values: new object[,]
                {
                    { 2, 1, 4, "Squat", 15, 3, 0, 250 },
                    { 1, 10, 4, "Bench Press", 8, 3, 1, 180 }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "FirstName", "LastName", "PasswordHash", "PasswordSalt", "UserName" },
                values: new object[,]
                {
                    { 1, "a@gmail.com", "Andrew", "Philpott", new byte[] { 72, 13, 104, 149, 133, 49, 53, 25, 157, 98, 72, 115, 151, 58, 150, 122, 82, 87, 135, 156, 56, 217, 193, 217, 82, 246, 90, 60, 12, 59, 170, 147, 46, 77, 147, 141, 155, 104, 81, 205, 4, 248, 155, 202, 164, 49, 98, 68, 116, 94, 225, 226, 85, 193, 111, 58, 48, 246, 190, 111, 130, 224, 203, 141 }, new byte[] { 150, 185, 20, 92, 26, 175, 214, 159, 175, 37, 207, 214, 253, 75, 134, 41, 119, 97, 234, 17, 240, 48, 93, 20, 119, 72, 192, 116, 190, 76, 5, 218, 125, 228, 32, 188, 61, 213, 75, 245, 46, 114, 42, 4, 29, 46, 79, 104, 143, 73, 192, 106, 116, 112, 194, 113, 137, 167, 212, 112, 9, 25, 111, 170, 241, 70, 64, 8, 63, 56, 120, 96, 223, 141, 191, 130, 23, 77, 197, 94, 179, 35, 16, 175, 11, 119, 254, 173, 55, 118, 234, 134, 83, 225, 161, 107, 2, 121, 31, 162, 69, 165, 36, 40, 185, 172, 31, 9, 150, 5, 98, 22, 159, 105, 231, 118, 231, 255, 88, 138, 252, 252, 3, 23, 250, 71, 83, 90 }, "Nxtstp" },
                    { 2, "b@gmail.com", "b", "b", new byte[] { 72, 13, 104, 149, 133, 49, 53, 25, 157, 98, 72, 115, 151, 58, 150, 122, 82, 87, 135, 156, 56, 217, 193, 217, 82, 246, 90, 60, 12, 59, 170, 147, 46, 77, 147, 141, 155, 104, 81, 205, 4, 248, 155, 202, 164, 49, 98, 68, 116, 94, 225, 226, 85, 193, 111, 58, 48, 246, 190, 111, 130, 224, 203, 141 }, new byte[] { 150, 185, 20, 92, 26, 175, 214, 159, 175, 37, 207, 214, 253, 75, 134, 41, 119, 97, 234, 17, 240, 48, 93, 20, 119, 72, 192, 116, 190, 76, 5, 218, 125, 228, 32, 188, 61, 213, 75, 245, 46, 114, 42, 4, 29, 46, 79, 104, 143, 73, 192, 106, 116, 112, 194, 113, 137, 167, 212, 112, 9, 25, 111, 170, 241, 70, 64, 8, 63, 56, 120, 96, 223, 141, 191, 130, 23, 77, 197, 94, 179, 35, 16, 175, 11, 119, 254, 173, 55, 118, 234, 134, 83, 225, 161, 107, 2, 121, 31, 162, 69, 165, 36, 40, 185, 172, 31, 9, 150, 5, 98, 22, 159, 105, 231, 118, 231, 255, 88, 138, 252, 252, 3, 23, 250, 71, 83, 90 }, "b" }
                });

            migrationBuilder.InsertData(
                table: "Workouts",
                columns: new[] { "Id", "Name", "Notes", "UserId" },
                values: new object[] { 1, "Full Body", "Rest 1 minute between sets", 1 });

            migrationBuilder.InsertData(
                table: "ExerciseMuscles",
                columns: new[] { "Id", "ExerciseId", "MuscleId", "Primary" },
                values: new object[,]
                {
                    { 1, 1, 1, false },
                    { 60, 18, 11, true },
                    { 59, 17, 11, true },
                    { 58, 16, 11, true },
                    { 57, 14, 11, false },
                    { 56, 13, 11, false },
                    { 55, 12, 11, false },
                    { 54, 11, 11, false },
                    { 61, 19, 11, true },
                    { 53, 10, 11, false },
                    { 51, 13, 10, false },
                    { 50, 12, 10, true },
                    { 49, 11, 10, true },
                    { 48, 10, 10, true },
                    { 47, 26, 9, false },
                    { 46, 25, 9, true },
                    { 45, 24, 9, true },
                    { 52, 14, 10, false },
                    { 62, 20, 11, false },
                    { 64, 10, 12, true },
                    { 65, 12, 12, true },
                    { 82, 23, 14, false },
                    { 81, 22, 14, false },
                    { 80, 20, 14, false },
                    { 79, 18, 14, false },
                    { 78, 16, 14, false },
                    { 77, 15, 14, false },
                    { 76, 14, 14, false },
                    { 75, 13, 14, false },
                    { 74, 4, 14, false },
                    { 73, 23, 13, true },
                    { 72, 16, 13, false },
                    { 71, 15, 13, false },
                    { 70, 14, 13, false },
                    { 69, 13, 13, false },
                    { 68, 22, 12, true },
                    { 67, 21, 12, true },
                    { 66, 17, 12, false },
                    { 44, 12, 9, false },
                    { 43, 4, 9, false },
                    { 42, 1, 9, true },
                    { 20, 3, 4, true },
                    { 19, 2, 4, true },
                    { 18, 1, 4, true },
                    { 17, 27, 3, true },
                    { 16, 6, 3, true },
                    { 15, 4, 3, true },
                    { 14, 3, 3, true },
                    { 13, 2, 3, false },
                    { 41, 20, 8, true },
                    { 12, 1, 3, false },
                    { 10, 4, 2, true },
                    { 9, 3, 2, true },
                    { 8, 2, 2, true },
                    { 7, 1, 2, true },
                    { 6, 8, 1, true },
                    { 5, 7, 1, true },
                    { 4, 6, 1, false },
                    { 11, 5, 2, true },
                    { 21, 4, 4, true },
                    { 22, 27, 4, true },
                    { 23, 1, 5, true },
                    { 40, 19, 8, false },
                    { 39, 18, 8, false },
                    { 38, 17, 8, false },
                    { 37, 16, 8, true },
                    { 36, 15, 8, false },
                    { 35, 14, 8, false },
                    { 34, 4, 8, false },
                    { 33, 15, 7, true },
                    { 32, 14, 7, true },
                    { 31, 13, 7, true },
                    { 30, 27, 6, true },
                    { 29, 4, 6, true },
                    { 28, 1, 6, false },
                    { 27, 26, 5, true },
                    { 26, 9, 5, true },
                    { 25, 4, 5, true },
                    { 24, 3, 5, true },
                    { 3, 4, 1, false },
                    { 2, 2, 1, false }
                });

            migrationBuilder.InsertData(
                table: "ExerciseWorkouts",
                columns: new[] { "Id", "ExerciseId", "WorkoutId" },
                values: new object[,]
                {
                    { 2, 2, 1 },
                    { 1, 1, 1 }
                });

            migrationBuilder.InsertData(
                table: "Sessions",
                columns: new[] { "Id", "Rating", "UserId", "WorkoutEnd", "WorkoutId", "WorkoutStart" },
                values: new object[] { 1, (byte)5, 1, "07/20/2020 15:10", 1, "07/20/2020 14:10" });

            migrationBuilder.CreateIndex(
                name: "IX_ExerciseMuscles_ExerciseId",
                table: "ExerciseMuscles",
                column: "ExerciseId");

            migrationBuilder.CreateIndex(
                name: "IX_ExerciseMuscles_MuscleId",
                table: "ExerciseMuscles",
                column: "MuscleId");

            migrationBuilder.CreateIndex(
                name: "IX_ExerciseWorkouts_ExerciseId",
                table: "ExerciseWorkouts",
                column: "ExerciseId");

            migrationBuilder.CreateIndex(
                name: "IX_ExerciseWorkouts_WorkoutId",
                table: "ExerciseWorkouts",
                column: "WorkoutId");

            migrationBuilder.CreateIndex(
                name: "IX_Sessions_WorkoutId",
                table: "Sessions",
                column: "WorkoutId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ExerciseMuscles");

            migrationBuilder.DropTable(
                name: "ExerciseWorkouts");

            migrationBuilder.DropTable(
                name: "Records");

            migrationBuilder.DropTable(
                name: "Recovery");

            migrationBuilder.DropTable(
                name: "Sessions");

            migrationBuilder.DropTable(
                name: "UserExercises");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Muscle");

            migrationBuilder.DropTable(
                name: "Exercises");

            migrationBuilder.DropTable(
                name: "Workouts");
        }
    }
}
