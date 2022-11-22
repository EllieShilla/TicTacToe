using System.ComponentModel.DataAnnotations;

namespace SpaceGame.UserService.API.Models
{
    public class ResetPasswordRequestModel
    {
        [Required]
        public string Email { get;set;}
        [Required]
        public string VerificationCode { get;set;}
        [Required]
        public string Password { get;set;}
    }
}