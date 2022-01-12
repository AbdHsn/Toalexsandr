using System;
using System.Collections.Generic;

namespace DataLayer.Models.EntityModels
{
    public partial class TbUserLevelAccesssView
    {
        public int Id { get; set; }
        public string? AccessLevel { get; set; }
        public bool? DatabaseView { get; set; }
        public bool? StatisticsView { get; set; }
    }
}
