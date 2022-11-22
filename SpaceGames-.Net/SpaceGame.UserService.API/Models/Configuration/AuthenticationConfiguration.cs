using Amazon.AspNetCore.Identity.Cognito.Extensions;

namespace SpaceGame.UserService.API.Models
{
    public class AuthenticationConfiguration : AWSCognitoClientOptions
    {
        public string Region { get;set; }
        public string Authority { get;set;}
        public int TokenExpiration { get;set;}
    }
}