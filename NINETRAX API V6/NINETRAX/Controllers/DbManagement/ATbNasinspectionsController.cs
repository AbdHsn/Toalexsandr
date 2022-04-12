using DataLayer.Models.EntityModels;
using DataLayer.Models.GlobalModels;
using DataLayer.Models.SPModels;
using DataLayer.Models.ViewModels;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NINETRAX.Globals;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;
using RepositoryLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NINETRAX.Controllers.DbManagement
{
    [Route("api/d/[controller]")]
    [ApiController]
    public class ATbNasinspectionsController : Controller
    {

        #region Variables
        private readonly IWebHostEnvironment _heSrv;
        private readonly EntityContext _context;
        private readonly IRawQueryRepo<ATbNasinspection> _ATbNasinspectionContext;
        private readonly IRawQueryRepo<ATbNasinspectionsView> _getATbNasinspectionsView;
        private readonly IRawQueryRepo<TotalRecordCountGLB> _getTotalRecordCountGLB;
        private readonly IRawQueryRepo<Object> _getAllByLike;
        private readonly IRawQueryRepo<GetDailyInspectionReport> _getDailyInspectionReport;

        #endregion

        #region Constructor
        public ATbNasinspectionsController(
            IWebHostEnvironment heSrv,
            EntityContext context,
            IRawQueryRepo<ATbNasinspection> ATbNasinspectionContext,
            IRawQueryRepo<ATbNasinspectionsView> getATbNasinspectionsView,
            IRawQueryRepo<TotalRecordCountGLB> getTotalRecordCountGLB,
            IRawQueryRepo<Object> getAllByLike,
                   IRawQueryRepo<GetDailyInspectionReport> getDailyInspectionReport
        )
        {
            _ATbNasinspectionContext = ATbNasinspectionContext;
            _heSrv = heSrv;
            _context = context;
            _getATbNasinspectionsView = getATbNasinspectionsView;
            _getTotalRecordCountGLB = getTotalRecordCountGLB;
            _getAllByLike = getAllByLike;
            _getDailyInspectionReport = getDailyInspectionReport;
        }
        #endregion

        #region GetATbNasinspectionView
        [HttpPost("GetATbNasinspectionsView")]
        public async Task<ActionResult<DatatableResponseGLB>> GetATbNasinspectionsView(DatatableGLB datatableGLB)
        {


            DatatableResponseGLB response = new DatatableResponseGLB();
            try
            {
                int rowSize = 0;
                if (datatableGLB.length == "All")
                {
                    rowSize = 0;
                }
                else
                {
                    rowSize = int.Parse(datatableGLB.length);
                }

                string searchText = default(string);
                if (datatableGLB.search != null)
                {
                    searchText = datatableGLB.search.value;
                }

                #region single sort gathering code
                string sortInformation = null;
                if (datatableGLB.orders != null && datatableGLB.orders.Count > 0)
                {
                    var getSort = datatableGLB.orders.FirstOrDefault();
                    sortInformation = getSort.column + " " + getSort.order_by;
                }
                else
                {
                    //assign default sort info base on column
                    sortInformation = "Id DESC";
                }


                #endregion single sort code

                #region where-condition gathering code
                string whereConditionStatement = null;
                if (datatableGLB != null && datatableGLB.searches.Count() > 0)
                {
                    foreach (var item in datatableGLB.searches)
                    {

                        if (item.search_by == "ActualFinishDateRange")
                        {
                            if (!string.IsNullOrEmpty(item.fromdate) && !string.IsNullOrEmpty(item.todate))
                                whereConditionStatement += "DATE_FORMAT(ActualFinish, '%Y-%m-%d') >= '" + DateTime.Parse(item.fromdate).Date.ToString("yyyy-MM-dd") + "' AND DATE_FORMAT(ActualFinish,'%Y-%m-%d') <= '" + DateTime.Parse(item.todate).Date.ToString("yyyy-MM-dd") + "' AND ";
                        }
                        else if (item.search_by == "MultipleWorkOrder")
                        {
                            if (!string.IsNullOrEmpty(item.value))
                            {
                                whereConditionStatement += $"`WorkOrder` IN ({item.value}) AND ";
                            }
                        }
                        else if (!string.IsNullOrEmpty(item.value))
                            whereConditionStatement += $"`{item.search_by}` = '{item.value}' AND ";
                    }
                    if (!string.IsNullOrEmpty(whereConditionStatement))
                    {
                        whereConditionStatement = whereConditionStatement.Substring(0, whereConditionStatement.Length - 4);
                    }
                }
                #endregion where-condition gathering code

                #region database query code 
                var dataGrid = await _getATbNasinspectionsView.GetAllByWhere(new GetAllByWhereGLB()
                {
                    TableOrViewName = "ATbNasinspectionsView",
                    SortColumn = sortInformation,
                    WhereConditions = whereConditionStatement,
                    LimitStart = datatableGLB.start,
                    LimitEnd = rowSize
                });

                var dataGridCount = await _getTotalRecordCountGLB.CountAllByWhere(new CountAllByWhereGLB()
                {
                    TableOrViewName = "ATbNasinspectionsView",
                    WhereConditions = whereConditionStatement
                });

                #endregion database query code

                response.data = dataGrid;
                response.totalRecords = dataGridCount.TotalRecord;
                response.totalFilteredRecords = dataGridCount.TotalRecord;

                return StatusCode(200, response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }

        }
        #endregion

        #region GetATbNasinspectionAutoCompletion
        [HttpGet("GetATbNasinspectionAutoCompletion")]
        public async Task<ActionResult<IEnumerable<object>>> GetATbNasinspectionAutoCompleteSuggestion(string column, string value)
        {
            #region Call Repository Function
            if (!string.IsNullOrEmpty(column) && !string.IsNullOrEmpty(value))
            {
                #region where-condition gathering code
                string whereConditionStatement = default(string);
                #endregion where-condition gathering code

                #region database query code 
                var autoSuggestions = await _getAllByLike.GetAllByLike(new GetAllByLikeGLB
                {
                    ColumnName = column,
                    ColumnValue = value,
                    NumberOfReturnRow = 10,
                    TableOrViewName = "ATbNasinspectionsView"
                });

                #endregion database query code
                return Ok(autoSuggestions);
            }
            #endregion Call Repository Function
            return Ok();
        }
        #endregion

        #region GetATbNasinspections
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ATbNasinspection>>> GetATbNasinspections()
        {
            try
            {
                return await _context.ATbNasinspections.ToListAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }
        #endregion

        #region ATbNasinspectionById
        [HttpGet("{id}")]
        public async Task<ActionResult<ATbNasinspection>> GetATbNasinspection(int id)
        {
            var objATbNasinspection = new ATbNasinspection();
            try
            {
                objATbNasinspection = await _context.ATbNasinspections.Where(d => d.Id == id).FirstOrDefaultAsync();

                if (objATbNasinspection == null)
                {
                    return StatusCode(404, "Data not found.");
                }

                return objATbNasinspection;
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }
        #endregion

        #region ATbNasinspectionUpdate 
        [HttpPut("{id}")]
        public async Task<IActionResult> PutATbNasinspection(int id, ATbNasinspection objATbNasinspection)
        {

            if (id != objATbNasinspection.Id)
            {
                return StatusCode(404, "Data not found.");
            }

            _context.Entry(objATbNasinspection).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
            return StatusCode(200, objATbNasinspection);
        }

        #endregion

        #region ATbNasinspectionCreate
        [HttpPost]
        public async Task<ActionResult<ATbNasinspection>> CreateATbNasinspection(ATbNasinspection objATbNasinspection)
        {
            var getLast = await _context.ATbNasinspections.OrderByDescending(d => d.Id).AsNoTracking().FirstOrDefaultAsync();
            if (getLast == null)
                objATbNasinspection.Id = 1;
            else
                objATbNasinspection.Id = getLast.Id + 1;

            _context.ATbNasinspections.Add(objATbNasinspection);
            try
            {
                await _context.SaveChangesAsync();

                if (objATbNasinspection.Id > 0)
                    return StatusCode(200, objATbNasinspection);
                else return StatusCode(500, "Failed to create data.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }

        #endregion

        #region ATbNasinspectionDelete
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteATbNasinspection(int id)
        {
            try
            {
                var objNasInspection = await _context.ATbNasinspections.FindAsync(id);
                if (objNasInspection == null)
                {
                    return StatusCode(404, "Data not found");
                }

                _context.ATbNasinspections.Remove(objNasInspection);
                await _context.SaveChangesAsync();

                return StatusCode(200, true);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }


        }

        #endregion

        #region Export
        [HttpPost("[action]")]
        public async Task<IActionResult> ExportToExcel(DatatableGLB datatableGLB)
        {
            DatatableResponseGLB response = new DatatableResponseGLB();
            try
            {
                int rowSize = 0;
                if (datatableGLB.length == "All")
                {
                    rowSize = 0;
                }
                else
                {
                    rowSize = int.Parse(datatableGLB.length);
                }

                string searchText = default(string);
                if (datatableGLB.search != null)
                {
                    searchText = datatableGLB.search.value;
                }

                #region single sort gathering code
                string sortInformation = null;
                if (datatableGLB.orders != null && datatableGLB.orders.Count > 0)
                {
                    var getSort = datatableGLB.orders.FirstOrDefault();
                    sortInformation = getSort.column + " " + getSort.order_by;
                }
                else
                {
                    //assign default sort info base on column
                    sortInformation = "Id DESC";
                }


                #endregion single sort code

                #region where-condition gathering code
                string whereConditionStatement = null;
                if (datatableGLB != null && datatableGLB.searches.Count() > 0)
                {
                    foreach (var item in datatableGLB.searches)
                    {

                        if (item.search_by == "ActualFinishDateRange")
                        {
                            if (!string.IsNullOrEmpty(item.fromdate) && !string.IsNullOrEmpty(item.todate))
                                whereConditionStatement += "DATE_FORMAT(ActualFinish, '%Y-%m-%d') >= '" + DateTime.Parse(item.fromdate).Date.ToString("yyyy-MM-dd") + "' AND DATE_FORMAT(ActualFinish,'%Y-%m-%d') <= '" + DateTime.Parse(item.todate).Date.ToString("yyyy-MM-dd") + "' AND ";
                        }
                        else if (item.search_by == "MultipleWorkOrder")
                        {
                            if (!string.IsNullOrEmpty(item.value))
                            {
                                whereConditionStatement += $"`WorkOrder` IN ({item.value}) AND ";
                            }
                        }
                        else if (!string.IsNullOrEmpty(item.value))
                            whereConditionStatement += $"`{item.search_by}` = '{item.value}' AND ";
                    }
                    if (!string.IsNullOrEmpty(whereConditionStatement))
                    {
                        whereConditionStatement = whereConditionStatement.Substring(0, whereConditionStatement.Length - 4);
                    }
                }
                #endregion where-condition gathering code

                #region database query code 
                var dataGrid = await _getATbNasinspectionsView.ExportAllByWhere(new ExportAllByWhereGLB()
                {
                    TableOrViewName = "ATbNasinspectionsView",
                    SortColumn = sortInformation,
                    WhereConditions = whereConditionStatement,
                });

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
                List<string> columnNames = new List<string>() {
                    "Id",
                    "Work Order",
                    "WO Location",
                    "Status",
                    "Elin",
                    "Annex",
                    "SpecItem",
                    "Title",
                    "Work Type",
                    "Sub Work Type",
                    "Point Of Contact",
                    "Phone",
                    "Asset",
                    "Asset Description",
                    "Crew",
                    "Lead",
                    "Target Start",
                    "Target Finish",
                    "Actual Start",
                    "Actual Finish",
                    "Status Date",
                    "Description",
                    "LongDescription",
                    "QC Inspector",
                    "QC Status",
                    "Inspection Date",
                    "Entered Date",
                    "Cause Code",
                    "Root Cause",
                    "Deficiencies",
                    "Corrective Action",
                    "QC Comments"
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
                excelSheet.SetColumnWidth(3, 6600);
                excelSheet.SetColumnWidth(4, 6600);
                excelSheet.SetColumnWidth(5, 6600);
                excelSheet.SetColumnWidth(6, 6600);
                excelSheet.SetColumnWidth(7, 6600);
                excelSheet.SetColumnWidth(8, 6600);
                excelSheet.SetColumnWidth(9, 6600);
                excelSheet.SetColumnWidth(10, 6600);
                excelSheet.SetColumnWidth(11, 6600);
                excelSheet.SetColumnWidth(12, 6600);
                excelSheet.SetColumnWidth(13, 6600);
                excelSheet.SetColumnWidth(14, 6600);
                excelSheet.SetColumnWidth(15, 6600);
                excelSheet.SetColumnWidth(16, 6600);
                excelSheet.SetColumnWidth(17, 6600);
                excelSheet.SetColumnWidth(18, 6600);
                excelSheet.SetColumnWidth(19, 6600);
                excelSheet.SetColumnWidth(20, 6600);
                excelSheet.SetColumnWidth(21, 6600);
                excelSheet.SetColumnWidth(22, 6600);
                excelSheet.SetColumnWidth(23, 6600);
                excelSheet.SetColumnWidth(24, 6600);
                excelSheet.SetColumnWidth(25, 6600);
                excelSheet.SetColumnWidth(26, 6600);
                excelSheet.SetColumnWidth(27, 6600);
                excelSheet.SetColumnWidth(28, 6600);
                excelSheet.SetColumnWidth(29, 6600);
                excelSheet.SetColumnWidth(30, 6600);
                excelSheet.SetColumnWidth(31, 6600);

                //drawing cell data into excel
                foreach (var item in dataGrid)
                {
                    row = excelSheet.CreateRow(dataGrid.IndexOf(item) + 1);

                    //normal cell defining...
                    row.CreateCell(0).SetCellValue(item.Id);
                    row.CreateCell(1).SetCellValue(item.WorkOrder);
                    row.CreateCell(2).SetCellValue(item.Location);
                    row.CreateCell(3).SetCellValue(item.Status);
                    row.CreateCell(4).SetCellValue(item.Elin);
                    row.CreateCell(5).SetCellValue(item.Annex);
                    row.CreateCell(6).SetCellValue(item.SpecItem);
                    row.CreateCell(7).SetCellValue(item.Title);
                    row.CreateCell(8).SetCellValue(item.WorkType);
                    row.CreateCell(9).SetCellValue(item.SubWorkType);
                    row.CreateCell(10).SetCellValue(item.OnBehalfOf);
                    row.CreateCell(11).SetCellValue(item.Phone);
                    row.CreateCell(12).SetCellValue(item.Asset);
                    row.CreateCell(13).SetCellValue(item.AssetDescription);
                    row.CreateCell(14).SetCellValue(item.Crew);
                    row.CreateCell(15).SetCellValue(item.Lead);
                    row.CreateCell(16).SetCellValue(item.TargetStart.HasValue ? item.TargetStart.Value.ToString("MM/dd/yyyy") : "No data");
                    row.CreateCell(17).SetCellValue(item.TargetFinish.HasValue ? item.TargetFinish.Value.ToString("MM/dd/yyyy") : "No data");
                    row.CreateCell(18).SetCellValue(item.ActualStart.HasValue ? item.ActualStart.Value.ToString("MM/dd/yyyy") : "No data");
                    row.CreateCell(19).SetCellValue(item.ActualStart.HasValue ? item.ActualStart.Value.ToString("MM/dd/yyyy") : "No data");
                    row.CreateCell(20).SetCellValue(item.StatusDate.HasValue ? item.StatusDate.Value.ToString("MM/dd/yyyy") : "No data");
                    row.CreateCell(21).SetCellValue(item.Description);
                    row.CreateCell(22).SetCellValue(item.LongDescription);
                    row.CreateCell(23).SetCellValue(item.QcInspector);
                    row.CreateCell(24).SetCellValue(item.InspectionResults);
                    row.CreateCell(25).SetCellValue(item.InspectionDate.HasValue ? item.InspectionDate.Value.ToString("MM/dd/yyyy") : "No data");
                    row.CreateCell(26).SetCellValue(item.EnteredDate.HasValue ? item.EnteredDate.Value.ToString("MM/dd/yyyy") : "No data");
                    row.CreateCell(27).SetCellValue(item.CauseCode);
                    row.CreateCell(28).SetCellValue(item.RootCause);
                    row.CreateCell(29).SetCellValue(item.UnsatFindings);
                    row.CreateCell(30).SetCellValue(item.CorrectiveActions);
                    row.CreateCell(31).SetCellValue(item.QcComments);
                }
                #endregion

                var prepareExcelData = CommonFunctions.ExportToExcelFile(_heSrv, Request, workbook);

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

        #region Inspection Daily Report
        [HttpGet("GetDailyInspectionReport")]
        public async Task<ActionResult<object>> DailyInspectionReport(DateTime date, string reportType = "BUMED")
        {
            try
            {
                var getInspectionReport = await _getDailyInspectionReport.ExecuteStoreProcedure($"GetDailyInspectionReport('{date.ToString("yyyy-MM-dd")}', '{reportType}')");

                if (getInspectionReport.Count <= 0)
                {
                    return StatusCode(404, "Data not found.");
                }

                int totalRecords = getInspectionReport.Count();
                int totalSatisfactory = getInspectionReport.Where(w => w.InspectionResults == "SAT").Count();
                int totalUnsatisfactory = totalRecords - totalSatisfactory;
                decimal satisfactoryPercent = Math.Round(((decimal)totalSatisfactory/ (decimal)totalRecords) * 100,
                                                        MidpointRounding.AwayFromZero);

                var returnObj = new { 
                    data = getInspectionReport,
                    total = totalRecords,
                    totalSatisfactory = totalSatisfactory,
                    totalUnsatisfactory = totalUnsatisfactory,
                    satisfactoryPercent = satisfactoryPercent,
                };

                return StatusCode(200, returnObj);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }
        #endregion
    }
}
