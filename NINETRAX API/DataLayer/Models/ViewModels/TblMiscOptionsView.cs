using System;
using System.Collections.Generic;

namespace DataLayer.Models.EntityModels
{
    public partial class TblMiscOptionsView
    {
        public int Id { get; set; }
        public bool? ShowHistoryInSearches { get; set; }
        public int? PdrtoApproveCounterNas { get; set; }
        public int? PdrtoApproveCounterMyp { get; set; }
        public string? HideIdiqHistory { get; set; }
        public string? DblocationLink { get; set; }
        public bool? TimedShutDown { get; set; }
        public int? AutoLogOffTimer { get; set; }
    }
}
