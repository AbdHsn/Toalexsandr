using System;
using System.Collections.Generic;

namespace DataLayer.Models.SPModels
{
    public partial class GetDailyInspectionReport
    {
        public int? Id { get; set; }
        public string? Location { get; set; }
        public string? WorkOrder { get; set; }
        public string? WorkType { get; set; }
        public string? Description { get; set; }
        public DateTime? ActualFinish { get; set; }
        public string? InspectionResults { get; set; }
        public DateTime? EnteredDate { get; set; }
        public string? CauseCode { get; set; }
        public string? ReportType { get; set; }
    }
}
