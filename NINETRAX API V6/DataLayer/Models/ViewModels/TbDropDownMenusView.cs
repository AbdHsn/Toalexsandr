using System;
using System.Collections.Generic;

namespace DataLayer.Models.EntityModels
{
    public partial class TbDropDownMenusView
    {
        public int ID { get; set; }
        public string? CauseCode { get; set; }
        public string? RootCause { get; set; }
        public string? CorrectiveAction { get; set; }
        public string? QCStatus { get; set; }
        public string? PDRStatusMenu { get; set; }
        public string? PAWStatusMenu { get; set; }
        public string? PAWRating { get; set; }
        public string? PAWAssessment { get; set; }
        public string? CCRStatusMenu { get; set; }
        public string? Validity { get; set; }
        public string? QCTechs { get; set; }
        public string? MPT_PAR { get; set; }
        public string? MPT_ASGN_Code { get; set; }
        public string? JAX_PAR { get; set; }
        public string? PAWUnsat { get; set; }
        public string? PAWRootCause { get; set; }
        public string? FM_BLDG_MANAGER { get; set; }
        public string? Estimators { get; set; }
    }
}
