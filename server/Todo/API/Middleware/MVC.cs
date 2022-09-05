using API.Constants;
using API.Context;
using Microsoft.EntityFrameworkCore;

namespace API.Middleware;

public static class MVC
{
    public static WebApplicationBuilder AddMvc(this WebApplicationBuilder builder)
    {
        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddDbContext<ApiContext>(
            opt =>
                opt.UseInMemoryDatabase(databaseName: EnvironmentMode.AppName), ServiceLifetime.Scoped,
            ServiceLifetime.Scoped);

        return builder;
    }
}