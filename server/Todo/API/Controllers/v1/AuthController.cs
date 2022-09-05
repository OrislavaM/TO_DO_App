using API.Context;
using API.Handlers;
using API.Models;
using API.Models.Auth;
using API.Models.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.v1;

[ApiController]
[Route("api/web/v1/auth")]
public class AuthController : ControllerBase
{
    private readonly ApiContext _context;
    private readonly IAuthHandler _authHandler;

    public AuthController(ApiContext context, IAuthHandler authHandler)
    {
        _context = context;
        _authHandler = authHandler;
    }

    [HttpPost, AllowAnonymous]
    public ActionResult<SignInResponse> SignInWithEmail([FromBody] SignInWithUsernameRequest request)
    {
        var existingUser = _context.Users.FirstOrDefault(u => u.UserName == request.UserName);
        if (existingUser == null) return ErrorResponse.InvalidPasswordOrEmail();

        var passwordHashB64 = _authHandler.HashUserPassword(existingUser.Id, request.Password);
        if (passwordHashB64 != existingUser.PasswordHashB64) return ErrorResponse.InvalidPasswordOrEmail();

        var authorization =  _authHandler.CreateUserAuthorisation(existingUser);
        return Ok(
            new SignInResponse
            {
                Authorization = authorization,
                User = existingUser
            }
        );
    }

    [HttpPost("register"), AllowAnonymous]
    public async Task<ActionResult<AuthUser>> RegisterAuthUser([FromBody] RegisterRequest request)
    {
        var existingUser = _context.Users.FirstOrDefault(u => u.UserName == request.UserName);
        if (existingUser != null)
            return ErrorResponse.BadRequest("Username already in database");
        
        var id = Guid.NewGuid().ToString();
        var user = new AuthUser
        {
            Id = id,
            UserName = request.UserName,
            PasswordHashB64 = _authHandler.HashUserPassword(id, request.Password),
            CreatedAt = DateTime.Now
        };
        
        await _context.Users.AddAsync(user);
        await _context.SaveChangesAsync();

        var all = _context.Users.Where(u => true).ToList();
        return Ok(user);
    }
}