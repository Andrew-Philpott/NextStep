
using BodyJournalAPI.Helpers;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Linq.Expressions;
using BodyJournalAPI.Entities;

namespace BodyJournalAPI.Services
{
  public interface IServiceBase<T>
  {
    IQueryable<T> FindAll();
    IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression);
    void Create(T entity);
    void Update(T entity);
    void Delete(T entity);
  }
  public abstract class ServiceBase<T> : IServiceBase<T> where T : class
  {
    protected BodyJournalContext BodyJournalContext { get; set; }

    public ServiceBase(BodyJournalContext bodyJournalContext)
    {
      this.BodyJournalContext = bodyJournalContext;
    }

    public IQueryable<T> FindAll()
    {
      return this.BodyJournalContext.Set<T>().AsNoTracking();
    }
    public IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression) => this.BodyJournalContext.Set<T>().Where(expression).AsNoTracking();

    public void Create(T entity)
    {
      this.BodyJournalContext.Set<T>().Add(entity);
    }
    public void Update(T entity)
    {
      this.BodyJournalContext.Set<T>().Update(entity);
    }
    public void Delete(T entity)
    {
      this.BodyJournalContext.Set<T>().Remove(entity);
    }
  }
}