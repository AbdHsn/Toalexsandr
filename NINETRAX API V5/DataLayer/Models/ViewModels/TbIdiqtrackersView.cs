using System;
using System.Collections.Generic;

namespace DataLayer.Models.EntityModels
{
    public partial class TbIdiqtrackersView
    {
        public int Id { get; set; }
        public string? IdiqWorkOrderDescription { get; set; }
        public string? WoLocation { get; set; }
        public string? WoNumber { get; set; }
        public string? WoType { get; set; }
        public string? ModNumber { get; set; }
        public string? SubcontractorInHouse { get; set; }
        public string? SubcontractorName { get; set; }
        public string? Estimator { get; set; }
        public string? ParAssigned { get; set; }
        public DateTime? ApprovedStartDate { get; set; }
        public DateTime? ApprovedEndDate { get; set; }
        public DateTime? ActualCompletionDate { get; set; }
        public string? TaskCompleted { get; set; }
        public string? TaskCompletedOnTime { get; set; }
        public DateTime? QcReceivedDate { get; set; }
        public DateTime? QcInspectionComplete { get; set; }
        public DateTime? DateSentToPar { get; set; }
        public DateTime? DateReceivedFromPar { get; set; }
        public DateTime? DateSentToWorkControl { get; set; }
        public DateTime? DateWoWasClosed { get; set; }
        public string? WoCompleted { get; set; }
        public string? ClosedBy { get; set; }
        public string? VerifiedBy { get; set; }
        public string? WoStatus { get; set; }
        public string? Comments { get; set; }
        public string? CauseCode { get; set; }
        public string? RootCause { get; set; }
        public string? UnsatNotes { get; set; }
    }
}
