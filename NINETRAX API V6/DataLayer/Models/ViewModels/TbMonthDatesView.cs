using System;
using System.Collections.Generic;

namespace DataLayer.Models.EntityModels
{
    public partial class TbMonthDatesView
    {
        public int Id { get; set; }
        public int? MonthId { get; set; }
        public string? MonthName { get; set; }
    }
}
