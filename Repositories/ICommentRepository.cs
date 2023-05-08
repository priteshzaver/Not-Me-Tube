using System.Collections.Generic;
using NotMeTube.Models;

namespace NotMeTube.Repositories
{
    public interface ICommentRepository
    {
        void Add(Comment comment);
        void DeleteComment(int id);
        List<Comment> GetAllCommentsByVideoId(int Id);
        void UpdateComment(Comment comment);
    }
}