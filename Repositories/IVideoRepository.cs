using System.Collections.Generic;
using NotMeTube.Models;

namespace NotMeTube.Repositories
{
    public interface IVideoRepository
    {
        void DeleteVideo(int id);
        public List<Video> GetAll();
        public List<Video> GetVideosByUserId(int Id);
        void SaveVideo(Video video);
        void SaveVideoToPlaylist(PlaylistVideo playlistVideo);
    }
}
