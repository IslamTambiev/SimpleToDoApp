using Microsoft.EntityFrameworkCore;
using SimpleTODO.Domain.Entity;

namespace SimpleTODO.DAL;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
        bool isCreated = Database.EnsureCreated();
        Console.WriteLine("================================= isCreated: ");
        Console.WriteLine(isCreated);
    }
    public DbSet<TaskEntity> Tasks { get; set; }
}
