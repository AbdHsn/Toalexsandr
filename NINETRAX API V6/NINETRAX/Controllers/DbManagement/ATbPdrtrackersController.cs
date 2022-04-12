using DataLayer.Models.EntityModels;
using DataLayer.Models.GlobalModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NINETRAX.Globals;
using RepositoryLayer;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;
using DataLayer.Models.ViewModels;

namespace NINETRAX.Controllers.DbManagement
{
    [Route("api/d/[controller]")]
    [ApiController]
    public class ATbPdrtrackersController : Controller
    {

        #region Variables
        private readonly IWebHostEnvironment _heSrv;
        private readonly EntityContext _context;
        private readonly IRawQueryRepo<ATbPdrtracker> _ATbPdrtrackerContext;
        private readonly IRawQueryRepo<PDRTrackersView> _getPDRTrackersView;
        private readonly IRawQueryRepo<TotalRecordCountGLB> _getTotalRecordCountGLB;
        private readonly IRawQueryRepo<Object> _getAllByLike;
        #endregion

        #region Constructor
        public ATbPdrtrackersController(
            IWebHostEnvironment heSrv,
            EntityContext context,
            IRawQueryRepo<ATbPdrtracker> ATbPdrtrackerContext,
            IRawQueryRepo<PDRTrackersView> getPDRTrackersView,
            IRawQueryRepo<TotalRecordCountGLB> getTotalRecordCountGLB,
            IRawQueryRepo<Object> getAllByLike
        )
        {
            _ATbPdrtrackerContext = ATbPdrtrackerContext;
            _heSrv = heSrv;
            _context = context;
            _getPDRTrackersView = getPDRTrackersView;
            _getTotalRecordCountGLB = getTotalRecordCountGLB;
            _getAllByLike = getAllByLike;
        }
        #endregion

