using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using API.Constants;
using API.Models.Auth;
using API.Models.Users;
using Microsoft.IdentityModel.Tokens;
using Authorization = API.Models.Auth.Authorization;

namespace API.Handlers;

public interface IAuthHandler
{
    public string HashUserPassword(string salt, string password);
    public Authorization CreateUserAuthorisation(AuthUser authUser);
}

public class AuthHandler : IAuthHandler
{
    
    private readonly JwtSecurityTokenHandler _tokenHandler;
    private readonly SigningCredentials _credentials;
    
    public AuthHandler()
    {
        _tokenHandler = new JwtSecurityTokenHandler();
        _credentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.ASCII.GetBytes(EnvironmentMode.Secret)), SecurityAlgorithms.HmacSha256Signature);
    }

    public Authorization CreateUserAuthorisation(AuthUser authUser)
    {
        var expiresAt = DateTime.UtcNow.Add(TimeSpan.FromHours(4));
        var securityToken = _tokenHandler.CreateToken(new SecurityTokenDescriptor
        {
            SigningCredentials = _credentials,
            Expires = expiresAt,
            Subject = new ClaimsIdentity(new List<Claim>
            {
                new(JwtClaimNames.AccessTokenId, Guid.NewGuid().ToString()),
                new(JwtClaimNames.UserId, authUser.Id),
                new(JwtClaimNames.UserName, authUser.UserName)
            }.Where(c => !string.IsNullOrEmpty(c.Value))),
        });

        var accessToken = _tokenHandler.WriteToken(securityToken);
        var authorization = new Authorization
        {
            Id = Guid.NewGuid().ToString(),
            TokenType = "Bearer",
            AccessToken = accessToken,
            ExpiresAt = expiresAt,
        };

        return authorization;
    }
    
    public string HashUserPassword(string salt, string password)
    {
        var sha256 = SHA256.Create();
        var passwordHash = sha256.ComputeHash(Encoding.UTF8.GetBytes($"{salt}.{EnvironmentMode.Secret}.{password}"));
        var passwordHashB64 = Convert.ToBase64String(passwordHash);
        return passwordHashB64;
    }
}