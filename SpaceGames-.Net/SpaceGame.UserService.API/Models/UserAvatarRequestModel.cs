namespace SpaceGame.UserService.API.Models
{
    public class UserAvatarRequestModel
    {
        public string Base64EncodedFile { get; set; }
        public string ContentType { get; set; }
        public string FileName { get; set; }
    }
}