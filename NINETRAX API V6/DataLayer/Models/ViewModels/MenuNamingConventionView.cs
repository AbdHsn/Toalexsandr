using System;
using System.Collections.Generic;

namespace DataLayer.Models.EntityModels
{
    public partial class MenuNamingConventionView
    {
        public int id { get; set; }
        public string? trackerName { get; set; }
        public string? abrvName { get; set; }
        public string? prefix { get; set; }
        public int? numberSeq { get; set; }
        public string? postfix { get; set; }
        public string? namingConv { get; set; }
        public string? lastUsedConv { get; set; }
        public string? nextToUseConv { get; set; }
        public string? active { get; set; }
        public string? group { get; set; }
    }
}
