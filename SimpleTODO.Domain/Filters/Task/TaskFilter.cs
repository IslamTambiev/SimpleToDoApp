using SimpleTODO.Domain.Enum;

namespace SimpleTODO.Domain.Filters.Task;

public class TaskFilter
{
    public string? Name { get; set; }
    public Priority? Priority { get; set; }

}
