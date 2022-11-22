using SpaceGame.UserService.API.Constants;
using SpaceGame.UserService.API.Models;

namespace SpaceGame.UserService.API.Infrastructure
{
    public static class AuthenticationExtension
    {
        public static void RegisterAuthServices(this IServiceCollection services, IConfiguration config)
        {
            if (!int.TryParse(Environment.GetEnvironmentVariable("TokenExpiration"), out int tokenExpiration))
            {
                tokenExpiration = 10;
            }
            var authenticationConfiguration = new AuthenticationConfiguration
            {
                UserPoolClientId = Environment.GetEnvironmentVariable("UserPoolClientId"),
                UserPoolClientSecret = Environment.GetEnvironmentVariable("UserPoolClientSecret"),
                Region = Environment.GetEnvironmentVariable("Region"),
                UserPoolId = Environment.GetEnvironmentVariable("UserPoolId"),
                TokenExpiration = tokenExpiration,
            };
            authenticationConfiguration.Authority = $"https://cognito-idp.{authenticationConfiguration.Region}.amazonaws.com/{authenticationConfiguration.UserPoolId}";
            var secredKeysJson = new HttpClient().GetStringAsync(@$"https://cognito-idp.{authenticationConfiguration.Region}.amazonaws.com/{authenticationConfiguration.UserPoolId}/.well-known/jwks.json").Result;

            services.AddSingleton((AWSCognitoClientOptions)authenticationConfiguration);
            services.AddSingleton<IAmazonCognitoIdentityProvider>
                (inst => new AmazonCognitoIdentityProviderClient(RegionEndpoint.GetBySystemName(authenticationConfiguration.Region)));
            services.AddScoped<JwtSecurityTokenHandler>();

            services.AddCognitoIdentity(opt =>
            {
                opt.User.RequireUniqueEmail = true;
                opt.SignIn.RequireConfirmedEmail = true;
                opt.Tokens.PasswordResetTokenProvider = "Email";
            });
            services.AddAuthentication(opt =>
            {
                opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme; 
                opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                opt.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.Authority = authenticationConfiguration.Authority;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidIssuer = authenticationConfiguration.Authority,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKeyResolver = (s, securityToken, identifier, parameters) =>
                    {
                        var keys = JsonConvert.DeserializeObject<JsonWebKeySet>(secredKeysJson)?.Keys;
                        return keys;
                    },
                    ValidateLifetime = true,
                    LifetimeValidator = (notBefore, expires, token, param) => expires > DateTime.UtcNow,
                    ValidateAudience = true,
                    ValidAudience = authenticationConfiguration.UserPoolClientId
                };
                options.MetadataAddress = $"{authenticationConfiguration.Authority}/.well-known/openid-configuration";
            });

            // Home work, hint for advance task. something need to be changed here as well AddAuthorization
            services.AddAuthorization();

            config[ConfigurationConstants.AwsAuthenticationTokenExpiration] = authenticationConfiguration.TokenExpiration.ToString();
            config[ConfigurationConstants.AwsAuthenticationSecurityKeys] = secredKeysJson;
        }
    }
}