using SimpleTODO.Domain.Entity;
using SimpleTODO.Domain.Filters.Task;
using SimpleTODO.Domain.Response;
using SimpleTODO.Domain.ViewModels.Task;

namespace SimpleTODO.Service.Interfaces;

public interface ITaskService
{
    Task<IBaseResponse<TaskEntity>> CreateTask(CreateTaskViewModel model);
    Task<IBaseResponse<IEnumerable<TaskViewModel>>> GetAllTasks();
    Task<IBaseResponse<IEnumerable<TaskViewModel>>> GetTasks(TaskFilter filter);
}
