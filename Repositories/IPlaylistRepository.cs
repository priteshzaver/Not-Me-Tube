using System.Collections.Generic;
using NotMeTube.Models;

namespace NotMeTube.Repositories
{
    public interface IPlaylistRepository
    {
        void Add(Playlist playlist);
        void Delete(int id);
        List<Playlist> GetPlaylistsWithVideos();
        void Update(Playlist playlist);
        public List<Playlist> GetPlaylistsWithVideosByUserId(int id);
    }
}