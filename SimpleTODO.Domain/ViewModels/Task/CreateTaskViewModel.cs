using SimpleTODO.Domain.Enum;

namespace SimpleTODO.Domain.ViewModels.Task;

public class CreateTaskViewModel
{
    public string Name { get; set; }
    public string Description { get; set; }
    public Priority Priority { get; set; }
    public void Vallidate()
    {
        string message = "Укажите название задачи!";

        if (string.IsNullOrWhiteSpace(Name))
        {
            throw new ArgumentNullException(Name, message);
        }
        if (string.IsNullOrWhiteSpace(Description))
        {
            throw new ArgumentNullException(Description, message);
        }
    }
}
