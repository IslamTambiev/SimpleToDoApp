using Microsoft.EntityFrameworkCore;
using SimpleTODO.Domain.Entity;

namespace SimpleTODO.DAL;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
        //Database.EnsureDeleted();
        bool isCreated = Database.EnsureCreated();
        Console.Write("INFO DbIsCreated: ");
        Console.WriteLine(isCreated);
    }
    public DbSet<TaskEntity> Tasks { get; set; }
}
