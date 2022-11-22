using SpaceGame.DAL;
using SpaceGame.DAL.Models;
using SpaceGame.UserService.API.Constants;
using SpaceGame.UserService.API.Infrastructure;
using SpaceGame.UserService.API.Models;

namespace SpaceGames.UserService.Api.Services
{
    public interface IUserService
    {
        Task AddUser(string email, UserProfileRequestModel userModel);
        Task UpdateUser(string email, UserProfileRequestModel userModel);
        Task<UserProfileResponseModel> GetByEmail(string email);
        Task<IEnumerable<UserResponseModel>> Get(bool activeOnly);
        Task UpdateUser(string email, UserAvatarRequestModel userModel);
        Task UpdateStatus(string email, bool isOnline);
        Task DeleteUser(string email);
    }

    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IFileManagingService _fileManagingService;

        private int _tokenAccessTime;

        public UserService(IUserRepository userRepo, IFileManagingService fileManagingService, IConfiguration config)
        {
            _userRepository = userRepo;
            _fileManagingService = fileManagingService;
            _tokenAccessTime = Convert.ToInt32(config[ConfigurationConstants.AwsAuthenticationTokenExpiration]);
        }

        // Home work NickName
        // verify nick name is unique.
        public async Task AddUser(string email, UserProfileRequestModel userModel)
        {
            var checkUserNcik = await _userRepository.GetByNickName(userModel.NickName);
            if (checkUserNcik != null)
                throw new ApiException($"Nick is not available", ExceptionType.OperationException);

            var user = new User
            {
                Email = email,
                NickName = string.IsNullOrEmpty(userModel.NickName) ? email : userModel.NickName
            };
            try
            {
                await _userRepository.PutItem(user);
            }
            catch (ConditionalCheckFailedException)
            {
                throw new ApiException($"User already exists with the email", ExceptionType.OperationException);
            }
        }

        // Home work NickName verify nick name is unique. 
        public async Task UpdateUser(string email, UserProfileRequestModel userModel)
        {
            var checkUserNcik = await _userRepository.GetByNickName(userModel.NickName);
            if (checkUserNcik != null)
                throw new ApiException($"Nick is not available", ExceptionType.OperationException);

            var user = await GetUser(email);
            user.NickName = userModel.NickName;
            await _userRepository.Update(user);
        }

        public async Task UpdateUser(string email, UserAvatarRequestModel userModel)
        {
            var user = await GetUser(email);
            var fileName = await _fileManagingService.UploadUserPhoto(userModel);
            user.LogoFileKey = fileName;
            user.LogoOriginFileName = userModel.FileName;
            await _userRepository.Update(user);
        }

        public async Task<UserProfileResponseModel> GetByEmail(string email)
        {
            var user = await GetUser(email, true);
            var url = string.IsNullOrEmpty(user.LogoFileKey)
                ? string.Empty
                : _fileManagingService.GetImageUrl(user.LogoFileKey);
            var userModel = new UserProfileResponseModel
            {
                Email = email,
                NickName = user.NickName,
                AvatarFileName = user.LogoOriginFileName,
                AvatarUrl = url
            };

            return userModel;
        }

        public async Task<IEnumerable<UserResponseModel>> Get(bool activeOnly)
        {
            var date = DateTime.UtcNow.AddMinutes(-_tokenAccessTime);
            var users = activeOnly
                ? await _userRepository.Get(date)
                : await _userRepository.Get(DateTime.MinValue);
            return users.Select(u => new UserResponseModel { Email = u.Email, UserName = u.NickName });
        }

        public async Task UpdateStatus(string email, bool isOnline)
        {
            var user = await GetUser(email) ?? new User { Email = email };
            user.AccessTime = isOnline ? DateTime.UtcNow : DateTime.MinValue;
            await _userRepository.Update(user);
        }

        private async Task<User> GetUser(string email, bool throwException = false)
        {
            var user = await _userRepository.GetById(email);
            if (user == null && throwException)
                throw new NullReferenceException("user is not found");
            return user;
        }

        // Home work
        public async Task DeleteUser(string email)
        {
            // adding logic for delete
            var user = await GetUser(email);
            await _userRepository.Delete(user);
        }
    }
}