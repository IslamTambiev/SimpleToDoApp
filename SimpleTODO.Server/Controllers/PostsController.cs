using Microsoft.AspNetCore.Mvc;
using SimpleTODO.Server.Models;
using SimpleTODO.Server.Services.Interfaces;

namespace SimpleTODO.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PostsController : ControllerBase
    {
        private IPostsService _postsService;
        public PostsController(IPostsService postsService)
        {
            _postsService = postsService;
        }
        [HttpPost]
        public PostModel Create(PostModel model)
        {
            return _postsService.Create(model);
        }
        [HttpPatch]
        public PostModel Update(PostModel model)
        {
            return _postsService.Update(model);
        }
        [HttpGet("{id}")]
        public PostModel Get(int id)
        {
            return _postsService.Get(id);
        }
        [HttpGet]
        public IEnumerable<PostModel> GetAll()
        {
            return _postsService.GetAll();
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _postsService.Delete(id);

            return Ok();
        }
    }
}
