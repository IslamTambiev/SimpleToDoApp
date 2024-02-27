using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using SimpleTODO.DAL.Interfaces;
using SimpleTODO.Domain.Entity;
using SimpleTODO.Domain.Enum;
using SimpleTODO.Domain.Response;
using SimpleTODO.Domain.ViewModels.Task;
using SimpleTODO.Service.Interfaces;

namespace SimpleTODO.Service.Implementations;

public class TaskService : ITaskService
{
    private readonly IBaseRepository<TaskEntity> _taskRepository;
    private ILogger<TaskService> _logger;

    public TaskService(IBaseRepository<TaskEntity> taskRepository,
        ILogger<TaskService> logger)
    {
        _taskRepository = taskRepository;
        _logger = logger;
    }

    public async Task<IBaseResponse<TaskEntity>> CreateTask(CreateTaskViewModel model)
    {
        try
        {
            _logger.LogInformation($"Запрос на создание задачи - {model.Name}");

            var task = await _taskRepository.GetAll()
                .Where(x => x.Created.Date == DateTime.Today)
                .FirstOrDefaultAsync(x => x.Name == model.Name);
            if (task != null)
            {
                return new BaseResponse<TaskEntity>()
                {
                    Description = "Задача с таким именем уже существует",
                    StatusCode = StatusCode.TaskAlreadyExists
                };
            }

            task = new TaskEntity()
            {
                Name = model.Name,
                Description = model.Description,
                IsDone = false,
                Priority = model.Priority,
                Created = DateTime.Now,
            };

            _logger.LogInformation($"Задача создана: {task.Name} - {task.Created}");
            return new BaseResponse<TaskEntity>()
            {
                Description = "Задача создана",
                StatusCode = StatusCode.OK,
            };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"[TaskService.Create]: {ex.Message}");
            return new BaseResponse<TaskEntity>()
            {
                StatusCode = StatusCode.InternalServerError
            };
        }
    }
}
