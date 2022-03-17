using System;
using System.Collections.Generic;

namespace DataLayer.Models.ViewModels
{
    public partial class NCRTrackersView
    {
        public int Id { get; set; }
        public string? NCRNumber { get; set; }
        public string? PDRNumber { get; set; }
        public string? WONumber { get; set; }
        public DateTime? DateIssued { get; set; }
        public string? QCInspector { get; set; }
        public string? NonConformanceSummary { get; set; }
        public DateTime? DateCAPDue { get; set; }
        public string? Status { get; set; }
        public string? Annex { get; set; }
        public string? SpecItem { get; set; }
        public string? Title { get; set; }
        public string? ResponsiblePerson { get; set; }
        public string? ResponsibleSub { get; set; }

        //

        public string? site { get; set; }
        public string? qcfrNumber { get; set; }
        public string? assessmentType { get; set; }
        public string? nonconformanceType { get; set; }
        public string? requirement1 { get; set; }
        public string? observation1 { get; set; }
        public string? requirement2 { get; set; }
        public string? observation2 { get; set; }
        public string? requirement3 { get; set; }
        public string? observation3 { get; set; }
        public string? requirement4 { get; set; }
        public string? observation4 { get; set; }
        public string? responsibleDiscipline { get; set; }
        public string? comments { get; set; }
    }
}
