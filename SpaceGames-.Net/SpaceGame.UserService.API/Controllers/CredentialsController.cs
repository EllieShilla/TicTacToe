using SpaceGame.UserService.API.Models;
using SpaceGame.UserService.API.Services;
using SpaceGames.UserService.Api.Models;
using SpaceGames.UserService.Api.Services;

namespace SpaceGames.UserService.Api.Controllers
{
    [Route("api/[action]")]
    [ApiController]
    public class CredentialsController : ControllerBase
    {
        IAuthenticationService _authenticationService;
        IUserService _userService;

        public CredentialsController(IAuthenticationService authenticationService, IUserService userService)
        {
            _authenticationService = authenticationService;
            _userService = userService;
        }

        [HttpPost]
        public async Task<IActionResult> SignUp(SignUpRequestModel signUpModel)
        {
            await _authenticationService.RegisterUser(signUpModel);
            await _userService.AddUser(signUpModel.Email, new UserProfileRequestModel { NickName = signUpModel.NickName });

            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> SignIn([FromBody] SignInRequestModel signInModel)
        {
            var token = await _authenticationService.LoginUser(signInModel);
            await _userService.UpdateStatus(signInModel.Email, true);

            return Ok(token);
        }

        [HttpPost]
        public async Task<IActionResult> RefreshToken([FromBody] AuthenticationData request)
        {
            var result = await _authenticationService.RefreshToken(request);
            var user = _authenticationService.GetPrincipalFromToken(request.SecurityToken);
            CognitoIdentityHelper.TryGetEmailFromClaim(user, out string email);
            await _userService.UpdateStatus(email, true);

            return Ok(result);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> SignOut()
        {
            CognitoIdentityHelper.TryGetEmailFromClaim(base.User, out string email);
            await _userService.UpdateStatus(email, false);

            return Ok();
        }

        [HttpGet("{email}")]
        public async Task<IActionResult> InitResetPassword([FromRoute] string email)
        {
            await _authenticationService.InitResetPassword(email);
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> ResetPassword(ResetPasswordRequestModel request)
        {
            await _authenticationService.ResetPassword(request);

            return Ok();
        }
    }
}