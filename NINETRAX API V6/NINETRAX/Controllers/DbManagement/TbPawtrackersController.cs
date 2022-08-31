using DataLayer.Models.EntityModels;
using DataLayer.Models.GlobalModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RepositoryLayer;
using NINETRAX.Globals;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;
using DataLayer.Models.ViewModels;

namespace NINETRAX.Controllers.DbManagement
{
    [Route("api/d/[controller]")]
    [ApiController]
    public class TbPawtrackersController : Controller
    {

        #region Variables
        private readonly IWebHostEnvironment _heSrv;
        private readonly EntityContext _context;
        private readonly IRawQueryRepo<TbPawtracker> _TbPawtrackerContext;
        private readonly IRawQueryRepo<PAWTrackersView> _getTbPawtrackersView;
        private readonly IRawQueryRepo<TotalRecordCountGLB> _getTotalRecordCountGLB;
        private readonly IRawQueryRepo<Object> _getAllByLike;
        #endregion

        #region Constructor
        public TbPawtrackersController(
            IWebHostEnvironment heSrv,
            EntityContext context,
            IRawQueryRepo<TbPawtracker> TbPawtrackerContext,
            IRawQueryRepo<PAWTrackersView> getTbPawtrackersView,
            IRawQueryRepo<TotalRecordCountGLB> getTotalRecordCountGLB,
            IRawQueryRepo<Object> getAllByLike
        )
        {
            _TbPawtrackerContext = TbPawtrackerContext;
            _heSrv = heSrv;
            _context = context;
            _getTbPawtrackersView = getTbPawtrackersView;
            _getTotalRecordCountGLB = getTotalRecordCountGLB;
            _getAllByLike = getAllByLike;
        }
        #endregion

        #region GetPAWTrackerView
        [HttpPost("GetPAWTrackersView")]
        public async Task<ActionResult<DatatableResponseGLB>> GetTbPawtrackersView(DatatableGLB datatableGLB)
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
                            whereConditionStatement += $"`{item.search_by}` LIKE '%{item.value}%' AND ";
                    }
                    if (!string.IsNullOrEmpty(whereConditionStatement))
                    {
                        whereConditionStatement = whereConditionStatement.Substring(0, whereConditionStatement.Length - 4);
                    }
                }
                #endregion where-condition gathering code

                #region database query code 
                var dataGrid = await _getTbPawtrackersView.GetAllByWhere(new GetAllByWhereGLB()
                {
                    TableOrViewName = "PAWTrackersView",
                    SortColumn = sortInformation,
                    WhereConditions = whereConditionStatement,
                    LimitStart = datatableGLB.start,
                    LimitEnd = rowSize
                });

                var dataGridCount = await _getTotalRecordCountGLB.CountAllByWhere(new CountAllByWhereGLB()
                {
                    TableOrViewName = "PAWTrackersView",
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

        #region GetTbPawtrackerAutoCompletion
        [HttpGet("GetPAWTrackersViewAutoCompletion")]
        public async Task<ActionResult<IEnumerable<object>>> GetTbPawtrackerAutoCompleteSuggestion(string column, string value)
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
                    TableOrViewName = "PAWTrackersView"
                });

                #endregion database query code
                return Ok(autoSuggestions);
            }
            #endregion Call Repository Function
            return Ok();
        }
        #endregion

        #region GetTbPawtrackers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TbPawtracker>>> GetTbPawtrackers()
        {
            try
            {
                return await _context.TbPawtrackers.ToListAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }
        #endregion

        #region TbPawtrackerById
        [HttpGet("{id}")]
        public async Task<ActionResult<TbPawtracker>> GetTbPawtracker(int id)
        {
            var objTbPawtracker = new TbPawtracker();
            try
            {
                objTbPawtracker = await _context.TbPawtrackers.Where(d => d.Id == id).FirstOrDefaultAsync();

                if (objTbPawtracker == null)
                {
                    return StatusCode(404, "Data not found.");
                }

                return objTbPawtracker;
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }
        #endregion

        #region TbPawtrackerUpdate 
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTbPawtracker(int id, TbPawtracker objTbPawtracker)
        {

            if (id != objTbPawtracker.Id)
            {
                return StatusCode(404, "Data not found.");
            }

            _context.Entry(objTbPawtracker).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
            return StatusCode(200, objTbPawtracker);
        }

        #endregion

        #region TbPawtrackerCreate
        [HttpPost]
        public async Task<ActionResult<TbPawtracker>> CreateTbPawtracker(TbPawtracker objTbPawtracker)
        {
            var getLast = await _context.TbPawtrackers.OrderByDescending(d => d.Id).AsNoTracking().FirstOrDefaultAsync();
            if (getLast == null)
                objTbPawtracker.Id = 1;
            else
                objTbPawtracker.Id = getLast.Id + 1;

            _context.TbPawtrackers.Add(objTbPawtracker);
            try
            {
                await _context.SaveChangesAsync();

                if (objTbPawtracker.Id > 0)
                    return StatusCode(200, objTbPawtracker);
                else return StatusCode(500, "Failed to create data.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }

        #endregion

        #region TbPawtrackerDelete
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTbPawtracker(int id)
        {
            var objTbPawtracker = await _context.TbPawtrackers.FindAsync(id);
            if (objTbPawtracker == null)
            {
                return StatusCode(404, "Data not found");
            }

            _context.TbPawtrackers.Remove(objTbPawtracker);
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
                var dataGrid = await _getTbPawtrackersView.ExportAllByWhere(new ExportAllByWhereGLB()
                {
                    TableOrViewName = "PAWTrackersView",
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
                    "PAW Number",
                    "Location",
                    "Description",
                    "PAR",
                    "Date Received",
                    "Date Acknowledged",
                    "WO Number",
                    "Date To PAR",
                    "Status",
                    "Annex",
                    "Spec Item",
                    "Title",
                    "Validity",
                    "PAW Response",
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
                excelSheet.SetColumnWidth(11, 6600);
                excelSheet.SetColumnWidth(12, 6600);
                excelSheet.SetColumnWidth(13, 14600);

                //drawing cell data into excel
                foreach (var item in dataGrid)
                {
                    row = excelSheet.CreateRow(dataGrid.IndexOf(item) + 1);

                    //normal cell defining...
                    row.CreateCell(0).SetCellValue(item.PAWNumber);
                    row.CreateCell(1).SetCellValue(item.Location);
                    row.CreateCell(2).SetCellValue(item.Description);
                    row.CreateCell(3).SetCellValue(item.Par);
                    row.CreateCell(4).SetCellValue(item.DateReceived.HasValue ? item.DateReceived.Value.ToString("MM/dd/yyyy") : "No data");
                    row.CreateCell(5).SetCellValue(item.DateAcknowledged.HasValue ? item.DateAcknowledged.Value.ToString("MM/dd/yyyy") : "No data");
                    row.CreateCell(6).SetCellValue(item.WONumber);
                    row.CreateCell(7).SetCellValue(item.DateToPar.HasValue ? item.DateToPar.Value.ToString("MM/dd/yyyy") : "No data");
                    row.CreateCell(8).SetCellValue(item.Status);
                    row.CreateCell(9).SetCellValue(item.Annex);
                    row.CreateCell(10).SetCellValue(item.SpecItem);
                    row.CreateCell(11).SetCellValue(item.Title);
                    row.CreateCell(12).SetCellValue(item.Validity);
                    row.CreateCell(13).SetCellValue(item.PawResponse);
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
