using System;
using System.Collections.Generic;

namespace DataLayer.Models.EntityModels
{
    public partial class ATbNasbmdannexTable
    {
        public int Id { get; set; }
        public string? Site { get; set; }
        public string? AnnexName { get; set; }
        public string? Annex { get; set; }
        public string? SpecItem { get; set; }
        public string? Title { get; set; }
    }
}
