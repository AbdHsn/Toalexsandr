using System;
using System.Collections.Generic;

namespace DataLayer.Models.EntityModels
{
    public partial class TbMenuCustomerFmbldgManagersView
    {
        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? FullName { get; set; }
        public string? Aor { get; set; }
        public string? Email { get; set; }
        public bool? Active { get; set; }
    }
}
