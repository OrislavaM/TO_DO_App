namespace API.Middleware;

public static class CorsPolicyExtension
{
    private static class CorsPolicies
    {
        public const string Development = nameof(Development);
        public const string Production = nameof(Production);
    }

    public static IApplicationBuilder UseEnvCors(this WebApplication app)
    {
        var corsPolicyName = app.Environment.IsProduction() ? CorsPolicies.Production : CorsPolicies.Development;
        return app.UseCors(corsPolicyName);
    }

    public static WebApplicationBuilder AddEnvCors(this WebApplicationBuilder builder)
    {
        builder.Services.AddCors(
            options =>
            {
                options.AddPolicy(
                    CorsPolicies.Development,
                    c => c
                        .SetIsOriginAllowed(_ => true)
                        .AllowCredentials()
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                );
                options.AddPolicy(
                    CorsPolicies.Production,
                    c => c
                        .SetIsOriginAllowed(_ => true)
                        .AllowCredentials()
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                );
            }
        );

        return builder;
    }
}