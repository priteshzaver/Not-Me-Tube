using System.Collections.Generic;
using NotMeTube.Models;

namespace NotMeTube.Repositories
{
    public interface IVideoRepository
    {
        public List<Video> GetAll();
        public List<Video> GetVideosByUserId(int Id);
    }
}
