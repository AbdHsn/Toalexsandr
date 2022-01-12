using System;
using System.Collections.Generic;

namespace DataLayer.Models.EntityModels
{
    public partial class TbMonthDate
    {
        public int Id { get; set; }
        public int? MonthId { get; set; }
        public string? MonthName { get; set; }
    }
}
