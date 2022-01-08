using System;
using System.Collections.Generic;

namespace DataLayer.Models.EntityModels
{
    public partial class TbNcrtracker
    {
        public int Id { get; set; }
        public string? Site { get; set; }
        public string? NcrNumber { get; set; }
        public string? QcfrNumber { get; set; }
        public string? PdrNumber { get; set; }
        public string? WoNumber { get; set; }
        public DateTime? DateIssued { get; set; }
        public string? QcInspector { get; set; }
        public string? NonconformanceSummary { get; set; }
        public string? Annex { get; set; }
        public string? SpecItem { get; set; }
        public string? Title { get; set; }
        public string? AssessmentType { get; set; }
        public string? NonconformanceType { get; set; }
        public string? Requirement1 { get; set; }
        public string? Observation1 { get; set; }
        public string? Requirement2 { get; set; }
        public string? Observation2 { get; set; }
        public string? Requirement3 { get; set; }
        public string? Observation3 { get; set; }
        public string? Requirement4 { get; set; }
        public string? Observation4 { get; set; }
        public string? ResponsiblePersone { get; set; }
        public string? ResponsibleDiscipline { get; set; }
        public string? ResponsibleSub { get; set; }
        public DateTime? DateCapDue { get; set; }
        public string? Comments { get; set; }
        public string? Status { get; set; }
    }
}
