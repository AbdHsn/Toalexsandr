﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DataLayer.Models.EntityModels
{
    public partial class TbDirectoryName
    {
        public int Id { get; set; }
        public string? PersonName { get; set; }
        public string? PersonTitle { get; set; }
        public string? BaseOfOperation { get; set; }
    }
}
