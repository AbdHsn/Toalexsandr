using System;
using System.Collections.Generic;

namespace DataLayer.Models.EntityModels
{
    public partial class ATbNasinspectionsImport
    {
        public int Id { get; set; }
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
        public DateTime? TargetStart { get; set; }
        public DateTime? TargetFinish { get; set; }
        public DateTime? ActualStart { get; set; }
        public DateTime? ActualFinish { get; set; }
        public DateTime? StatusDate { get; set; }
    }
}
