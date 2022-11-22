using SpaceGame.UserService.API.Models;
using SpaceGame.UserService.API.Services;
using SpaceGames.UserService.Api.Services;

namespace SpaceGames.UserService.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UsersController : Controller
    {
        IUserService _userService;
        private readonly CognitoUserManager<CognitoUser> _userManager;


        public UsersController(IUserService userService, UserManager<CognitoUser> userManager)
        {
            _userService = userService;
            _userManager = (CognitoUserManager<CognitoUser>)userManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _userService.Get(activeOnly: true);
            return Ok(users);
        }

        [HttpGet("{email}")]
        public async Task<IActionResult> GetUser([FromRoute] string email)
        {
            var user = await _userService.GetByEmail(email);
            return Ok(user);
        }

        [HttpPut("{email}")]
        public async Task<IActionResult> EditUser([FromRoute] string email, [FromBody] UserProfileRequestModel model)
        {
            CognitoIdentityHelper.TryGetEmailFromClaim(base.User, out string emailFromToken);
            if (email != emailFromToken)
            {
                return Forbid();
            }

            await _userService.UpdateUser(email, model);

            return Ok();
        }

        [HttpPost("{email}/avatar")]
        public async Task<IActionResult> UploadAvatar([FromRoute] string email, UserAvatarRequestModel file)
        {
            CognitoIdentityHelper.TryGetEmailFromClaim(base.User, out string emailFromToken);
            if (email != emailFromToken)
            {
                return Forbid();
            }

            await _userService.UpdateUser(email, file);

            return Ok();
        }

        // Home work
        [HttpDelete("{email}")]
        public async Task<IActionResult> DeleteUser([FromRoute] string email)
        {
            await _userService.DeleteUser(email);
            var user = await _userManager.FindByEmailAsync(email);

            if (user == null)
                return NotFound();

            await _userManager.DeleteAsync(user);
            return Ok();
        }
    }
}

