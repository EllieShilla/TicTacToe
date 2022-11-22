using System.ComponentModel.DataAnnotations;

namespace SpaceGame.UserService.API.Models
{
    public class UserProfileRequestModel
    {
        [RegularExpression(@"^(\w*\d*){3,256}$")]
        public string? NickName { get;set;}
    }
}