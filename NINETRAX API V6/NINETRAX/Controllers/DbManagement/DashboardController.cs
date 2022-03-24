

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
        public async Task<ActionResult<IEnumerable<object>>> DashboardInspectionData( DateTime fromDate, DateTime toDate)
        {
            try
            {
                if (fromDate <= toDate)
                {
                    var getSatData = await _context.Set<DashboardInspectionView>().FromSqlRaw($"SELECT * FROM DashboardInspectionView WHERE InspectionDate >= '{fromDate:yyyy-MM-dd}' AND InspectionDate <= '{toDate:yyyy-MM-dd}' AND Result = 'SAT' ORDER BY InspectionDate DESC").AsNoTracking().ToListAsync();
                    var getUnsatData = await _context.Set<DashboardInspectionView>().FromSqlRaw($"SELECT * FROM DashboardInspectionView WHERE InspectionDate >= '{fromDate:yyyy-MM-dd}' AND InspectionDate <= '{toDate:yyyy-MM-dd}' AND Result = 'UNSAT' ORDER BY InspectionDate DESC").AsNoTracking().ToListAsync();
                    var getUnsatBreakDownData = await _context.Set<DashboardUnsatBreakDownView>().FromSqlRaw($"SELECT COUNT(Id) Total, CauseCode FROM DashboardInspectionView WHERE InspectionDate >= '{fromDate:yyyy-MM-dd}' AND InspectionDate <= '{toDate:yyyy-MM-dd}'  AND Result = 'UNSAT' GROUP BY CauseCode").AsNoTracking().ToListAsync();

                    //Assign unsatebreakdown values...
                    var returnData = new
                    {
                        satData = getSatData,
                        unsatData = getUnsatData,
                        unsatBreakDown = new
                        {
                            Workmanship = getUnsatBreakDownData.Count > 0 ? getUnsatBreakDownData.Where(f => f.CauseCode == "Workmanship").FirstOrDefault()?.Total ?? 0 : 0,
                            Incomplete = getUnsatBreakDownData.Count > 0 ?  getUnsatBreakDownData.Where(f => f.CauseCode == "Incomplete").FirstOrDefault()?.Total ?? 0: 0,
                            Documentation = getUnsatBreakDownData.Count > 0 ? getUnsatBreakDownData.Where(f => f.CauseCode == "Documentation").FirstOrDefault()?.Total ?? 0: 0,
                            Timeliness = getUnsatBreakDownData.Count > 0 ? getUnsatBreakDownData.Where(f => f.CauseCode == "Timeliness").FirstOrDefault()?.Total ?? 0: 0,
                            Housekeeping = getUnsatBreakDownData.Count > 0 ? getUnsatBreakDownData.Where(f => f.CauseCode == "Housekeeping").FirstOrDefault()?.Total ?? 0: 0,
                            Communication = getUnsatBreakDownData.Count > 0 ? getUnsatBreakDownData.Where(f => f.CauseCode == "Communication").FirstOrDefault()?.Total ?? 0: 0,
                            //Procedural = 0,
                        }
                    };
                    return StatusCode(200, returnData);
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
