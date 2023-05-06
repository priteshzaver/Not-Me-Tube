using System.Collections.Generic;
using System.Linq;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using NotMeTube.Models;
using NotMeTube.Utils;

namespace NotMeTube.Repositories
{
    public class PlaylistRepository : BaseRepository, IPlaylistRepository
    {
        public PlaylistRepository(IConfiguration configuration) : base(configuration) { }

        public List<Playlist> GetPlaylistsWithVideos()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT p.Id AS PlaylistId, p.Name, p.Description, p.UserProfileId AS PlaylistUserProfileId, p.IsPublic,
                                        v.Id AS VideoId, v.Title AS VideoTitle, v.Description AS VideoDescription, v.YouTubeVideoId, v.DateCreated, v.UserProfileId AS VideoUserProfileId, v.IsApproved,
                                        up.DisplayName
                                        FROM Playlist p
                                        LEFT JOIN PlaylistVideo pv ON p.Id = pv.PlaylistId
                                        LEFT JOIN Video v ON pv.VideoId = v.Id
                                        LEFT JOIN UserProfile up ON v.UserProfileId = up.Id";
                    using (var reader = cmd.ExecuteReader())
                    {
                        var playlists = new List<Playlist>();
                        while (reader.Read())
                        {
                            var playlistId = DbUtils.GetInt(reader, "PlaylistId");
                            var existingPlaylist = playlists.FirstOrDefault(p => p.Id == playlistId);
                            if (existingPlaylist == null)
                            {
                                existingPlaylist = NewPlaylistFromReader(reader, playlistId);

                                playlists.Add(existingPlaylist);
                            }

                            if (DbUtils.IsNotDbNull(reader, "VideoId"))
                            {
                                existingPlaylist.Videos.Add(NewVideoFromReader(reader));
                            }
                        }
                        return playlists;
                    }

                }
            }
        }
        public List<Playlist> GetPlaylistsWithVideosByUserId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT p.Id AS PlaylistId, p.Name, p.Description, p.UserProfileId AS PlaylistUserProfileId, p.IsPublic,
                                        v.Id AS VideoId, v.Title AS VideoTitle, v.Description AS VideoDescription, v.YouTubeVideoId, v.DateCreated, v.UserProfileId AS VideoUserProfileId, v.IsApproved,
                                        up.DisplayName
                                        FROM Playlist p
                                        LEFT JOIN PlaylistVideo pv ON p.Id = pv.PlaylistId
                                        LEFT JOIN Video v ON pv.VideoId = v.Id
                                        LEFT JOIN UserProfile up ON v.UserProfileId = up.Id
                                        WHERE p.UserProfileId = @id";
                    DbUtils.AddParameter(cmd, "id", id);
                    using (var reader = cmd.ExecuteReader())
                    {
                        var playlists = new List<Playlist>();
                        while (reader.Read())
                        {
                            var playlistId = DbUtils.GetInt(reader, "PlaylistId");
                            var existingPlaylist = playlists.FirstOrDefault(p => p.Id == playlistId);
                            if (existingPlaylist == null)
                            {
                                existingPlaylist = NewPlaylistFromReader(reader, playlistId);

                                playlists.Add(existingPlaylist);
                            }

                            if (DbUtils.IsNotDbNull(reader, "VideoId"))
                            {
                                existingPlaylist.Videos.Add(NewVideoFromReader(reader));
                            }
                        }
                        return playlists;
                    }

                }
            }
        }
        
        public void Add(Playlist playlist)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Playlist (Name, Description, UserProfileId, IsPublic)
                                        OUTPUT INSERTED.ID
                                        VALUES (@Name, @Description, @UserProfileId, @IsPublic)";
                    DbUtils.AddParameter(cmd, "Name", playlist.Name);
                    DbUtils.AddParameter(cmd, "Description", playlist.Description);
                    DbUtils.AddParameter(cmd, "UserProfileId", playlist.UserProfileId);
                    DbUtils.AddParameter(cmd, "IsPublic", playlist.IsPublic);

                    playlist.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void Update(Playlist playlist)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Playlist
                                        SET Name = @name,
                                        Description = @description,
                                        UserProfileId = @userProfileId,
                                        IsPublic = @isPublic
                                        WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@name", playlist.Name);
                    DbUtils.AddParameter(cmd, "@description", playlist.Description);
                    DbUtils.AddParameter(cmd, "@userProfileId", playlist.UserProfileId);
                    DbUtils.AddParameter(cmd, "@id", playlist.Id);
                    if (playlist.IsPublic)
                    {
                        DbUtils.AddParameter(cmd, "@isPublic", 1);
                    }
                    else
                    {
                        DbUtils.AddParameter(cmd, "@isPublic", 2);
                    }

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Playlist WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        private Playlist NewPlaylistFromReader(SqlDataReader reader, int playlistId)
        {
            return new Playlist()
            {
                Id = playlistId,
                Name = DbUtils.GetString(reader, "Name"),
                Description = DbUtils.GetString(reader, "Description"),
                UserProfileId = DbUtils.GetInt(reader, "PlaylistUserProfileId"),
                IsPublic = DbUtils.GetBool(reader, "IsPublic"),
                Videos = new List<Video>()
            };
        }
        private Video NewVideoFromReader(SqlDataReader reader)
        {
            return new Video()
            {
                Id = DbUtils.GetInt(reader, "VideoId"),
                Title = DbUtils.GetString(reader, "VideoTitle"),
                Description = DbUtils.GetString(reader, "VideoDescription"),
                YouTubeVideoId = DbUtils.GetString(reader, "YouTubeVideoId"),
                DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                UserProfileId = DbUtils.GetInt(reader, "VideoUserProfileId"),
                IsApproved = DbUtils.GetBool(reader, "IsAPproved"),
                UserProfile = new UserProfile()
                {
                    DisplayName = DbUtils.GetString(reader, "DisplayName")
                }
            };
        }
    }
}
