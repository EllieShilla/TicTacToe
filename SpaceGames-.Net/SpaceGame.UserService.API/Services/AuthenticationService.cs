using SpaceGame.DAL;
using SpaceGame.UserService.API.Constants;
using SpaceGame.UserService.API.Infrastructure;
using SpaceGame.UserService.API.Models;
using SpaceGames.UserService.Api.Models;
using System.Security.Claims;

namespace SpaceGames.UserService.Api.Services
{
    public interface IAuthenticationService
    {
        Task RegisterUser(SignUpRequestModel signUpModel);
        Task<AuthenticationData> LoginUser(SignInRequestModel signInModel);
        Task InitResetPassword(string email);
        Task ResetPassword(ResetPasswordRequestModel request);
        Task<AuthenticationData> RefreshToken(AuthenticationData request);
        ClaimsPrincipal GetPrincipalFromToken(string token);
    }

    public class AuthenticationService : IAuthenticationService
    {
        private readonly CognitoUserPool _userPool;
        private readonly UserManager<CognitoUser> _userManager;
        private readonly JwtSecurityTokenHandler _jwtSecurityTokenHandler;
        private readonly string _authsecrets;
        IUserRepository _repository;

        public AuthenticationService(CognitoUserPool userPool, UserManager<CognitoUser> userManager,
            JwtSecurityTokenHandler jwtSecurityTokenHandler,
            IConfiguration config,
            IUserRepository repository)
        {
            _userManager = userManager;
            _userPool = userPool;
            _jwtSecurityTokenHandler = jwtSecurityTokenHandler;
            _authsecrets = config[ConfigurationConstants.AwsAuthenticationSecurityKeys];
            _repository = repository;
        }

        // Home work NickName
        public async Task RegisterUser(SignUpRequestModel signUpModel)
        {
            var user = _repository.GetByNickName(signUpModel.NickName);
            if (user.Result != null)
                throw new ApiException($"Nick is not available", ExceptionType.OperationException);

            var attributes = new Dictionary<string, string>
            {
                { CognitoAttribute.Email.AttributeName, signUpModel.Email },
                { CognitoAttribute.NickName.AttributeName, signUpModel.NickName }
            };
            Dictionary<string, string> validationData = new Dictionary<string, string>(StringComparer.InvariantCultureIgnoreCase)
            {
                { CognitoAttribute.Email.AttributeName, signUpModel.Email},
                { CognitoAttribute.NickName.AttributeName, signUpModel.NickName},
            };
            await _userPool.SignUpAsync(signUpModel.Email, signUpModel.Password, attributes, validationData);
        }

        public async Task<AuthenticationData> LoginUser(SignInRequestModel signInModel)
        {
            var user = _userPool.GetUser(signInModel.Email);
            var authRequest = new InitiateSrpAuthRequest()
            {
                Password = signInModel.Password,
            };
            var response = await user.StartWithSrpAuthAsync(authRequest);

            return new AuthenticationData
            {
                RefreshToken = response.AuthenticationResult.RefreshToken,
                SecurityToken = response.AuthenticationResult.IdToken,
                AccessToken = response.AuthenticationResult.AccessToken
            };
        }

        public async Task<AuthenticationData> RefreshToken(AuthenticationData request)
        {
            var user = await _userManager.GetUserAsync(GetPrincipalFromToken(request.SecurityToken));
            if (user == null)
            {
                throw new ApiException("Invalid token", ExceptionType.InvalidToken);
            }

            user.SessionTokens = new CognitoUserSession(request.SecurityToken, null, request.RefreshToken, DateTime.Now, DateTime.Now.AddDays(1));
            var response = await user.StartWithRefreshTokenAuthAsync
                (new InitiateRefreshTokenAuthRequest { AuthFlowType = AuthFlowType.REFRESH_TOKEN_AUTH });

            return new AuthenticationData
            {
                RefreshToken = response.AuthenticationResult.RefreshToken,
                SecurityToken = response.AuthenticationResult.IdToken,
                AccessToken = response.AuthenticationResult.AccessToken
            };
        }

        public async Task InitResetPassword(string email)
        {
            var user = _userPool.GetUser(email);
            await user.ForgotPasswordAsync();
        }

        public async Task ResetPassword(ResetPasswordRequestModel request)
        {
            await _userPool.ConfirmForgotPassword(request.Email, request.VerificationCode, request.Password, CancellationToken.None);
        }

        public ClaimsPrincipal GetPrincipalFromToken(string token)
        {
            var secrets = JsonConvert.DeserializeObject<JsonWebKeySet>(_authsecrets);
            var validationParam = new TokenValidationParameters
            {
                ValidateIssuer = false,
                ValidateLifetime = false,
                ValidateAudience = false,
                IssuerSigningKeyResolver = (s, securityToken, identifier, parameters) => secrets?.Keys
            };
            var principal = _jwtSecurityTokenHandler.ValidateToken(token, validationParam, out SecurityToken securityToken);
            var jwttoken = securityToken as JwtSecurityToken;
            if (jwttoken == null || !jwttoken.SignatureAlgorithm.Equals(secrets?.Keys[0].Alg, StringComparison.InvariantCultureIgnoreCase))
            {
                throw new ApiException("Invalid token", ExceptionType.InvalidToken);
            }

            return principal;
        }
    }
}