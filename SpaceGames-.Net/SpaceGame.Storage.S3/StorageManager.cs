using Amazon.Runtime.Internal;
using Amazon.S3;
using Amazon.S3.Model;
using Amazon.S3.Transfer;
using SpaceGame.Storage.S3.Models;
using System;
using System.Threading.Tasks;

namespace SpaceGame.Storage.S3
{
    internal class StorageManager : IStorageManager
    {
        IAmazonS3 _bucketInstance;
        ITransferUtility _transferUtility;

        public StorageManager(IAmazonS3 bucketInstance, ITransferUtility transferUtility)
        {
            _bucketInstance = bucketInstance;
            _transferUtility = transferUtility;
        }

        public string GetFileUrl(FileModel fileModel)
        {
            GetPreSignedUrlRequest request = new GetPreSignedUrlRequest
            {
                BucketName = fileModel.BucketName,
                Key = fileModel.Key,
                Expires = fileModel.Expires
            };

            return _bucketInstance.GetPreSignedURL(request);
        }

        public async Task<string> WriteToStorageAsync(UploadFileModel fileModel, string bucketName)
        {
            if(!await _bucketInstance.DoesS3BucketExistAsync(bucketName))
            {
                await _bucketInstance.EnsureBucketExistsAsync(bucketName);
            }

            var task = _transferUtility.UploadAsync(new TransferUtilityUploadRequest
            {
                BucketName = bucketName,
                Key = fileModel.FileName,
                InputStream = fileModel.Stream,
                ContentType = fileModel.MimeType,
            });

            await task;
            return fileModel.FileName;
        }
    }
}