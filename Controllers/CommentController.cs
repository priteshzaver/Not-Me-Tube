using System;
using System.Collections.Generic;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NotMeTube.Models;
using NotMeTube.Repositories;

namespace NotMeTube.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        public CommentController(ICommentRepository commentRepository, IUserProfileRepository userProfileRepository)
        {
            _commentRepository = commentRepository;
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet("video/{id}")]
        public IActionResult GetCommentsByVideoId(int id)
        {
            List<Comment> videoComments = _commentRepository.GetAllCommentsByVideoId(id);
            return Ok(videoComments);
        }
        [HttpPost]
        public IActionResult Post(Comment comment)
        {
            var user = GetCurrentUserProfile();
            comment.CreateDateTime = DateTime.Now;
            comment.UserProfileId = user.Id;
            _commentRepository.Add(comment);
            return Ok(comment);
        }
        [HttpPut]
        public IActionResult Edit(Comment comment)
        {
            _commentRepository.UpdateComment(comment);
            return NoContent();
        }
        [HttpDelete("{id}")]
        public IActionResult Delete([FromRoute] int id)
        {
            _commentRepository.DeleteComment(id);
            return NoContent();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }

    }
}
