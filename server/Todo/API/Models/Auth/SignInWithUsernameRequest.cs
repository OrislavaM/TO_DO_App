namespace API.Models.Auth;

public class SignInWithUsernameRequest
{
    public string UserName { get; set; }
    public string Password { get; set; }
}