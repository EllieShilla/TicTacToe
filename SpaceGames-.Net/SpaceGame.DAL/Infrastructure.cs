using Amazon;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;
using Microsoft.Extensions.DependencyInjection;

namespace SpaceGame.DAL
{
    public static class Infrastructure
    {
        public static void RegisterDAL(this IServiceCollection services, string region)
        {
            services.AddSingleton<IAmazonDynamoDB>(inst => 
            {
                return new AmazonDynamoDBClient(RegionEndpoint.GetBySystemName(region));
            });
            services.AddSingleton<IDynamoDBContext, DynamoDBContext>();
            services.AddScoped<IUserRepository, UserRepository>();
        }
    }
}