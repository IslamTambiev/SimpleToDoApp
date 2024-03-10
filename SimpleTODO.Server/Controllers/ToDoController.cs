using Microsoft.AspNetCore.Mvc;
using Microsoft.DotNet.MSIdentity.Shared;
using SimpleTODO.Domain.Enum;
using SimpleTODO.Domain.Filters.Task;
using SimpleTODO.Domain.ViewModels.Task;
using SimpleTODO.Service.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace SimpleTODO.Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ToDoController : ControllerBase
{
    private readonly ITaskService _taskService;
    public ToDoController(ITaskService taskService)
    {
        _taskService = taskService;
    }

    [HttpPost]
    public async Task<IActionResult> CreateTask(CreateTaskViewModel model)
    {
        var response = await _taskService.CreateTask(model);
        if (response.StatusCode == Domain.Enum.StatusCode.OK)
        {
            return Ok(new { description = response.Description });
        }
        return BadRequest(new { description = response.Description });
    }

    [HttpPost]
    [Route("task-handler")]
    public async Task<IResult> TaskHandler(TaskFilter model)
    {
        var response = await _taskService.GetTasks(model);
        return Results.Json(new { data = response.Data });
    }

    [HttpGet]
    public async Task<IResult> GetAllTasks()
    {
        var response = await _taskService.GetAllTasks();
        return Results.Json(new { data = response.Data });
    }
    [HttpGet]
    [Route("priorities")]
    public IActionResult GetPriorities()
    {
        var priorities = Enum.GetValues(typeof(Priority))
                                 .Cast<Priority>()
                                 .Select(p => new
                                 {
                                     Value = p,
                                     Name = GetEnumDisplayName(p)
                                 })
                                 .ToList();

        return Ok(priorities);
    }
    // Retrieves the display name of the given enum value, if available, by fetching the corresponding display attribute. Returns the display name if available, otherwise returns the string representation of the enum value.
    private string GetEnumDisplayName(Enum value)
    {
        var displayAttribute = value.GetType()
                                    .GetField(value.ToString())
                                    .GetCustomAttributes(typeof(DisplayAttribute), false)
                                    .SingleOrDefault() as DisplayAttribute;

        return displayAttribute?.Name ?? value.ToString();
    }

}
