using System;
using System.Collections.Generic;

namespace DataLayer.Models.EntityModels
{
    public partial class TbLoginSecurityQsView
    {
        public int Id { get; set; }
        public string? SecurityQuestions { get; set; }
    }
}
