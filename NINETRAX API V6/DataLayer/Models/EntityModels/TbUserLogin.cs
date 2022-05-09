using System;
using System.Collections.Generic;

namespace DataLayer.Models.EntityModels
{
    public partial class TbUserLogin
    {
        public int ID { get; set; }
        public string? unique_id { get; set; }
        public string? UserFN { get; set; }
        public string? UserLN { get; set; }
        public string? LoginID { get; set; }
        public string? Password { get; set; }
        public string? WorkSite { get; set; }
        public string? AccessLevel { get; set; }
        public bool? DBAccess { get; set; }
        public bool? ReadRecordsOnly { get; set; }
        public bool? EditRecordsOnly { get; set; }
        public bool? AdminRights { get; set; }
        public bool? ResetPW { get; set; }
        public bool? AddUsers { get; set; }
        public bool? DeleteRecords { get; set; }
        public bool? AddRecords { get; set; }
        public string? SecurityQ1 { get; set; }
        public string? SecurityQ1A { get; set; }
        public string? SecurityQ2 { get; set; }
        public string? SecurityQ2A { get; set; }
        public string? SecurityQ3 { get; set; }
        public string? SecurityQ3A { get; set; }
        public bool? DBMasterUnlock { get; set; }
        public bool? CanImportFiles { get; set; }
        public bool? CanChangeDBLocation { get; set; }
        public bool? CanBackupDB { get; set; }
        public bool? ActivateAutoLogOut { get; set; }
        public bool? DBUpdateNotification { get; set; }
    }
}
