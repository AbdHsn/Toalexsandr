namespace NINETRAX.Globals.Models
{
    public class DataTableResponseVW
    {
        public object data { get; set; }
        public object sumdata { get; set; }
        public int draw { get; set; }
        public long recordsFiltered { get; set; }
        public long recordsTotal { get; set; }
        public string error { get; set; }
        public object chartData { get; set; }
    }
}
