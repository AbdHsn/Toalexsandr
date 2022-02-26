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
    }
}
