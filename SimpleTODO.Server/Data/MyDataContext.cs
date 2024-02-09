using SimpleTODO.Server.Models;

namespace SimpleTODO.Server.Data
{
    public class MyDataContext
    {
        public List<PostModel> Posts {  get; set; }
        public MyDataContext()
        {
            Posts = new List<PostModel>();
        }
    }
}
