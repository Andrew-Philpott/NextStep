using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using BodyJournalAPI.Helpers;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using BodyJournalAPI.Services;
using AutoMapper;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace BodyJournalAPI
{
  public class Startup
  {
    private readonly IConfiguration _configuration;

    public Startup(IConfiguration configuration)
    {
      _configuration = configuration;
    }
    public void ConfigureServices(IServiceCollection services)
    {
      services.AddDbContext<DataContext>(ServiceLifetime.Transient);
      services.AddCors();
      services.AddControllers().AddNewtonsoftJson(options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

      services.AddAutoMapper(typeof(Startup));

      var appSettingsSection = _configuration.GetSection("AppSettings");
      services.Configure<AppSettings>(appSettingsSection);

      var appSettings = appSettingsSection.Get<AppSettings>();
      var key = Encoding.ASCII.GetBytes(appSettings.Secret);

      services.AddAuthentication(x =>
      {
        x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
      })
      .AddJwtBearer(x =>
      {
        x.Events = new JwtBearerEvents
        {
          OnTokenValidated = context =>
                {
                  var userService = context.HttpContext.RequestServices.GetRequiredService<BodyJournalAPI.Services.IUserService>();
                  var userId = int.Parse(context.Principal.Identity.Name);
                  var user = userService.GetUserById(userId);
                  if (user == null)
                  {
                    context.Fail("Unauthorized");
                  }
                  return Task.CompletedTask;
                }
        };
        x.RequireHttpsMetadata = false;
        x.SaveToken = true;
        x.TokenValidationParameters = new TokenValidationParameters
        {
          ValidateIssuerSigningKey = true,
          IssuerSigningKey = new SymmetricSecurityKey(key),
          ValidateIssuer = false,
          ValidateAudience = false
        };
      });

      services.AddScoped<IUserService, UserService>();
      services.AddScoped<IExerciseService, ExerciseService>();
      services.AddScoped<IWorkoutService, WorkoutService>();
      services.AddScoped<IRecordService, RecordService>();
      services.AddScoped<IUserExerciseService, UserExerciseService>();
      services.AddScoped<IRecoveryService, RecoveryService>();
      services.AddScoped<ISessionService, SessionService>();
      services.AddScoped<IExerciseWorkoutService, ExerciseWorkoutService>();
    }
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env, DataContext context)
    {
      context.Database.Migrate();

      app.UseRouting();

      app.UseCors(x => x
          .AllowAnyOrigin()
          .AllowAnyMethod()
          .AllowAnyHeader());

      app.UseAuthentication();
      app.UseAuthorization();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
      });
    }
  }
}