using Amazon.S3;
using Amazon.S3.Transfer;
using Microsoft.Extensions.DependencyInjection;

namespace SpaceGame.Storage.S3
{
    public static class StorageManagerServiceCollectionExtension
    {
        public static void AddS3Manager(this IServiceCollection serviceCollection, string region)
        {
            serviceCollection.AddTransient<IStorageManager, StorageManager>();
            serviceCollection.AddSingleton<IAmazonS3>(new AmazonS3Client(
                new AmazonS3Config { SignatureVersion = "1", RegionEndpoint = Amazon.RegionEndpoint.GetBySystemName(region)}));
            serviceCollection.AddSingleton<ITransferUtility,TransferUtility>();
        }
    }
}