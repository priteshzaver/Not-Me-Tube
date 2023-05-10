using System.Collections.Generic;

namespace NotMeTube.Models
{
    public class Playlist
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int UserProfileId { get; set; }
        public bool IsPublic { get; set; }
        public List<PlaylistVideo> PlaylistVideos { get; set; }
        public List<Video> Videos { get; set; }
        public UserProfile UserProfile { get; set; }
    }
}
