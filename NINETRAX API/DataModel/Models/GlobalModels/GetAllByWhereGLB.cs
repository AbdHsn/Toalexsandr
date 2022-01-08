using System;
using System.Collections.Generic;
using System.Text;

namespace DataModel.Models.GlobalModels
{
    public class GetAllByWhereGLB : CommonProperties
    {
        public string SortColumn { get; set; }
        public int LimitStart { get; set; }
        public int LimitEnd { get; set; }

        public GetAllByWhereGLB()
        {
            if (this.LimitEnd == 0)
            {
                this.LimitEnd = 10;
            }
        }
    }
}
