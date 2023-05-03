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
    public class PlaylistController : ControllerBase
    {
        private readonly IPlaylistRepository _playlistRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        public PlaylistController(IPlaylistRepository playlistRepository, IUserProfileRepository userProfileRepository)
        {
            _playlistRepository = playlistRepository;
            _userProfileRepository = userProfileRepository;
        }
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_playlistRepository.GetPlaylistsWithVideos());
        }
        [HttpGet("{id}/playlists")]
        public IActionResult GetPlaylistsWithVideosByUserId(int id)
        {
            List<Playlist> userPlaylists = _playlistRepository.GetPlaylistsWithVideosByUserId(id);
            if(userPlaylists.Count == 0)
            {
                return NoContent();
            }
            return Ok(userPlaylists);
        }
        [HttpPost]
        public IActionResult Post(Playlist playlist)
        {
            UserProfile user = GetCurrentUserProfile();

            _playlistRepository.Add(playlist);
            return CreatedAtAction(nameof(GetPlaylistsWithVideosByUserId), new { user.Id }, playlist);

        }
        [HttpPut]
        public IActionResult Put(int id, Playlist playlist)
        {
            if (id != playlist.Id)
            {
                return BadRequest();
            }

            _playlistRepository.Update(playlist);
            return NoContent();
        }
        [HttpDelete("{playlistId}")]
        public IActionResult Delete([FromRoute]int id)
        {
            _playlistRepository.Delete(id);
            return NoContent();
        }
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
