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

        [HttpGet(Name = "Working")]
        public string Get()
        {
            return "API Project is running successfully.";
        }
    }
}