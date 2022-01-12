using System;
using System.Collections.Generic;

namespace DataLayer.Models.EntityModels
{
    public partial class TbDbrevision
    {
        public int Id { get; set; }
        public string? Version { get; set; }
        public string? DateIssued { get; set; }
        public bool? ActiveInactive { get; set; }
        public string? Memo { get; set; }
        public string? ReleasedBy { get; set; }
        public string? ReleaseDate { get; set; }
    }
}
