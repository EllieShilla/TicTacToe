namespace SpaceGame.UserService.API.Models
{
    public class UserProfileResponseModel
    {
        public string Email { get; set; }
        public string NickName { get; set; }
        public string AvatarUrl { get; set; }
        public string AvatarFileName { get; set; }
    }
}