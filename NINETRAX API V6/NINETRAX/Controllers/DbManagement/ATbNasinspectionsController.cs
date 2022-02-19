using DataLayer.Models.EntityModels;
using DataLayer.Models.GlobalModels;
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

        #endregion

        #region Constructor
        public ATbNasinspectionsController(
            IWebHostEnvironment heSrv,
            EntityContext context,
            IRawQueryRepo<ATbNasinspection> ATbNasinspectionContext,
            IRawQueryRepo<ATbNasinspectionsView> getATbNasinspectionsView,
            IRawQueryRepo<TotalRecordCountGLB> getTotalRecordCountGLB,
            IRawQueryRepo<Object> getAllByLike
        )
        {
            _ATbNasinspectionContext = ATbNasinspectionContext;
            _heSrv = heSrv;
            _context = context;
            _getATbNasinspectionsView = getATbNasinspectionsView;
            _getTotalRecordCountGLB = getTotalRecordCountGLB;
            _getAllByLike = getAllByLike;
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
            _context.ATbNasinspections.Add(objATbNasinspection);
            try
            {
                await _context.SaveChangesAsync();
                return StatusCode(200, objATbNasinspection);
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
            var objATbNasinspection = await _context.ATbNasinspections.FindAsync(id);
            if (objATbNasinspection == null)
            {
                return StatusCode(404, "Data not found");
            }

            _context.ATbNasinspections.Remove(objATbNasinspection);
            await _context.SaveChangesAsync();

            return StatusCode(200, true);
        }

        #endregion

        #region Export
        [HttpPost("[action]")]
        // public async Task<FileStreamResult> ExportToExcel(DatatableGLB datatableGLB)
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
                List<string> columnNames = new List<string>() { "Annex", "Spect Item", "Title" };

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

                //drawing cell data into excel
                foreach (var item in dataGrid)
                {
                    row = excelSheet.CreateRow(dataGrid.IndexOf(item) + 1);

                    //normal cell defining...
                    row.CreateCell(0).SetCellValue(item.Annex);
                    row.CreateCell(1).SetCellValue(item.SpecItem);
                    row.CreateCell(2).SetCellValue(item.Title);

                    ////define cell with special criteria
                    //var cell3 = row.CreateCell(3, CellType.String);
                    //cell3.SetCellValue(item.VehicleName);
                    ////cell3.CellStyle= style;

                    //row.CreateCell(4).SetCellValue(item.NumberOfRide);
                    //row.CreateCell(5).SetCellValue(Convert.ToDouble(item.RideAmount));
                    //row.CreateCell(6).SetCellValue(item.MaximumNumberOfReferral);
                    //row.CreateCell(7).SetCellValue(Convert.ToDouble(item.Amount));
                    //row.CreateCell(8).SetCellValue(item.Status);
                    //row.CreateCell(9).SetCellValue(item.InsertDate.ToString());

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
