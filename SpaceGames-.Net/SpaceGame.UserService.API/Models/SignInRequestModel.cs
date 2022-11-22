using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace SpaceGames.UserService.Api.Models
{
    public class SignInRequestModel
    {
        [Required]
        public string Email { get;set;}
        [Required]
        public string Password { get;set;}
    }
}