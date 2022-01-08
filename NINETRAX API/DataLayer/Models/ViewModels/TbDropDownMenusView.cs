using System;
using System.Collections.Generic;

namespace DataLayer.Models.EntityModels
{
    public partial class TbDropDownMenusView
    {
        public int Id { get; set; }
        public string? CauseCode { get; set; }
        public string? RootCause { get; set; }
        public string? CorrectiveAction { get; set; }
        public string? Qcstatus { get; set; }
        public string? PdrstatusMenu { get; set; }
        public string? PawstatusMenu { get; set; }
        public string? Pawrating { get; set; }
        public string? PawAssessment { get; set; }
        public string? CcrstatusMenu { get; set; }
        public string? Validity { get; set; }
        public string? Qctechs { get; set; }
        public string? MptPar { get; set; }
        public string? MptAsgnCode { get; set; }
        public string? JaxPar { get; set; }
        public string? Pawunsat { get; set; }
        public string? PawrootCause { get; set; }
        public string? FmBldgManager { get; set; }
        public string? Estimators { get; set; }
    }
}
