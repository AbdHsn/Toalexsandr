using System;
using System.Collections.Generic;

namespace DataLayer.Models.EntityModels
{
    public partial class UserLoginView
    {
        public int id { get; set; }
        public string? unique_id { get; set; }
        public string? userFN { get; set; }
        public string? userLN { get; set; }
        public string? loginID { get; set; }
        public string? password { get; set; }
        public string? workSite { get; set; }
        public string? accessLevel { get; set; }
        public bool? dbAccess { get; set; }
        public bool? readRecordsOnly { get; set; }
        public bool? editRecordsOnly { get; set; }
        public bool? adminRights { get; set; }
        public bool? resetPW { get; set; }
        public bool? addUsers { get; set; }
        public bool? deleteRecords { get; set; }
        public bool? addRecords { get; set; }
        public string? securityQ1 { get; set; }
        public string? securityQ1A { get; set; }
        public string? securityQ2 { get; set; }
        public string? securityQ2A { get; set; }
        public string? securityQ3 { get; set; }
        public string? securityQ3A { get; set; }
        public bool? dbMasterUnlock { get; set; }
        public bool? canImportFiles { get; set; }
        public bool? canChangeDBLocation { get; set; }
        public bool? canBackupDB { get; set; }
        public bool? activateAutoLogOut { get; set; }
        public bool? dbUpdateNotification { get; set; }
    }
}
