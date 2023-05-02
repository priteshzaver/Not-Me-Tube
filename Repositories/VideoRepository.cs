using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using NotMeTube.Models;
using NotMeTube.Utils;

namespace NotMeTube.Repositories
{
    public class VideoRepository : BaseRepository, IVideoRepository
    {
        public VideoRepository(IConfiguration configuration) : base(configuration) { }
        public List<Video> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT v.Id AS VideoId, v.Title, v.Description, v.YouTubeVideoId, v.DateCreated AS VideoDateCreated, v.UserProfileId As VideoUserProfileId, v.IsApproved,
                                        up.DisplayName, up.Email, up.CreateDateTime AS UserProfileDateCreated, up.ImageLocation AS UserProfileImageUrl
                                        FROM Video v
                                        JOIN UserProfile up ON v.UserProfileId = up.Id";

                    using (var reader = cmd.ExecuteReader())
                    {
                        var videos = new List<Video>();
                        while (reader.Read())
                        {
                            videos.Add(NewVideoFromReader(reader));
                        }
                        return videos;
                    }
                }
            }
        }

        public List<Video> GetVideosByUserId(int Id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT v.Id AS VideoId, v.Title, v.Description, v.YouTubeVideoId, v.DateCreated AS VideoDateCreated, v.UserProfileId As VideoUserProfileId, v.IsApproved,
                                        up.DisplayName, up.Email, up.CreateDateTime AS UserProfileDateCreated, up.ImageLocation AS UserProfileImageUrl
                                        FROM Video v
                                        JOIN UserProfile up ON v.UserProfileId = up.Id
                                        WHERE v.UserProfileId = @Id";
                    DbUtils.AddParameter(cmd, "id", Id);

                    using (var reader = cmd.ExecuteReader())
                    {
                        var videos = new List<Video>();
                        while (reader.Read())
                        {
                            videos.Add(NewVideoFromReader(reader));
                        }
                        return videos;
                    }
                }
            }
        }

        private Video NewVideoFromReader(SqlDataReader reader)
        {
            return new Video()
            {
                Id = DbUtils.GetInt(reader, "VideoId"),
                Title = DbUtils.GetString(reader, "Title"),
                Description = DbUtils.GetString(reader, "Description"),
                YouTubeVideoId = DbUtils.GetString(reader, "YouTubeVideoId"),
                DateCreated = DbUtils.GetDateTime(reader, "VideoDateCreated"),
                UserProfileId = DbUtils.GetInt(reader, "VideoUserProfileId"),
                IsApproved = DbUtils.GetBool(reader, "IsApproved"),
                UserProfile = new UserProfile()
                {
                    Id = DbUtils.GetInt(reader, "VideoUserProfileId"),
                    DisplayName = DbUtils.GetString(reader, "DisplayName"),
                    Email = DbUtils.GetString(reader, "Email"),
                    CreateDateTime = DbUtils.GetDateTime(reader, "UserProfileDateCreated"),
                    ImageLocation = DbUtils.GetString(reader, "UserProfileImageUrl"),
                }
            };
        }
    }
}
