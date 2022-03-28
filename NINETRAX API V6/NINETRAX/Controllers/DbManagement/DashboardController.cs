using DataLayer.Models.EntityModels;
using DataLayer.Models.GlobalModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RepositoryLayer;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;
using NINETRAX.Globals;

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
                    int totalInspection = await _context.ATbNasinspections.Where(i => i.InspectionDate.Value.Date >= fromDate.Date && i.InspectionDate.Value.Date <= toDate.Date)?.CountAsync();
                    int totalPAW = await _context.TbPawtrackers.Where(i => i.DateReceived.Value.Date >= fromDate.Date && i.DateReceived.Value.Date <= toDate.Date)?.CountAsync();
                    int totalIDIQ = await _context.TbIdiqtrackers.Where(i => i.QcInspectionComplete.Value.Date >= fromDate.Date && i.QcInspectionComplete.Value.Date <= toDate.Date)?.CountAsync();

                    var getSatData = await _context.Set<DashboardInspectionView>().FromSqlRaw($"SELECT * FROM DashboardInspectionView WHERE InspectionDate >= '{fromDate:yyyy-MM-dd}' AND InspectionDate <= '{toDate:yyyy-MM-dd}' AND Result = 'SAT' ORDER BY InspectionDate DESC").AsNoTracking().ToListAsync();
                    var getUnsatData = await _context.Set<DashboardInspectionView>().FromSqlRaw($"SELECT * FROM DashboardInspectionView WHERE InspectionDate >= '{fromDate:yyyy-MM-dd}' AND InspectionDate <= '{toDate:yyyy-MM-dd}' AND Result = 'UNSAT' ORDER BY InspectionDate DESC").AsNoTracking().ToListAsync();
                    var getUnsatBreakDownData = await _context.Set<DashboardUnsatBreakDownView>().FromSqlRaw($"SELECT COUNT(Id) Total, CauseCode FROM DashboardInspectionView WHERE InspectionDate >= '{fromDate:yyyy-MM-dd}' AND InspectionDate <= '{toDate:yyyy-MM-dd}'  AND Result = 'UNSAT' GROUP BY CauseCode").AsNoTracking().ToListAsync();

                    //Assign unsatebreakdown values...
                    var returnData = new
                    {
                        satData = getSatData,
                        unsatData = getUnsatData,
                        summaryData = new { 
                            totalSat = getSatData?.Count() ?? 0,
                            totalUnsat = getUnsatData?.Count() ?? 0,
                            totalInspection = totalInspection,
                            totalPAW = totalPAW,
                            totalIDIQ = totalIDIQ,
                        },
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

        #region Export
        [HttpGet("[action]")]
        public async Task<IActionResult> ExportToExcel(DateTime fromDate, DateTime toDate, string result)
        {
            DatatableResponseGLB response = new DatatableResponseGLB();
            try
            {

                if(string.IsNullOrWhiteSpace(result))
                    return StatusCode(400, "Can't export.");


                #region database query code 

                var dataGrid = new List<DashboardInspectionView>();
                if (result == "SAT")
                {
                    dataGrid = await _context.Set<DashboardInspectionView>().FromSqlRaw($"SELECT * FROM DashboardInspectionView WHERE InspectionDate >= '{fromDate:yyyy-MM-dd}' AND InspectionDate <= '{toDate:yyyy-MM-dd}' AND Result = 'SAT' ORDER BY InspectionDate DESC").AsNoTracking().ToListAsync();
                }
                else if (result == "UNSAT")
                {
                    dataGrid = await _context.Set<DashboardInspectionView>().FromSqlRaw($"SELECT * FROM DashboardInspectionView WHERE InspectionDate >= '{fromDate:yyyy-MM-dd}' AND InspectionDate <= '{toDate:yyyy-MM-dd}' AND Result = 'UNSAT' ORDER BY InspectionDate DESC").AsNoTracking().ToListAsync();
                }


                #endregion database query code

                #region Excel data manipulating
                IWorkbook workbook = new XSSFWorkbook();
                ISheet excelSheet = workbook.CreateSheet("Sheet-01");
                XSSFCellStyle style = (XSSFCellStyle)workbook.CreateCellStyle();
                style.WrapText = true;
                //defining font...
                IFont boldFont = workbook.CreateFont();
                boldFont.Boldweight = (short)FontBoldWeight.Bold;
                ICellStyle boldStyle = workbook.CreateCellStyle();
                boldStyle.SetFont(boldFont);

                //defining color...
                boldStyle.FillForegroundColor = NPOI.HSSF.Util.HSSFColor.SkyBlue.Index;
                boldStyle.FillPattern = FillPattern.SolidForeground;

                //defining column names
                List<string> columnNames = new List<string>()
                {
                    "Crew",
                    "Work Order",
                    "Inspection Date",
                    "Description",
                    "Location",
                    "Lead",
                    "Cause Code",
                    "Finding",
                    "Status"
                };

                //drawing header columns into excel
                IRow row = excelSheet.CreateRow(0);

                foreach (var column in columnNames)
                {
                    var cell = row.CreateCell(columnNames.IndexOf(column));
                    cell.SetCellValue(column);
                    cell.CellStyle = boldStyle;
                }
                //set header column width
                excelSheet.SetColumnWidth(0, 3400);
                excelSheet.SetColumnWidth(1, 2600);
                excelSheet.SetColumnWidth(2, 6600);
                excelSheet.SetColumnWidth(3, 12600);
                excelSheet.SetColumnWidth(4, 6600);
                excelSheet.SetColumnWidth(5, 8600);
                excelSheet.SetColumnWidth(6, 6600);
                excelSheet.SetColumnWidth(7, 6600);
                excelSheet.SetColumnWidth(8, 6600);


                //drawing cell data into excel
                foreach (var item in dataGrid)
                {
                    row = excelSheet.CreateRow(dataGrid.IndexOf(item) + 1);

                    //normal cell defining...
                    row.CreateCell(0).SetCellValue(item.Crew);
                    row.CreateCell(1).SetCellValue(item.WorkOrder);
                    row.CreateCell(2).SetCellValue(item.InspectionDate.HasValue ? item.InspectionDate.Value.ToString("MM/dd/yyyy") : "No data");
                    row.CreateCell(3).SetCellValue(item.Description);
                    row.CreateCell(4).SetCellValue(item.Location);
                    row.CreateCell(5).SetCellValue(item.Lead);
                    row.CreateCell(6).SetCellValue(item.CauseCode);
                    row.CreateCell(7).SetCellValue(item.Finding);
                    row.CreateCell(8).SetCellValue(item.Result);
                }
                #endregion

                var prepareExcelData = CommonServices.ExportToExcelFile(_heSrv, Request, workbook);

                if (prepareExcelData != null)
                    return File(prepareExcelData, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "File.xlsx");
                else
                    return StatusCode(400, "Export data is empty");
            }
            catch (Exception ex)
            {
                return StatusCode(400, "Failed to export.");
                // return null;
            }
        }

        #endregion

    }
}
