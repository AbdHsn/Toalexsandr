using System;
using System.Collections.Generic;

namespace DataLayer.Models.EntityModels
{
    public partial class TbCdrtracker
    {
        public int Id { get; set; }
        public string? Cdrnumber { get; set; }
        public DateTime? Datereceived { get; set; }
        public string? Discrepancy { get; set; }
        public string? Discrepancyshort { get; set; }
        public string? Isitvalid { get; set; }
        public string? Functionalmanager { get; set; }
        public DateTime? Responseduedate { get; set; }
        public string? Considerations { get; set; }
        public string? Memonumber { get; set; }
        public string? Response { get; set; }
        public DateTime? Responsedate { get; set; }
        public DateTime? Dateclosed { get; set; }
        public string? Status { get; set; }
        public string? Notes { get; set; }
    }
}
