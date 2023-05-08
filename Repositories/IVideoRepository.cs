using System.Collections.Generic;
using NotMeTube.Models;

namespace NotMeTube.Repositories
{
    public interface IVideoRepository
    {
        void DeleteVideo(int id);
        void DeleteVideoFromPlaylist(PlaylistVideo playlistVideo);
        public List<Video> GetAll();
        Video GetVideoById(int Id);
        List<Video> GetVideosByPlaylistId(int id);
        public List<Video> GetVideosByUserId(int Id);
        void SaveVideo(Video video);
        void SaveVideoToPlaylist(PlaylistVideo playlistVideo);
    }
}
