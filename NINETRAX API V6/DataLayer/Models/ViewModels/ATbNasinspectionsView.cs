using System;
using System.Collections.Generic;

namespace DataLayer.Models.EntityModels
{
    public partial class ATbNasinspectionsView
    {
        public int Id { get; set; }
        public string? Annex { get; set; }
        public string? SpecItem { get; set; }
        public string? Title { get; set; }
        public string? WorkOrder { get; set; }
        public string? Description { get; set; }
        public string? Location { get; set; }
        public string? Asset { get; set; }
       // public string? Status { get; set; }
        public string? Crew { get; set; }
        public string? Lead { get; set; }
        public string? WorkType { get; set; }
        public string? SubWorkType { get; set; }
        //public string? Priority { get; set; }
        //public string? Elin { get; set; }
        //public string? GlAccount { get; set; }
       // public DateTime? TargetStart { get; set; }
       // public DateTime? TargetFinish { get; set; }
      //  public DateTime? ActualStart { get; set; }
        public DateTime? ActualFinish { get; set; }
      //  public DateTime? StatusDate { get; set; }
        public string? QcInspector { get; set; }
        public DateTime? InspectionDate { get; set; }
        public DateTime? EnteredDate { get; set; }
        public string? Duration { get; set; }
        public string? InspectionResults { get; set; }
       // public string? UnsatFindings { get; set; }
       // public string? CauseCode { get; set; }
      //  public string? RootCause { get; set; }
       // public string? CorrectiveActions { get; set; }
      //  public DateTime? ReinspectionDate { get; set; }
       // public string? ReinspectionStatus { get; set; }
       // public string? Qccomments { get; set; }
       // public bool Selected { get; set; }
       // public bool Task { get; set; }
       // public bool IsDelete { get; set; }
       // public string? DeletedBy { get; set; }
    }
}
