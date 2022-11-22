using System;

namespace SpaceGame.Storage.S3.Models
{
    public  class FileModel
    {
        public string BucketName { get; set; }
        public string Key { get; set; } 
        public DateTime Expires { get; set; }

    }
}