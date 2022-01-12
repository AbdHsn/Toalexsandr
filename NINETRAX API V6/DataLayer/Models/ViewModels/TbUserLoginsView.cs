using System;
using System.Collections.Generic;

namespace DataLayer.Models.EntityModels
{
    public partial class TbUserLoginsView
    {
        public int Id { get; set; }
        public string? User3X5 { get; set; }
        public string? UserFn { get; set; }
        public string? UserLn { get; set; }
        public string? LoginId { get; set; }
        public string? Password { get; set; }
        public string? WorkSite { get; set; }
        public string? AccessLevel { get; set; }
        public bool? Dbaccess { get; set; }
        public bool? ReadRecordsOnly { get; set; }
        public bool? EditRecordsOnly { get; set; }
        public bool? AdminRights { get; set; }
        public bool? ResetPw { get; set; }
        public bool? AddUsers { get; set; }
        public bool? DeleteRecords { get; set; }
        public bool? AddRecords { get; set; }
        public string? SecurityQ1 { get; set; }
        public string? SecurityQ1a { get; set; }
        public string? SecurityQ2 { get; set; }
        public string? SecurityQ2a { get; set; }
        public string? SecurityQ3 { get; set; }
        public string? SecurityQ3a { get; set; }
        public bool? DbmasterUnlock { get; set; }
        public bool? CanImportFiles { get; set; }
        public bool? CanChangeDblocation { get; set; }
        public bool? CanBackupDb { get; set; }
        public bool? ActivateAutoLogOut { get; set; }
        public bool? DbupdateNotification { get; set; }
    }
}
