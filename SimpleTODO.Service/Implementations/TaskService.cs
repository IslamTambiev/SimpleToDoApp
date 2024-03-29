﻿using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using SimpleTODO.DAL.Interfaces;
using SimpleTODO.Domain.Entity;
using SimpleTODO.Domain.Enum;
using SimpleTODO.Domain.Extentions;
using SimpleTODO.Domain.Filters.Task;
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

    public async Task<IBaseResponse<bool>> CompleteTask(long id)
    {
        try
        {
            var task = await _taskRepository.GetAll()
                .FirstOrDefaultAsync(x => x.Id == id );

            if (task == null)
            {
                return new BaseResponse<bool>()
                {
                    Description = "Задача не найдена",
                    StatusCode = StatusCode.TaskNotFound
                };
            }
            task.IsDone = true;
            await _taskRepository.Update(task);

            return new BaseResponse<bool>()
            {
                Description = "Задача завершена",
                StatusCode = StatusCode.OK
            };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"[TaskService.Complete]: {ex.Message}");
            return new BaseResponse<bool>()
            {
                Description = $"{ex.Message}",
                StatusCode = StatusCode.InternalServerError
            };
        }
    }

    public async Task<IBaseResponse<TaskEntity>> CreateTask(CreateTaskViewModel model)
    {
        try
        {
            model.Vallidate();

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
            await _taskRepository.Create(task);

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
                Description = $"{ex.Message}",
                StatusCode = StatusCode.InternalServerError
            };
        }
    }

    public async Task<IBaseResponse<IEnumerable<TaskViewModel>>> GetAllTasks()
    {
        try
        {
            var tasks = await _taskRepository.GetAll()
                .Select(x => new TaskViewModel()
                {
                    Id = x.Id,
                    Name = x.Name,
                    Description = x.Description,
                    IsDone = x.IsDone == true ? "Выполнено" : "Не выполнено",
                    Priority = x.Priority.GetDisplayName(),
                    Created = x.Created.ToLongDateString()
                })
                .ToListAsync();

            return new BaseResponse<IEnumerable<TaskViewModel>>()
            {
                Data = tasks,
                StatusCode = StatusCode.OK
            };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"[TaskService.Create]: {ex.Message}");
            return new BaseResponse<IEnumerable<TaskViewModel>>()
            {
                Description = $"{ex.Message}",
                StatusCode = StatusCode.InternalServerError
            };
        }
    }

    public async Task<IBaseResponse<IEnumerable<TaskCompletedViewModel>>> GetCompletedTasks()
    {
        try
        {
            var tasks = await _taskRepository.GetAll()
                .Where(x => x.IsDone)
                .Where(x => x.Created.Date == DateTime.Today)
                .Select(x => new TaskCompletedViewModel()
                {
                    Id = x.Id,
                    Name = x.Name,
                    Description = x.Description,
                })
                .ToListAsync();

            return new BaseResponse<IEnumerable<TaskCompletedViewModel>>()
            {
                Data = tasks,
                StatusCode = StatusCode.OK
            };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"[TaskService.GetCompletedTasks]: {ex.Message}");
            return new BaseResponse<IEnumerable<TaskCompletedViewModel>>()
            {
                Description = $"{ex.Message}",
                StatusCode = StatusCode.InternalServerError
            };
        }
    }

    public async Task<IBaseResponse<IEnumerable<TaskViewModel>>> GetTasks(TaskFilter filter)
    {
        try
        {
            var tasks = await _taskRepository.GetAll()
                //.Where(x =>! x.IsDone)
                .WhereIf(!string.IsNullOrEmpty(filter.Name), x => x.Name.Contains(filter.Name))
                .WhereIf(filter.Priority.HasValue, x => x.Priority == filter.Priority)
                .Select(x => new TaskViewModel()
                {
                    Id = x.Id,
                    Name = x.Name,
                    Description = x.Description,
                    IsDone = x.IsDone == true ? "Выполнено" : "Не выполнено",
                    Priority = x.Priority.GetDisplayName(),
                    Created = x.Created.ToLongDateString()
                })
                .ToListAsync();

            return new BaseResponse<IEnumerable<TaskViewModel>>()
            {
                Data = tasks,
                StatusCode = StatusCode.OK
            };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"[TaskService.Create]: {ex.Message}");
            return new BaseResponse<IEnumerable<TaskViewModel>>()
            {
                Description = $"{ex.Message}",
                StatusCode = StatusCode.InternalServerError
            };
        }
    }
}
