using System.IO;

namespace SpaceGame.Storage.S3.Models
{
    public class UploadFileModel
    {
        public string FileName { get; set; }
        public Stream Stream { get; set; }
        public string MimeType { get; set; }
    }
}