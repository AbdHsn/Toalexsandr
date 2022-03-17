using System;
using System.Collections.Generic;

namespace DataLayer.Models.ViewModels
{
    public partial class CCRTrackersView
    {
        public int Id { get; set; }
        public string? CCRNumber { get; set; }
        public string? Location { get; set; }
        public string? FMManager { get; set; }
        public string? DetailOfComplaint { get; set; }
        public string? Par { get; set; }
        public string? Comments { get; set; }
        public DateTime? DateReceived { get; set; }
        public DateTime? DateAcknowledged { get; set; }
        public string? WONumber { get; set; }
        public DateTime? DateToPar { get; set; }
        public string? Status { get; set; }
        public string? Annex { get; set; }
        public string? SpecItem { get; set; }
        public string? Title { get; set; }
        public string? Validity { get; set; }
        public string? CCRResponse { get; set; }


        public string? site { get; set; }
        public string? specItem3 { get; set; }
        public string? issuedBy { get; set; }
        public DateTime? dateClosed { get; set; }
        public string? description { get; set; }
        public string? detailOfComplaintShort { get; set; }
        public string? responseBy { get; set; }
        public string? valid { get; set; }
        public string? unsatCondition { get; set; }
        public string? unsatRootCause { get; set; }


    }
}