using Microsoft.AspNetCore.Mvc;
using SimpleTODO.Server.Models;

namespace SimpleTODO.Server.Services.Interfaces
{
    public interface IPostsService
    {
        PostModel Create(PostModel model);
        PostModel Update(PostModel model);
        PostModel Get(int id);
        List<PostModel> GetAll();
        void Delete(int id);
    }
}
