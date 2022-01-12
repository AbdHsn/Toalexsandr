using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataLayer.Models.ViewModels
{
    public class TbDirectoryNamesView
    {
        public int Id { get; set; }
        public string? PersonName { get; set; }
        public string? PersonTitle { get; set; }
        public string? BaseOfOperation { get; set; }
    }
}
