using System;
using System.Collections.Generic;

namespace DataLayer.Models.ExcelModels
{
    public partial class ImportFromMaximo
    {
        public string? WorkOrder { get; set; }
        public string? Description { get; set; }
        public string? Long_Description { get; set; }
        public string? Location { get; set; }
        public string? Asset { get; set; }
        public string? Asset_Description { get; set; }
        public string? Status { get; set; }
        public string? Crew { get; set; }
        public string? Lead { get; set; }
        public string? WorkType { get; set; }
        public string? SubWorkType { get; set; }
        public string? Elin { get; set; }
        public string? OnBehalfOf { get; set; }
        public string? Phone { get; set; }
        public string? Duration { get; set; }
        //public string? Priority { get; set; }
       // public string? GlAccount { get; set; }
        public string? TargetStart { get; set; }
        public string? TargetFinish { get; set; }
        public string? ActualStart { get; set; }
        public string? ActualFinish { get; set; }
        public string? StatusDate { get; set; }
    }
}
