using System;
using System.Collections.Generic;

namespace DataLayer.Models.EntityModels
{
    public partial class ATbPdrtrackersView
    {
        public int Id { get; set; }
        public string? Pdrnumber { get; set; }
        public string? WorkOrder { get; set; }
        public string? Location { get; set; }
        public string? TechsName { get; set; }
        public string? QcInspector { get; set; }
        public string? UnsatFindings { get; set; }
        public string? CauseCode { get; set; }
        public string? RootCause { get; set; }
        public string? SubcontractorName { get; set; }
        public string? SurveillanceType { get; set; }
        public string? SurveillanceResults { get; set; }
        public string? Annex { get; set; }
        public string? SpecItem { get; set; }
        public string? Title { get; set; }
        public string? SpecItemRequirements { get; set; }
        public DateTime? DateStarted { get; set; }
        public DateTime? DateCompleted { get; set; }
        public string? DescriptionOfInspection { get; set; }
        public string? Fmname { get; set; }
        public string? Fmtitle { get; set; }
        public string? FmResponse { get; set; }
        public DateTime? DateIssued { get; set; }
        public DateTime? DateDue { get; set; }
        public DateTime? DateReinspected { get; set; }
        public DateTime? DateClosed { get; set; }
        public string? QcComments { get; set; }
        public string? ClosedBy { get; set; }
        public string? Status { get; set; }
        public string? QcComments2 { get; set; }
        public string? InspectionFailReason { get; set; }
    }
}
