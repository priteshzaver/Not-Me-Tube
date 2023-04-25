using System;

namespace NotMeTube.Models
{
    public class PlaylistSubscription
    {
        public int Id { get; set; }
        public int SubscriberUserProfileId { get; set; }
        public int PlaylistId { get; set; }
        public DateTime BeginDateTime { get; set; }
        public DateTime EndDateTime { get; set; }
    }
}
