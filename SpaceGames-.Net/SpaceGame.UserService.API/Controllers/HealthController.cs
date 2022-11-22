namespace SpaceGames.UserService.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HealthController : Controller
    {
        public HealthController()
        {

        }
        [HttpGet]
        public IActionResult Index()
        {
            return Ok();
        }
    }
}
