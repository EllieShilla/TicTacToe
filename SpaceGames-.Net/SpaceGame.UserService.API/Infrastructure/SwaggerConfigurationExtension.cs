using Microsoft.OpenApi.Models;

namespace SpaceGames.UserService.Api.Infrastructure
{
    public static class SwaggerConfigurationExtension
    {
        public static void AddSwagger(this IServiceCollection services, IConfiguration config)
        {
            services.AddSwaggerGen(opt =>
            {
                opt.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = "v1",
                    Title = "User Service API",
                    Description = "Service for Auth purposes",
                });
                opt.AddSecurityDefinition("Bearer",
                    new OpenApiSecurityScheme { Scheme = "Bearer", In = ParameterLocation.Header, Type = SecuritySchemeType.ApiKey, Name = "Authorization"});
                opt.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            },
                            Scheme = "openid",
                            Name = "Bearer",
                            In = ParameterLocation.Header
                        },
                        new List<string>()
                        }
                });
            });
        }

        public static void UseSwaggerExt(this IApplicationBuilder app)
        {
            app.UseSwagger();
            app.UseSwaggerUI(opt =>
            {
                opt.DocumentTitle = "User Service API";
                opt.RoutePrefix = "swagger";
                opt.SwaggerEndpoint("v1/swagger.json", "v1");
            });
        }
    }
}