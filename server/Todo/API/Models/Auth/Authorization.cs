namespace API.Models.Auth;

public class Authorization
{
    public string Id { get; set; }
    public string TokenType { get; set; }
        
    public string AccessToken { get; set; }
    public DateTime ExpiresAt { get; set; }
        
    public DateTime CreatedAt { get; set; } = DateTime.Now;
}