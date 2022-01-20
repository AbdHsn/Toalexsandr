namespace NINETRAX.Globals.Models
{
    public class DataTableResponseVW
    {
        public object data { get; set; }
        public object sumdata { get; set; }
        public int draw { get; set; }
        public long totalFilteredRecords { get; set; }
        public long totalRecords { get; set; }
        public string error { get; set; }
        public object chartData { get; set; }
    }
}
