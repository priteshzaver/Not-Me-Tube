using NotMeTube.Models;

namespace NotMeTube.Repositories
{
    public interface IUserProfileRepository
    {
        public UserProfile GetByFirebaseUserId(string firebaseUserId);
    }
}
