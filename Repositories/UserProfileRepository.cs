using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using NotMeTube.Models;
using NotMeTube.Utils;

namespace NotMeTube.Repositories
{
    public class UserProfileRepository : BaseRepository, IUserProfileRepository
    {
        public UserProfileRepository(IConfiguration configuration) : base(configuration) { }
        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT up.Id, Up.FirebaseUserId, up.DisplayName, up.FirstName, up.LastName, up.Email, up.CreateDateTime, up.ImageLocation, up.UserTypeId, up.IsActive,
                                        ut.Name AS UserTypeName
                                        FROM UserProfile up
                                        LEFT JOIN UserType ut on up.UserTypeId = ut.Id
                                        WHERE FirebaseUserId = @FirebaseUserId";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);

                    UserProfile userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        if (userProfile == null)
                        {
                            userProfile = NewUserProfileFromReader(reader);
                        }
                    }

                    return userProfile;
                }
            }
        }
        private UserProfile NewUserProfileFromReader(SqlDataReader reader)
        {
            return new UserProfile()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                FirstName = DbUtils.GetString(reader, "FirstName"),
                LastName = DbUtils.GetString(reader, "LastName"),
                DisplayName = DbUtils.GetString(reader, "DisplayName"),
                Email = DbUtils.GetString(reader, "Email"),
                CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                IsActive = DbUtils.GetBool(reader, "IsActive"),
                UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                UserType = new UserType()
                {
                    Id = DbUtils.GetInt(reader, "UserTypeId"),
                    Name = DbUtils.GetString(reader, "UserTypeName"),
                }
            };
        }

    }
}
