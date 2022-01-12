using System;
using System.Collections.Generic;

namespace DataLayer.Models.EntityModels
{
    public partial class ATbElinNumber
    {
        public int Id { get; set; }
        public string? Site { get; set; }
        public string? Elin { get; set; }
        public string? ProjectNo { get; set; }
        public string? Description { get; set; }
        public string? WorkType { get; set; }
        public string? SubType { get; set; }
        public string? PrimPm { get; set; }
        public string? SecPm { get; set; }
        public string? Annex { get; set; }
        public string? Spec { get; set; }
        public string? Title { get; set; }
    }
}
