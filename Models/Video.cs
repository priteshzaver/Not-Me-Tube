using System;

namespace NotMeTube.Models
{
    public class Video
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string YouTubeVideoId { get; set; }
        public DateTime DateCreated { get; set; }
        public int UserProfileId { get; set; }
        public bool IsApproved { get; set; }
        public UserProfile UserProfile { get; set; }
    }
}
