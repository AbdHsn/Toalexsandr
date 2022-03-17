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

        public string? techsName { get; set; }
        public string? causeCode { get; set; }
        public string? rootCause { get; set; }
        public string? subcontractorName { get; set; }
        public string? surveillanceType { get; set; }
        public string? surveillanceResults { get; set; }
        public string? specItemRequirements { get; set; }
        public DateTime? dateStarted { get; set; }
        public string? descriptionOfInspection { get; set; }
        public string? fmResponse { get; set; }
        public DateTime? dateReinspected { get; set; }
        public DateTime? dateClosed { get; set; }
        public string? qcComments { get; set; }
        public string? closedBy { get; set; }
        public string? qcComments2 { get; set; }
        public string? inspectionFailReason { get; set; }
    }
}