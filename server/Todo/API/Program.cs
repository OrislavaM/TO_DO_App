using API.Handlers;
using API.Middleware;

var builder = WebApplication.CreateBuilder(args);

// MVC
builder.AddMvc();

// Docs
builder.AddSwagger();

// auth 
builder.Services.AddScoped<IAuthHandler, AuthHandler>();
builder.AddJwtAuthentication();

// cors
builder.AddEnvCors();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwaggerWithUi();
}

// Use middle
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.UseEnvCors();

// run this beast
app.Run();