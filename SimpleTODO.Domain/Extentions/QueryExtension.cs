using System.Linq.Expressions;

namespace SimpleTODO.Domain.Extentions;

public static class QueryExtension
{
    public static IQueryable<T> WhereIf<T>(this IQueryable<T> query, bool condition, Expression<Func<T, bool>> predicate)
    {
        return condition ? query.Where(predicate) : query;
    }
}
