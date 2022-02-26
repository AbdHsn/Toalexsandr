using System;
using System.Collections.Generic;

namespace DataLayer.Models.ViewModels
{
    public partial class NCRTrackersView
    {
        public int Id { get; set; }
        public string? NCRNumber { get; set; }
        public string? PDRNumber { get; set; }
        public string? WONumber { get; set; }
        public DateTime? DateIssued { get; set; }
        public string? QCInspector { get; set; }
        public string? NonConformanceSummary { get; set; }
        public DateTime? DateCAPDue { get; set; }
        public string? Status { get; set; }
        public string? Annex { get; set; }
        public string? SpecItem { get; set; }
        public string? Title { get; set; }
        public string? ResponsiblePerson { get; set; }
        public string? ResponsibleSub { get; set; }
    }
}
