using System;
using System.Collections.Generic;

namespace DataLayer.Models.ViewModels
{
    public partial class PAWTrackersView
    {
        public int Id { get; set; }
        public string? PAWNumber { get; set; }
        public string? Location { get; set; }
        public string? Description { get; set; }
        public string? Par { get; set; }
        public DateTime? DateReceived { get; set; }
        public DateTime? DateAcknowledged { get; set; }
        public string? WONumber { get; set; }
        public DateTime? DateToPar { get; set; }
        public string? Status { get; set; }
        public string? Annex { get; set; }
        public string? SpecItem { get; set; }
        public string? Title { get; set; }
        public string? Validity { get; set; }
        public string? PawResponse { get; set; }
        //

        public string? site { get; set; }
        public string? descriptionShort { get; set; }
        public string? pawLevel { get; set; }
        public string? pawRating { get; set; }
        public string? pawAssessment { get; set; }
        public string? toNumber { get; set; }
        public string? modNumber { get; set; }
        public string? pastDueFromPar { get; set; }
        public DateTime? dateClosedByPar { get; set; }
        public string? responseBy { get; set; }
        public string? comments { get; set; }
        public string? unsatCondition { get; set; }
        public string? unsatRootCause { get; set; }
    }
}