        #region GetATbPdrtrackerView
        [HttpPost("GetPDRTrackersView")]
        public async Task<ActionResult<DatatableResponseGLB>> GetPDRTrackersView(DatatableGLB datatableGLB)
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
                        //if (a.search_by == "CreatedDate")
                        //{
                        //    if (!string.IsNullOrEmpty(a.fromdate) && !string.IsNullOrEmpty(a.todate))
                        //        whereConditionStatement += "DATE_FORMAT(CreatedDate, '%Y-%m-%d') >= '" + DateTime.Parse(a.fromdate).Date.ToString("yyyy-MM-dd") + "' AND DATE_FORMAT(CreatedDate,'%Y-%m-%d') <= '" + DateTime.Parse(a.todate).Date.ToString("yyyy-MM-dd") + "' and ";
                        //}
                        //else 
                        if (!string.IsNullOrEmpty(item.value))
                            whereConditionStatement += item.search_by + " = '" + item.value + "' AND ";
                    }
                    if (!string.IsNullOrEmpty(whereConditionStatement))
                    {
                        whereConditionStatement = whereConditionStatement.Substring(0, whereConditionStatement.Length - 4);
                    }
                }
                #endregion where-condition gathering code

                #region database query code 
                var dataGrid = await _getPDRTrackersView.GetAllByWhere(new GetAllByWhereGLB()
                {
                    TableOrViewName = "PDRTrackersView",
                    SortColumn = sortInformation,
                    WhereConditions = whereConditionStatement,
                    LimitStart = datatableGLB.start,
                    LimitEnd = rowSize
                });

                var dataGridCount = await _getTotalRecordCountGLB.CountAllByWhere(new CountAllByWhereGLB()
                {
                    TableOrViewName = "PDRTrackersView",
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

        #region GetATbPdrtrackerAutoCompletion
        [HttpGet("GetPDRTrackersViewAutoCompletion")]
        public async Task<ActionResult<IEnumerable<object>>> GetATbPdrtrackerAutoCompleteSuggestion(string column, string value)
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
                    TableOrViewName = "PDRTrackersView"
                });

                #endregion database query code
                return Ok(autoSuggestions);
            }
            #endregion Call Repository Function
            return Ok();
        }
        #endregion

        #region GetATbPdrtrackers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ATbPdrtracker>>> GetATbPdrtrackers()
        {
            try
            {
                return await _context.ATbPdrtrackers.ToListAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }
        #endregion

        #region ATbPdrtrackerById
        [HttpGet("{id}")]
        public async Task<ActionResult<ATbPdrtracker>> GetATbPdrtracker(int id)
        {
            var objATbPdrtracker = new ATbPdrtracker();
            try
            {
                objATbPdrtracker = await _context.ATbPdrtrackers.Where(d => d.Id == id).FirstOrDefaultAsync();

                if (objATbPdrtracker == null)
                {
                    return StatusCode(404, "Data not found.");
                }

                return objATbPdrtracker;
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }
        #endregion

        #region ATbPdrtrackerUpdate 
        [HttpPut("{id}")]
        public async Task<IActionResult> PutATbPdrtracker(int id, ATbPdrtracker objATbPdrtracker)
        {

            if (id != objATbPdrtracker.Id)
            {
                return StatusCode(404, "Data not found.");
            }

            _context.Entry(objATbPdrtracker).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
            return StatusCode(200, objATbPdrtracker);
        }

        #endregion

        #region ATbPdrtrackerCreate
        [HttpPost]
        public async Task<ActionResult<ATbPdrtracker>> CreateATbPdrtracker(ATbPdrtracker objATbPdrtracker)
        {
            var getLast = await _context.ATbPdrtrackers.OrderByDescending(d => d.Id).AsNoTracking().FirstOrDefaultAsync();
            if (getLast == null)
                objATbPdrtracker.Id = 1;
            else
                objATbPdrtracker.Id = getLast.Id + 1;

            _context.ATbPdrtrackers.Add(objATbPdrtracker);
            try
            {
                await _context.SaveChangesAsync();

                if (objATbPdrtracker.Id > 0)
                    return StatusCode(200, objATbPdrtracker);
                else return StatusCode(500, "Failed to create data.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }

        #endregion

        #region ATbPdrtrackerDelete
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteATbPdrtracker(int id)
        {
            try
            {
                var objATbPdrtracker = await _context.ATbPdrtrackers.FindAsync(id);
                if (objATbPdrtracker == null)
                {
                    return StatusCode(404, "Data not found");
                }

                _context.ATbPdrtrackers.Remove(objATbPdrtracker);
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

                        if (!string.IsNullOrEmpty(item.value))
                            whereConditionStatement += $"`{item.search_by}` = '{item.value}' AND ";
                    }
                    if (!string.IsNullOrEmpty(whereConditionStatement))
                    {
                        whereConditionStatement = whereConditionStatement.Substring(0, whereConditionStatement.Length - 4);
                    }
                }
                #endregion where-condition gathering code

                #region database query code 
                var dataGrid = await _getPDRTrackersView.ExportAllByWhere(new ExportAllByWhereGLB()
                {
                    TableOrViewName = "PDRTrackersView",
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
                List<string> columnNames = new List<string>()
                {
                    "PDR Number",
                    "Work Order",
                    "Location",
                    "QC Inspector",
                    "Annex",
                    "Spec Item",
                    "Title",
                    "Date Completed",
                    "Unsat Findings",
                    "FM Name",
                    "FM Title",
                    "Date Issued",
                    "Date Due",
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
                excelSheet.SetColumnWidth(1, 7600);
                excelSheet.SetColumnWidth(2, 6600);
                excelSheet.SetColumnWidth(3, 6600);
                excelSheet.SetColumnWidth(4, 6600);
                excelSheet.SetColumnWidth(5, 6600);
                excelSheet.SetColumnWidth(6, 6600);
                excelSheet.SetColumnWidth(7, 6600);
                excelSheet.SetColumnWidth(8, 13000);
                excelSheet.SetColumnWidth(9, 6600);
                excelSheet.SetColumnWidth(10, 6600);
                excelSheet.SetColumnWidth(11, 6600);
                excelSheet.SetColumnWidth(12, 6600);
                excelSheet.SetColumnWidth(13, 6600);

                //drawing cell data into excel
                foreach (var item in dataGrid)
                {
                    row = excelSheet.CreateRow(dataGrid.IndexOf(item) + 1);

                    //normal cell defining...
                    row.CreateCell(0).SetCellValue(item.PDRNumber);
                    row.CreateCell(1).SetCellValue(item.WorkOrder);
                    row.CreateCell(2).SetCellValue(item.Location);
                    row.CreateCell(3).SetCellValue(item.QCInspector);
                    row.CreateCell(4).SetCellValue(item.Annex);
                    row.CreateCell(5).SetCellValue(item.SpecItem);
                    row.CreateCell(6).SetCellValue(item.Title);
                    row.CreateCell(7).SetCellValue(item.DateCompleted.HasValue ? item.DateCompleted.Value.ToString("MM/dd/yyyy"): "No data");
                    row.CreateCell(8).SetCellValue(item.UnsatFindings);
                    row.CreateCell(9).SetCellValue(item.FMName);
                    row.CreateCell(10).SetCellValue(item.FMTitle);
                    row.CreateCell(11).SetCellValue(item.DateIssued.HasValue ? item.DateIssued.Value.ToString("MM/dd/yyyy") : "No data");
                    row.CreateCell(12).SetCellValue(item.DateDue.HasValue ? item.DateDue.Value.ToString("MM/dd/yyyy"): "No data");
                    row.CreateCell(13).SetCellValue(item.Status);
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


    }
}
