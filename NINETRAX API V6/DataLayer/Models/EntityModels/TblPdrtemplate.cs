using System;
using System.Collections.Generic;

namespace DataLayer.Models.EntityModels
{
    public partial class TblPdrtemplate
    {
        public int Id { get; set; }
        public string? TemplateName { get; set; }
        public string? SurveillanceType { get; set; }
        public string? SurveillanceResults { get; set; }
        public string? Annex { get; set; }
        public string? SpecItem { get; set; }
        public string? Title { get; set; }
        public string? Fmname { get; set; }
        public string? Fmtitle { get; set; }
        public string? Requirements { get; set; }
        public string? CauseCode { get; set; }
        public string? RootCause { get; set; }
    }
}
