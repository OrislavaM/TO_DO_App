using Newtonsoft.Json;

namespace API.Models.Users
{
    public class AuthUser
    {
        public string Id { get; set; }
        public string UserName { get; set; }

        [JsonIgnore] public string PasswordHashB64 { get; set; }
    
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}