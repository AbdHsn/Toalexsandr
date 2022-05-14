using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace NINETRAX.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class APIWorkingController : ControllerBase
    {
        private readonly ILogger<APIWorkingController> _logger;

        public APIWorkingController(ILogger<APIWorkingController> logger)
        {
            _logger = logger;
        }

        //[HttpGet(Name = "Working"), Authorize(Roles = "Admin")]
        [HttpGet(Name = "Working"), Authorize]
        public string Get()
        {
            return "API Project is running successfully.";
        }
    }
}