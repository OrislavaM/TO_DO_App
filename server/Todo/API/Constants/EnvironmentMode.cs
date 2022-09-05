namespace API.Constants;

public static class EnvironmentMode
{
    public const string Secret = "THIS IS A TODO SECRET"; // Should be in cofigs
    
    public const string AppName = "Todo";
    public static string AppNameLower => AppName.ToLower();
    public const string Version = "0.1.0";

    public static string Environment =>
        System.Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Development";

    public static string EnvironmentLower => Environment.ToLower();
    public static bool IsProduction => EnvironmentLower == "production";
    public static bool IsDevelopment => EnvironmentLower == "development" || EnvironmentLower == "debug";
    public static bool IsStaging => EnvironmentLower == "staging";
    public static bool IsTest => EnvironmentLower == "test";
    public static string EnvironmentPrefix => $"{AppNameLower}-{EnvironmentLower}";
    public static string TablePrefix => $"{EnvironmentPrefix}-";

    public static string ClientHost
    {
        get
        {
            if (IsTest || IsDevelopment) return "http://localhost:3000";
            return IsStaging ? "staging.app.todo.dk" : "app.todo.dk";
        }
    }

    public static string ClientHostForEmail
    {
        get
        {
            if (IsTest || IsDevelopment) return ClientHost;
            return $"https://{ClientHost}";
        }
    }
}