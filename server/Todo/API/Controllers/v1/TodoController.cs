using API.Context;
using API.Models;
using API.Models.Todos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.v1;

[ApiController]
[Route("api/web/v1/todos")]
[Authorize]
public class TodoController : ControllerBase
{
    private readonly ApiContext _context;

    public TodoController(ApiContext context)
    {
        _context = context;
    }
    
    [HttpPost]
    public async Task<ActionResult<Todo>> Create([FromBody] Todo request)
    {
        request.UserId = CurrentUserId();
        request.Id = Guid.NewGuid().ToString();
        
        await _context.Todos.AddAsync(request);
        await _context.SaveChangesAsync();
        return Ok(request);
    }

    [HttpGet("{id}")]
    public ActionResult<Todo> ReadOne([FromRoute] string id)
    {
        var existingTodo = _context.Todos.FirstOrDefault(u => u.Id == id);
        if (existingTodo == null) return ErrorResponse.NotFound("Task is not found");
        if (existingTodo.UserId != CurrentUserId()) return ErrorResponse.Forbidden("This is not your task");

        return Ok(existingTodo);
    }

    [HttpGet]
    public ActionResult<List<Todo>> ReadAll()
    {
        var userId = CurrentUserId();
        var existingTodo = _context.Todos.Where(u => u.UserId == userId).ToList();
        return Ok(existingTodo);
    }


    [HttpPut("{id}")]
    public async Task<ActionResult<Todo>> Update([FromRoute] string id, [FromBody] Todo request)
    {
        var existingTodo = _context.Todos.FirstOrDefault(u => u.Id == id);
        if (existingTodo == null) return ErrorResponse.NotFound("Task is not found");
        if (existingTodo.UserId != CurrentUserId()) return ErrorResponse.Forbidden("This is not your task");

        existingTodo.Title = request.Title;
        existingTodo.Description = request.Description;
        existingTodo.UpdatedAt = new DateTime();
        
        _context.Todos.Update(existingTodo);
        await _context.SaveChangesAsync();
        return Ok(existingTodo);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<Todo>> Delete([FromRoute] string id)
    {
        var existingTodo = _context.Todos.FirstOrDefault(u => u.Id == id);
        if (existingTodo == null) return ErrorResponse.NotFound("Task is not found");
        if (existingTodo.UserId != CurrentUserId()) return ErrorResponse.Forbidden("This is not your task");

        _context.Todos.Remove(existingTodo);
        await _context.SaveChangesAsync();
        return Ok();
    }
}