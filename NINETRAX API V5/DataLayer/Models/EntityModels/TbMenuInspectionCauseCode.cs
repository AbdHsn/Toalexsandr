using System;
using System.Collections.Generic;

namespace DataLayer.Models.EntityModels
{
    public partial class TbMenuInspectionCauseCode
    {
        public int Id { get; set; }
        public string Seq { get; set; } = null!;
        public string? Status { get; set; }
    }
}
