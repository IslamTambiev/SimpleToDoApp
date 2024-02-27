using Microsoft.EntityFrameworkCore;
using SimpleTODO.DAL;
using SimpleTODO.DAL.Interfaces;
using SimpleTODO.DAL.Repositories;
using SimpleTODO.Domain.Entity;
using SimpleTODO.Server.Data;
using SimpleTODO.Server.Services;
using SimpleTODO.Server.Services.Interfaces;
using SimpleTODO.Service.Implementations;
using SimpleTODO.Service.Interfaces;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("SqliteConnection");
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlite(connectionString);
});

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IBaseRepository<TaskEntity>, TaskRepository>();
builder.Services.AddScoped<ITaskService, TaskService>();

builder.Services.AddTransient<IPostsService, PostsService>();
builder.Services.AddSingleton<MyDataContext>();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
