using System.Collections.Generic;
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
        public UserProfile GetById(int id)
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
                                        WHERE up.Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    UserProfile userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if(reader.Read())
                    {
                        userProfile = NewUserProfileFromReader(reader);
                    }
                    return userProfile;
                }
            }
        }
        public List<UserProfile> GetUsers()
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
                                       ORDER BY up.DisplayName";
                    using (var reader = cmd.ExecuteReader())
                    {
                        var users = new List<UserProfile>();
                        while (reader.Read())
                        {
                            users.Add(NewUserProfileFromReader(reader));
                        }
                        return users;
                    }
                }
            }
        }
        public void Add(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO UserProfile (FirebaseUserId, FirstName, LastName, DisplayName, Email, CreateDateTime, ImageLocation, UserTypeId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@FirebaseUserId, @FirstName, @LastName, @DisplayName, @Email, @CreateDateTime, @ImageLocation, @UserTypeId)";
                    DbUtils.AddParameter(cmd, "@FirebaseUserId", userProfile.FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@FirstName", userProfile.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", userProfile.LastName);
                    DbUtils.AddParameter(cmd, "@DisplayName", userProfile.DisplayName);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", userProfile.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@ImageLocation", userProfile.ImageLocation);
                    DbUtils.AddParameter(cmd, "@UserTypeId", userProfile.UserTypeId);

                    userProfile.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void Update(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE UserProfile
                                        SET Displayname = @displayName,
                                            FirstName = @firstName,
                                            LastName = @lastName,
                                            Email = @email,
                                            ImageLocation = @imageLocation,
                                            UserTypeId = @userTypeId,
                                            IsActive = @isActive
                                        WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@displayName", userProfile.DisplayName);
                    DbUtils.AddParameter(cmd, "@firstName", userProfile.FirstName);
                    DbUtils.AddParameter(cmd, "@lastName", userProfile.LastName);
                    DbUtils.AddParameter(cmd, "@email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@imageLocation", userProfile.ImageLocation);
                    DbUtils.AddParameter(cmd, "@userTypeId", userProfile.UserTypeId);
                    DbUtils.AddParameter(cmd, "@id", userProfile.Id);
                    if (userProfile.IsActive == true)
                    {
                        DbUtils.AddParameter(cmd, "@isActive", 1);
                    }
                    else
                    {
                        DbUtils.AddParameter(cmd, "@isActive", 0);
                    }

                    cmd.ExecuteNonQuery();
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
