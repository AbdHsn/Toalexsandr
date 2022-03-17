using System;
using System.Collections.Generic;

namespace DataLayer.Models.ViewModels
{
    public partial class IDIQTrackersView
    {
        public int Id { get; set; }
        public string? WONumber { get; set; }
        public string? IDIQSOWDescription { get; set; }
        public string? Location { get; set; }
        public string? WOType { get; set; }
        public string? Estimator { get; set; }
        public string? ParAssigned { get; set; }
        public string? VerifiedBy { get; set; }
        public DateTime? InspectionDate { get; set; }
        public DateTime? DateToPar { get; set; }
        public DateTime? DateFromPar { get; set; }
        public string? WOStatus { get; set; }
        public string? Comments { get; set; }
        public string? TaskCompleted { get; set; }


        public DateTime? ApprovedStartDate { get; set; }
        public DateTime? ApprovedEndDate { get; set; }
        public DateTime? ActualCompletionDate { get; set; }
        public string? TaskCompletedOnTime { get; set; }
        public DateTime? QCReceivedDate { get; set; }
        public string? ClosedBy { get; set; }
        public DateTime? DateSentToWorkControl { get; set; }
        public string? SubContractorInHouse { get; set; }
        public string? SubContractorName { get; set; }
        public DateTime? DateWoWasClosed { get; set; }
        public string? UnsatNotes { get; set; }
        public string? RootCause { get; set; }
        public string? CauseCode { get; set; }
    }
}
