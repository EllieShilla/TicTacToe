using SpaceGame.Storage.S3;
using SpaceGame.UserService.API.Models;
using SpaceGame.Storage.S3.Models;
using SpaceGame.UserService.API.Constants;

namespace SpaceGames.UserService.Api.Services
{
    public interface IFileManagingService
    {
        Task<string> UploadUserPhoto(UserAvatarRequestModel userAvatar);
        string GetImageUrl(string fileKey);
    }

    public class FileManagingService : IFileManagingService
    {
        IStorageManager _storageManager;
        string _bucketName;

        private const double defaultDuration = 60;

        public FileManagingService(IStorageManager storageManager, IConfiguration configuration)
        {
            _storageManager = storageManager;
            _bucketName = configuration[ConfigurationConstants.BucketName];
        }

        public async Task<string> UploadUserPhoto(UserAvatarRequestModel userAvatar)
        {
            using (var stream = new MemoryStream(Convert.FromBase64String(userAvatar.Base64EncodedFile)))
            {
                var uploadFileModel = new UploadFileModel
                {
                    FileName = "avatars/" + Guid.NewGuid().ToString(),
                    MimeType = userAvatar.ContentType,
                    Stream = stream
                };
                await _storageManager.WriteToStorageAsync(uploadFileModel, _bucketName);

                return uploadFileModel.FileName;
            }
        }

        public string GetImageUrl(string fileKey)
        {
            var reqest = new FileModel
            {
                BucketName = _bucketName,
                Key = fileKey,
                Expires = DateTime.UtcNow.AddMinutes(defaultDuration)
            };
            var resultUrl = _storageManager.GetFileUrl(reqest);
            return resultUrl;
        }
    }
}