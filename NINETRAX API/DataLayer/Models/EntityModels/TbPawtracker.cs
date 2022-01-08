using System;
using System.Collections.Generic;

namespace DataLayer.Models.EntityModels
{
    public partial class TbPawtracker
    {
        public int Id { get; set; }
        public string? PawNumber { get; set; }
        public string? Site { get; set; }
        public string? WoNumber { get; set; }
        public string? Annex { get; set; }
        public string? Location { get; set; }
        public string? SpecItem1 { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? DescriptionShort { get; set; }
        public string? PawLevel { get; set; }
        public string? PawRating { get; set; }
        public string? PawAssessment { get; set; }
        public string? Par { get; set; }
        public string? Validity { get; set; }
        public string? ToNumber { get; set; }
        public string? ModNumber { get; set; }
        public DateTime? DateReceived { get; set; }
        public DateTime? DateAcknowledged { get; set; }
        public DateTime? DateSentToPar { get; set; }
        public string? PastDueFromPar { get; set; }
        public DateTime? DateClosedByPar { get; set; }
        public string? PawStatus { get; set; }
        public string? PawResponse { get; set; }
        public string? ResponseBy { get; set; }
        public string? Comments { get; set; }
        public string? UnsatCondition { get; set; }
        public string? UnsatRootCause { get; set; }
    }
}
