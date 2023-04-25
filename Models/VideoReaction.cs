namespace NotMeTube.Models
{
    public class VideoReaction
    {
        public int Id { get; set; }
        public int VideoId { get; set; }
        public int ReactionId { get; set; }
        public int UserProfileId { get; set; }
    }
}
