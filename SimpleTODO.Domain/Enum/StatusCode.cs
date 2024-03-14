namespace SimpleTODO.Domain.Enum;

public enum StatusCode
{
    TaskAlreadyExists = 1,
    TaskNotFound = 2,

    OK = 200,
    InternalServerError = 500
}
