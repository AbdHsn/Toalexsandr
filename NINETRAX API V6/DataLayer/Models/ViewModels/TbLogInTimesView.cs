using System;
using System.Collections.Generic;

namespace DataLayer.Models.EntityModels
{
    public partial class TbLogInTimesView
    {
        public int Id { get; set; }
        public int LogId { get; set; }
        public string? UserId { get; set; }
        public DateTime? LoginTime { get; set; }
        public DateTime? LogOutTime { get; set; }
    }
}
