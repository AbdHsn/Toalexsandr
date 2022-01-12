using System;
using System.Collections.Generic;

namespace DataLayer.Models.EntityModels
{
    public partial class TbMenuNamingConvention
    {
        public int Id { get; set; }
        public string? TrackerName { get; set; }
        public string? AbrvName { get; set; }
        public string? Prefix { get; set; }
        public int? NumberSeq { get; set; }
        public string? Postfix { get; set; }
        public string? NamingConv { get; set; }
        public string? LastUsedConv { get; set; }
        public string? NextToUseConv { get; set; }
        public string? Active { get; set; }
        public string? Group { get; set; }
    }
}
