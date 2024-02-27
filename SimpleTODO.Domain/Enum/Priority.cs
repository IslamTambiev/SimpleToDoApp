using System.ComponentModel.DataAnnotations;

namespace SimpleTODO.Domain.Enum;

public enum Priority
{
    [Display(Name = "Простая")]
    Easy = 1,
    [Display(Name = "Средняя")]
    Medium = 2,
    [Display(Name = "Сложная")]
    Hard = 3
}
