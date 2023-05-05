using System.Collections.Generic;
using Microsoft.AspNetCore.Authentication.OAuth.Claims;
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

        public void SaveVideo(Video video)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Video (Title, Description, YouTubeVideoId, DateCreated, UserProfileId, IsApproved)
                                        OUTPUT INSERTED.ID
                                        VALUES (@Title, @Description, @YouTubeVideoId, @DateCreated, @UserProfileId, @IsApproved)";
                    DbUtils.AddParameter(cmd, "Title", video.Title);
                    DbUtils.AddParameter(cmd, "Description", video.Description);
                    DbUtils.AddParameter(cmd, "YouTubeVideoId", video.YouTubeVideoId);
                    DbUtils.AddParameter(cmd, "DateCreated", video.DateCreated);
                    DbUtils.AddParameter(cmd, "UserProfileId", video.UserProfileId);
                    DbUtils.AddParameter(cmd, "IsApproved", video.IsApproved);

                    video.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void SaveVideoToPlaylist(PlaylistVideo playlistVideo)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO PlaylistVideo (PlaylistId, VideoId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@playlistId, @videoId)";
                    DbUtils.AddParameter(cmd, "@playlistId", playlistVideo.PlaylistId);
                    DbUtils.AddParameter(cmd, "@videoId", playlistVideo.VideoId);

                    playlistVideo.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void DeleteVideo(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Video WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void DeleteVideoFromPlaylist(PlaylistVideo playlistVideo)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM PlaylistVideo
                                        WHERE PlaylistVideo.PlaylistId = @playlistId
                                        AND PlaylistVideo.VideoId = @videoId";
                    DbUtils.AddParameter(cmd, "@playlistId", playlistVideo.PlaylistId);
                    DbUtils.AddParameter(cmd, "@videoId", playlistVideo.VideoId);
                    cmd.ExecuteNonQuery();
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
