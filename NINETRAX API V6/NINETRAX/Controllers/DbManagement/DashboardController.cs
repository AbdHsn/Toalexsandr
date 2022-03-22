

using DataLayer.Models.EntityModels;
using DataLayer.Models.GlobalModels;
using DataLayer.Models.ViewModels;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RepositoryLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NINETRAX.Controllers.DbManagement
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : Controller
    {

        #region Variables
        private readonly IWebHostEnvironment _heSrv;
        private readonly EntityContext _context;
        #endregion

        #region Constructor
        public DashboardController(
            IWebHostEnvironment heSrv,
            EntityContext context
        )
        {
            _heSrv = heSrv;
            _context = context;
        }
        #endregion

        #region Get Dashboard data

        [HttpGet("GetDashboardInspectionData")]
        public async Task<ActionResult<IEnumerable<object>>> DashboardInspectionData( DateTime fromDate, DateTime toDate, string? inspectionResult)
        {
            try
            {
                if (fromDate <= toDate)
                {
                    var data = await _context.Set<DashboardInspectionView>().FromSqlRaw($"SELECT * FROM DashboardInspectionView WHERE InspectionDate >= '{fromDate:yyyy-MM-dd}' AND InspectionDate <= '{toDate:yyyy-MM-dd}' ORDER BY InspectionDate DESC").AsNoTracking().ToListAsync();
                    return StatusCode(200, data);
                }
                else
                    return StatusCode(200, null);

            }
            catch (Exception ex)
            {
                return StatusCode(400, "Process failed.");

            }

        }

        #endregion

    }
}
