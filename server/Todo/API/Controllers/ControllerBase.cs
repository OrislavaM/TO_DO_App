using API.Constants;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ControllerBase : Controller
{
    protected string CurrentUserId() => HttpContext.User.FindFirst(JwtClaimNames.UserId)?.Value;
}

