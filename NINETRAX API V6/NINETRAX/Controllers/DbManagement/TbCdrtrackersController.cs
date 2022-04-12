using DataLayer.Models.EntityModels;
using DataLayer.Models.GlobalModels;
using DataLayer.Models.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RepositoryLayer;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;
using NINETRAX.Globals;

namespace NINETRAX.Controllers.DbManagement
{
    [Route("api/d/[controller]")]
    [ApiController]
    public class TbCdrtrackersController : Controller
    {

        #region Variables
        private readonly IWebHostEnvironment _heSrv;
        private readonly EntityContext _context;
        private readonly IRawQueryRepo<TbCdrtracker> _TbCdrtrackerContext;
        private readonly IRawQueryRepo<CDRTrackersView> _getTbCdrtrackersView;
        private readonly IRawQueryRepo<TotalRecordCountGLB> _getTotalRecordCountGLB;
        private readonly IRawQueryRepo<Object> _getAllByLike;
        #endregion

        #region Constructor
        public TbCdrtrackersController(
            IWebHostEnvironment heSrv,
            EntityContext context,
            IRawQueryRepo<TbCdrtracker> TbCdrtrackerContext,
            IRawQueryRepo<CDRTrackersView> getTbCdrtrackersView,
            IRawQueryRepo<TotalRecordCountGLB> getTotalRecordCountGLB,
            IRawQueryRepo<Object> getAllByLike
        )
        {
            _TbCdrtrackerContext = TbCdrtrackerContext;
            _heSrv = heSrv;
            _context = context;
            _getTbCdrtrackersView = getTbCdrtrackersView;
            _getTotalRecordCountGLB = getTotalRecordCountGLB;
            _getAllByLike = getAllByLike;
        }
        #endregion

        #region GetTbCdrtrackerView
        [HttpPost("GetCDRTrackersView")]
        public async Task<ActionResult<DatatableResponseGLB>> GetTbCdrtrackersView(DatatableGLB datatableGLB)
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
                var dataGrid = await _getTbCdrtrackersView.GetAllByWhere(new GetAllByWhereGLB()
                {
                    TableOrViewName = "CDRTrackersView",
                    SortColumn = sortInformation,
                    WhereConditions = whereConditionStatement,
                    LimitStart = datatableGLB.start,
                    LimitEnd = rowSize
                });

                var dataGridCount = await _getTotalRecordCountGLB.CountAllByWhere(new CountAllByWhereGLB()
                {
                    TableOrViewName = "CDRTrackersView",
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

        #region GetTbCdrtrackerAutoCompletion
        [HttpGet("GetCDRTrackersViewAutoCompletion")]
        public async Task<ActionResult<IEnumerable<object>>> GetTbCdrtrackerAutoCompleteSuggestion(string column, string value)
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
                    TableOrViewName = "CDRTrackersView"
                });

                #endregion database query code
                return Ok(autoSuggestions);
            }
            #endregion Call Repository Function
            return Ok();
        }
        #endregion

        #region GetTbCdrtrackers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TbCdrtracker>>> GetTbCdrtrackers()
        {
            try
            {
                return await _context.TbCdrtrackers.ToListAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }
        #endregion

        #region TbCdrtrackerById
        [HttpGet("{id}")]
        public async Task<ActionResult<TbCdrtracker>> GetTbCdrtracker(int id)
        {
            var objTbCdrtracker = new TbCdrtracker();
            try
            {
                objTbCdrtracker = await _context.TbCdrtrackers.Where(d => d.Id == id).FirstOrDefaultAsync();

                if (objTbCdrtracker == null)
                {
                    return StatusCode(404, "Data not found.");
                }

                return objTbCdrtracker;
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }
        #endregion

        #region TbCdrtrackerUpdate 
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTbCdrtracker(int id, TbCdrtracker objTbCdrtracker)
        {

            if (id != objTbCdrtracker.Id)
            {
                return StatusCode(404, "Data not found.");
            }

            _context.Entry(objTbCdrtracker).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
            return StatusCode(200, objTbCdrtracker);
        }

        #endregion

        #region TbCdrtrackerCreate
        [HttpPost]
        public async Task<ActionResult<TbCdrtracker>> CreateTbCdrtracker(TbCdrtracker objTbCdrtracker)
        {
            var getLast = await _context.TbCdrtrackers.OrderByDescending(d => d.Id).AsNoTracking().FirstOrDefaultAsync();
            if (getLast == null)
                objTbCdrtracker.Id = 1;
            else
                objTbCdrtracker.Id = getLast.Id + 1;

            _context.TbCdrtrackers.Add(objTbCdrtracker);
            try
            {
                await _context.SaveChangesAsync();

                if (objTbCdrtracker.Id > 0)
                    return StatusCode(200, objTbCdrtracker);
                else return StatusCode(500, "Failed to create data.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }

        #endregion

        #region TbCdrtrackerDelete
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTbCdrtracker(int id)
        {
            var objTbCdrtracker = await _context.TbCdrtrackers.FindAsync(id);
            if (objTbCdrtracker == null)
            {
                return StatusCode(404, "Data not found");
            }

            _context.TbCdrtrackers.Remove(objTbCdrtracker);
            await _context.SaveChangesAsync();

            return StatusCode(200, true);
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
                var dataGrid = await _getTbCdrtrackersView.ExportAllByWhere(new ExportAllByWhereGLB()
                {
                    TableOrViewName = "CDRTrackersView",
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
                    "CDR No",
                    "Date Received",
                    "Discrepancy",
                    "functional Manager",
                    "Response Due",
                    "Memo No",
                    "FM Response",
                    "Response Date",
                    "Date Closed",
                    "Status",
                    "Notes",
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
                excelSheet.SetColumnWidth(2, 12600);
                excelSheet.SetColumnWidth(3, 6600);
                excelSheet.SetColumnWidth(4, 6600);
                excelSheet.SetColumnWidth(5, 6600);
                excelSheet.SetColumnWidth(6, 6600);
                excelSheet.SetColumnWidth(7, 6600);
                excelSheet.SetColumnWidth(8, 6600);
                excelSheet.SetColumnWidth(9, 6600);
                excelSheet.SetColumnWidth(10, 6600);

                //drawing cell data into excel
                foreach (var item in dataGrid)
                {
                    row = excelSheet.CreateRow(dataGrid.IndexOf(item) + 1);

                    //normal cell defining...
                    row.CreateCell(0).SetCellValue(item.CDRNumber);
                    row.CreateCell(1).SetCellValue(item.DateReceived.HasValue ? item.DateReceived.Value.ToString("MM/dd/yyyy") : "No data");
                    row.CreateCell(2).SetCellValue(item.Discrepancy);
                    row.CreateCell(3).SetCellValue(item.FunctionalManager);
                    row.CreateCell(4).SetCellValue(item.ResponseDueDate.HasValue ? item.ResponseDueDate.Value.ToString("MM/dd/yyyy") : "No data");
                    row.CreateCell(5).SetCellValue(item.MemoNumber);
                    row.CreateCell(6).SetCellValue(item.FMResponse);
                    row.CreateCell(7).SetCellValue(item.ResponseDate.HasValue ? item.ResponseDate.Value.ToString("MM/dd/yyyy") : "No data");
                    row.CreateCell(8).SetCellValue(item.DateClosed.HasValue ? item.DateClosed.Value.ToString("MM/dd/yyyy") : "No data");
                    row.CreateCell(9).SetCellValue(item.Status);
                    row.CreateCell(10).SetCellValue(item.Notes);
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
