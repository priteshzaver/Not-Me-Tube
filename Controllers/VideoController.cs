using System;
using System.Collections.Generic;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NotMeTube.Models;
using NotMeTube.Repositories;

namespace NotMeTube.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class VideoController : ControllerBase
    {
        private readonly IVideoRepository _videoRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        public VideoController(IVideoRepository videoRepository, IUserProfileRepository userProfileRepository)
        {
            _videoRepository = videoRepository;
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_videoRepository.GetAll());
        }
        [HttpGet("{id}/videos")]
        public IActionResult GetVideosByUserId(int id)
        {
            List<Video> userVideos = _videoRepository.GetVideosByUserId(id);
            if(userVideos.Count == 0)
            {
                return NoContent();
            }
            return Ok(userVideos);
        }
        [HttpPost]
        public IActionResult SaveVideo(Video video)
        {
            var user = GetCurrentUserProfile();
            video.DateCreated = DateTime.Now;
            video.UserProfileId = user.Id;
            video.IsApproved = true;
            _videoRepository.SaveVideo(video);
            return Ok(video);
        }
        [HttpPost("saveToPlaylist")]
        public IActionResult SaveVideoToPlaylist(PlaylistVideo playlistVideo)
        {
            try
            {
                _videoRepository.SaveVideoToPlaylist(playlistVideo);
                return Ok(playlistVideo);
            }   
            catch
            {
                return BadRequest();
            }
        }
        [HttpDelete("{videoId}")]
        public IActionResult Delete([FromRoute]int id)
        {
            _videoRepository.DeleteVideo(id);
            return NoContent();
        }
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
