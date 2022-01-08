using System;
using System.Collections.Generic;

namespace DataLayer.Models.EntityModels
{
    public partial class TbCcrtrackersView
    {
        public int Id { get; set; }
        public string? CcrNumber { get; set; }
        public string? Site { get; set; }
        public string? WoNumber { get; set; }
        public string? Annex { get; set; }
        public string? Location { get; set; }
        public string? SpecItem1 { get; set; }
        public string? SpecItem3 { get; set; }
        public string? Title { get; set; }
        public string? Par { get; set; }
        public string? FmBldgManager { get; set; }
        public string? IssuedBy { get; set; }
        public DateTime? DateReceived { get; set; }
        public DateTime? DateAcked { get; set; }
        public DateTime? DateResponded { get; set; }
        public DateTime? DateClosed { get; set; }
        public string? Description { get; set; }
        public string? DetailOfComplaint { get; set; }
        public string? DetailOfComplaintShort { get; set; }
        public string? Comments { get; set; }
        public string? CcrResponse { get; set; }
        public string? ResponseBy { get; set; }
        public string? Valid { get; set; }
        public string? Isitvalid { get; set; }
        public string? Status { get; set; }
        public string? UnsatCondition { get; set; }
        public string? UnsatRootCause { get; set; }
    }
}
