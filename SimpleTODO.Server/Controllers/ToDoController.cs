using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SimpleTODO.Domain.ViewModels.Task;
using SimpleTODO.Service.Interfaces;

namespace SimpleTODO.Server.Controllers;

[Route("apitodo/[controller]")]
[ApiController]
public class ToDoController : ControllerBase
{
    private readonly ITaskService _taskService;

    public ToDoController(ITaskService taskService)
    {
        _taskService = taskService;
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateTaskViewModel model)
    {
        var response = await _taskService.CreateTask(model);
        if (response.StatusCode == Domain.Enum.StatusCode.OK)
        {
            return Ok(new { description = response.Description });
        }
        return BadRequest(new { description = response.Description });
    }
}
