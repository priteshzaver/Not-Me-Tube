using System;

namespace NotMeTube.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string Message { get; set; }
        public int VideoId { get; set; }
        public int UserProfileId { get; set; }
        public DateTime CreateDateTime { get; set; }
        public UserProfile UserProfile { get; set; }
    }
}
