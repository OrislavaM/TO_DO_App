using API.Models.Todos;
using API.Models.Users;
using Microsoft.EntityFrameworkCore;

namespace API.Context;

public class ApiContext : DbContext
{
    public ApiContext(DbContextOptions<ApiContext> options)
        : base(options)
    {
    }

    public DbSet<AuthUser> Users { get; set; }
    public DbSet<Todo> Todos { get; set; }
}