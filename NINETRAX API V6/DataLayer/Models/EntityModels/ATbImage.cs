using System;
using System.Collections.Generic;

namespace DataLayer.Models.EntityModels
{
    public partial class ATbImage
    {
        public int Id { get; set; }
        public int KeyId { get; set; }
        public string BookName { get; set; } = null!;
        public byte[]? Image { get; set; }
        public string FileExt { get; set; } = null!;
        public string FileName { get; set; } = null!;
    }
}
