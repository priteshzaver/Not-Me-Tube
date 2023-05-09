using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using NotMeTube.Models;
using NotMeTube.Utils;

namespace NotMeTube.Repositories
{
    public class CommentRepository : BaseRepository, ICommentRepository
    {
        public CommentRepository(IConfiguration configuration) : base(configuration) { }
        public List<Comment> GetAllCommentsByVideoId(int Id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT c.Id, c.Message, c.VideoId, c.UserProfileId, C.CreateDateTime,
                                        u.Id, u.DisplayName
                                        FROM Comment c
                                        LEFT JOIN UserProfile u ON c.UserProfileId = u.Id
                                        WHERE c.VideoId = @Id
                                        ORDER BY CreateDateTime DESC";
                    DbUtils.AddParameter(cmd, "@Id", Id);
                    using (var reader = cmd.ExecuteReader())
                    {
                        var comments = new List<Comment>();
                        while (reader.Read())
                        {
                            comments.Add(NewCommentFromReader(reader));
                        }
                        return comments;
                    }
                }
            }
        }
        public void Add(Comment comment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Comment (Message, VideoId, UserProfileId, CreateDateTime)
                                        OUTPUT INSERTED.ID
                                        VALUES (@Message, @VideoId, @UserProfileId, @CreateDateTime)";
                    DbUtils.AddParameter(cmd, "Message", comment.Message);
                    DbUtils.AddParameter(cmd, "VideoId", comment.VideoId);
                    DbUtils.AddParameter(cmd, "UserProfileId", comment.UserProfileId);
                    DbUtils.AddParameter(cmd, "CreateDateTime", comment.CreateDateTime);

                    comment.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void UpdateComment(Comment comment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Comment
                                        SET Message = @message
                                            WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@message", comment.Message);
                    DbUtils.AddParameter(cmd, "id", comment.Id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void DeleteComment(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Comment WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        private Comment NewCommentFromReader(SqlDataReader reader)
        {
            return new Comment()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Message = DbUtils.GetString(reader, "Message"),
                VideoId = DbUtils.GetInt(reader, "VideoId"),
                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                UserProfile = new UserProfile()
                {
                    Id = DbUtils.GetInt(reader, "UserProfileId"),
                    DisplayName = DbUtils.GetString(reader, "DisplayName")
                }
            };
        }
    }
}
