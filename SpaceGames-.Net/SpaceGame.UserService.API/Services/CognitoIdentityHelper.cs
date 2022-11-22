using System.Security.Claims;

namespace SpaceGame.UserService.API.Services
{
    public static class CognitoIdentityHelper
    {
        public static readonly string EmailClaim = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress";

        public static bool TryGetEmailFromClaim(ClaimsPrincipal principal, out string email)
        {
            email = string.Empty;
            if(!principal.HasClaim(c => c.Type == EmailClaim))
                return false;

            email = principal.FindFirst(EmailClaim).Value;
            return true;
        }
    }
}