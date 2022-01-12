using System;
using System.Collections.Generic;

namespace DataLayer.Models.EntityModels
{
    public partial class TblSecureLoginsView
    {
        public int Id { get; set; }
        public bool? HideAllWinMenus { get; set; }
        public string? OtherOptions { get; set; }
    }
}
