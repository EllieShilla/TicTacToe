using SpaceGame.Storage.S3.Models;
using System;
using System.Threading.Tasks;

namespace SpaceGame.Storage.S3
{
    public interface IStorageManager
    {
        Task<string> WriteToStorageAsync(UploadFileModel fileModel, string bucketName);
        string GetFileUrl(FileModel fileModel);
    }
}