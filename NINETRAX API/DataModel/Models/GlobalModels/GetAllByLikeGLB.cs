using System;
using System.Collections.Generic;
using System.Text;

namespace DataModel.Models.GlobalModels
{
    public class GetAllByLikeGLB:CommonProperties
    {
        public string ColumnName { get; set; }
        public string ColumnValue { get; set; }
        public string OrderBy { get; set; }
        public int NumberOfReturnRow { get; set; }
    }
}
