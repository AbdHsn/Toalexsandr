using System;
using System.Collections.Generic;

namespace DataLayer.Models.ViewModels
{
    public partial class DropDownMenuView
    {

        public int id { get; set; }
        public string? causeCode { get; set; }
        public string? rootCause { get; set; }
        public string? correctiveAction { get; set; }
        public string? qcstatus { get; set; }
        public string? pdrstatusMenu { get; set; }
        public string? pawstatusMenu { get; set; }
        public string? pawrating { get; set; }
        public string? pawAssessment { get; set; }
        public string? ccrstatusMenu { get; set; }
        public string? validity { get; set; }
        public string? qctechs { get; set; }
        public string? mptPar { get; set; }
        public string? mptAsgnCode { get; set; }
        public string? jaxPar { get; set; }
        public string? pawunsat { get; set; }
        public string? pawrootCause { get; set; }
        public string? fmBldgManager { get; set; }
        public string? estimators { get; set; }

    }
}