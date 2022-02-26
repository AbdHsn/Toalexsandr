using System;
using System.Collections.Generic;

namespace DataLayer.Models.ViewModels
{
    public partial class PDRTrackersView
    {
        public int Id { get; set; }
        public string? PDRNumber { get; set; }
        public string? WorkOrder { get; set; }
        public string? Location { get; set; }
        public string? QCInspector { get; set; }
        public string? Annex { get; set; }
        public string? SpecItem { get; set; }
        public string? Title { get; set; }
        public DateTime? DateCompleted { get; set; }
        public string? UnsatFindings { get; set; }
        public string? FMName { get; set; }
        public string? FMTitle { get; set; }
        public DateTime? DateIssued { get; set; }
        public DateTime? DateDue { get; set; }
        public string? Status { get; set; }
    }
}