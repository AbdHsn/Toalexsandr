using System;
using System.Collections.Generic;

namespace DataLayer.Models.EntityModels
{
    public partial class TblSecureLogin
    {
        public int Id { get; set; }
        public bool? HideAllWinMenus { get; set; }
        public string? OtherOptions { get; set; }
    }
}
