namespace SimpleTODO.DAL.Interfaces;

public interface IBaseRepository<T>
{
    Task Create(T entity);
    Task<T> Update(T entity);
    Task Delete(T entity);
    IQueryable<T> GetAll();
}
