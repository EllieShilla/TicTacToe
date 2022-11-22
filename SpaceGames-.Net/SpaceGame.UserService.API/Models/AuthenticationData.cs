using System.ComponentModel.DataAnnotations;

namespace SpaceGame.UserService.API.Models
{
    public class AuthenticationData
    {
        [Required]
        public string RefreshToken { get; set; }
        [Required]
        public string SecurityToken { get; set; }
        public string AccessToken { get; set; }

    }
}