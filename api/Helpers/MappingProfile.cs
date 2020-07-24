using AutoMapper;
using BodyJournalAPI.Entities;
using BodyJournalAPI.Models;

namespace BodyJournalAPI.Helpers
{
  public class MappingProfile : Profile
  {
    public MappingProfile()
    {
      #region Exercise
      CreateMap<Exercise, ViewExercise>();

      CreateMap<CreateExercise, Exercise>();

      CreateMap<UpdateExercise, Exercise>();
      #endregion

      #region Workout
      CreateMap<Workout, ViewWorkout>();

      CreateMap<CreateWorkout, Workout>();

      CreateMap<UpdateWorkout, Workout>();
      #endregion

      #region Recovery
      CreateMap<CreateRecovery, Recovery>();

      CreateMap<UpdateRecovery, Recovery>();

      CreateMap<Recovery, ViewRecovery>();
      #endregion

      #region Records
      CreateMap<CreateRecord, Record>();

      CreateMap<UpdateRecord, Record>();

      CreateMap<Record, ViewRecord>();
      #endregion

      #region Session
      CreateMap<CreateSession, Session>();

      CreateMap<UpdateSession, Session>();

      CreateMap<Session, ViewSession>();
      #endregion

      #region User
      CreateMap<User, ViewUser>();

      CreateMap<RegisterUser, User>();

      CreateMap<UpdateUser, User>();
      #endregion
    }
  }
}