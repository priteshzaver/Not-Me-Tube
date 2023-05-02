using System.Collections.Generic;
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
        public VideoController(IVideoRepository videoRepository)
        {
            _videoRepository = videoRepository;
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
    }
}
