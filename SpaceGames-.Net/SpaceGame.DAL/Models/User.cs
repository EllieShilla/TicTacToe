using Amazon.DynamoDBv2.DataModel;
using System;

namespace SpaceGame.DAL.Models
{
    [DynamoDBTable("Users")]
    public class User
    {
        [DynamoDBProperty("nick")]
        public string NickName { get; set; }
        [DynamoDBHashKey("email")]
        public string Email { get;set;}
        [DynamoDBProperty("logo")]
        public string LogoOriginFileName { get;set; }
        [DynamoDBProperty("logokey")]
        public string LogoFileKey { get; set; }
        [DynamoDBProperty("accesstime")]
        public DateTime AccessTime { get;set;}
        [DynamoDBProperty("rank")]
        public int Rank { get;set; }
    }
}