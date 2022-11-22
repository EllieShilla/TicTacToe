using SpaceGame.DAL;
using SpaceGame.Storage.S3;
using SpaceGame.UserService.API.Constants;
using SpaceGame.UserService.API.Infrastructure;
using SpaceGames.UserService.Api.Infrastructure;
using SpaceGames.UserService.Api.Services;

namespace SpaceGame.UserService.API;

public class Startup
{
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    public void ConfigureServices(IServiceCollection services)
    {
        services.AddControllers(opt => opt.Filters.Add(new GlobalExceptionHandler()));
        services.AddSwagger(Configuration);

        RegisterEnvironmentVariables();
        services.RegisterAuthServices(Configuration);

        services.RegisterDAL(Configuration[ConfigurationConstants.Region]);
        services.AddS3Manager(Configuration[ConfigurationConstants.Region]);
        services.AddScoped<IFileManagingService, FileManagingService>();
        services.AddScoped<IAuthenticationService, AuthenticationService>();
        services.AddScoped<IUserService, SpaceGames.UserService.Api.Services.UserService>();
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
            app.UseSwaggerExt();
        }

        app.UseHttpsRedirection();

        app.UseRouting();
        app.UseAuthentication();
        app.UseAuthorization();
        app.UseCors(builder => builder
                .SetIsOriginAllowed(origin => true).AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
            endpoints.MapGet("/", async context =>
            {
                await context.Response.WriteAsync("Welcome to running ASP.NET Core on AWS Lambda");
            });
        });
    }

    private void RegisterEnvironmentVariables()
    {
        Configuration[ConfigurationConstants.BucketName] = Environment.GetEnvironmentVariable("BucketName");
        Configuration[ConfigurationConstants.Region] = Environment.GetEnvironmentVariable("Region");
    }
}