using System.ComponentModel.DataAnnotations;

namespace SpaceGames.UserService.Api.Models
{
    public class SignUpRequestModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [RegularExpression(@"^(\w*\d*){3,256}$")]
        public string NickName { get; set; }

        [Required]
        [StringLength(8, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }
    }
}