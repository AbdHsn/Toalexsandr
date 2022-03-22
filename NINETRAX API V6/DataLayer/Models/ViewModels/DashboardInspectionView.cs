namespace DataLayer.Models.EntityModels
{
    public partial class DashboardInspectionView
    {
        public int Id { get; set; }
        public string? Crew { get; set; }
        public string? WorkOrder { get; set; }
        public DateTime? InspectionDate { get; set; }
        public string? Description { get; set; }
        public string? Location { get; set; }
        public string? Lead { get; set; }
        public string? CauseCode { get; set; }
        public string? Finding { get; set; }
        public string? Result { get; set; }
    }
}
