using System;
using System.Collections.Generic;

namespace DataLayer.Models.ViewModels
{
    public partial class CDRTrackersView
    {
        public int Id { get; set; }
        public string? CDRNumber { get; set; }
        public DateTime? DateReceived { get; set; }
        public string? Discrepancy { get; set; }
        public string? FunctionalManager { get; set; }
        public DateTime? ResponseDueDate { get; set; }
        public string? MemoNumber { get; set; }
        public string? FMResponse { get; set; }
        public DateTime? ResponseDate { get; set; }
        public DateTime? DateClosed { get; set; }
        public string? Status { get; set; }
        public string? Notes { get; set; }
    }
}
