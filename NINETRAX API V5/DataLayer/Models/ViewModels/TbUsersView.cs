using System;
using System.Collections.Generic;

namespace DataLayer.Models.EntityModels
{
    public partial class TbUsersView
    {
        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? FullName { get; set; }
        public bool QualityInspectors { get; set; }
        public bool AssosicateInspectors { get; set; }
        public bool PlanEstimateInspectors { get; set; }
        public bool CustomerInspectors { get; set; }
        public string? Aor { get; set; }
        public string? PositionTitle { get; set; }
        public string? Email { get; set; }
        public string? AccessType { get; set; }
        public bool ActiveStatus { get; set; }
        public bool FullAdminRights { get; set; }
        public bool EditRights { get; set; }
        public bool DeleteRights { get; set; }
        public bool ViewRights { get; set; }
        public bool ImportRights { get; set; }
        public bool ActivateAutologout { get; set; }
        public string? LoginId { get; set; }
        public string? Password { get; set; }
        public bool ResetPassword { get; set; }
        public string? SecurityQuesOne { get; set; }
        public string? SecurityAnsOne { get; set; }
    }
}
