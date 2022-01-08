using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataModel.Models.GlobalModels
{
    public class DatatableResponseGLB
    {
        public object data { get; set; }
        public object sumdata { get; set; }
        public int draw { get; set; }
        public long recordsFiltered { get; set; }
        public long recordsTotal { get; set; }
        public string error { get; set; }
    }
}
