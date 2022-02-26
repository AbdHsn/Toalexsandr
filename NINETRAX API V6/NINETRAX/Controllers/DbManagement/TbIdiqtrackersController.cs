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
    public class TbIdiqtrackersController : Controller
    {

        #region Variables
        private readonly IWebHostEnvironment _heSrv;
        private readonly EntityContext _context;
        private readonly IRawQueryRepo<TbIdiqtracker> _TbIdiqtrackerContext;
        private readonly IRawQueryRepo<IDIQTrackersView> _getIDIQTrackersView;
        private readonly IRawQueryRepo<TotalRecordCountGLB> _getTotalRecordCountGLB;
        private readonly IRawQueryRepo<Object> _getAllByLike;
        #endregion

        #region Constructor
        public TbIdiqtrackersController(
            IWebHostEnvironment heSrv,
            EntityContext context,
            IRawQueryRepo<TbIdiqtracker> TbIdiqtrackerContext,
            IRawQueryRepo<IDIQTrackersView> getIDIQTrackersView,
            IRawQueryRepo<TotalRecordCountGLB> getTotalRecordCountGLB,
            IRawQueryRepo<Object> getAllByLike
        )
        {
            _TbIdiqtrackerContext = TbIdiqtrackerContext;
            _heSrv = heSrv;
            _context = context;
            _getIDIQTrackersView = getIDIQTrackersView;
            _getTotalRecordCountGLB = getTotalRecordCountGLB;
            _getAllByLike = getAllByLike;
        }
        #endregion

        #region GetTbIdiqtrackerView
        [HttpPost("GetIDIQTrackersView")]
        public async Task<ActionResult<DatatableResponseGLB>> GetIDIQTrackersView(DatatableGLB datatableGLB)
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
                var dataGrid = await _getIDIQTrackersView.GetAllByWhere(new GetAllByWhereGLB()
                {
                    TableOrViewName = "IDIQTrackersView",
                    SortColumn = sortInformation,
                    WhereConditions = whereConditionStatement,
                    LimitStart = datatableGLB.start,
                    LimitEnd = rowSize
                });

                var dataGridCount = await _getTotalRecordCountGLB.CountAllByWhere(new CountAllByWhereGLB()
                {
                    TableOrViewName = "IDIQTrackersView",
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

        #region GetTbIdiqtrackerAutoCompletion
        [HttpGet("GetIDIQTrackersViewAutoCompletion")]
        public async Task<ActionResult<IEnumerable<object>>> GetTbIdiqtrackerAutoCompleteSuggestion(string column, string value)
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
                    TableOrViewName = "IDIQTrackersView"
                });

                #endregion database query code
                return Ok(autoSuggestions);
            }
            #endregion Call Repository Function
            return Ok();
        }
        #endregion

        #region GetTbIdiqtrackers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TbIdiqtracker>>> GetTbIdiqtrackers()
        {
            try
            {
                return await _context.TbIdiqtrackers.ToListAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }
        #endregion

        #region TbIdiqtrackerById
        [HttpGet("{id}")]
        public async Task<ActionResult<TbIdiqtracker>> GetTbIdiqtracker(int id)
        {
            var objTbIdiqtracker = new TbIdiqtracker();
            try
            {
                objTbIdiqtracker = await _context.TbIdiqtrackers.Where(d => d.Id == id).FirstOrDefaultAsync();

                if (objTbIdiqtracker == null)
                {
                    return StatusCode(404, "Data not found.");
                }

                return objTbIdiqtracker;
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }
        #endregion

        #region TbIdiqtrackerUpdate 
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTbIdiqtracker(int id, TbIdiqtracker objTbIdiqtracker)
        {

            if (id != objTbIdiqtracker.Id)
            {
                return StatusCode(404, "Data not found.");
            }

            _context.Entry(objTbIdiqtracker).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
            return StatusCode(200, objTbIdiqtracker);
        }

        #endregion

        #region TbIdiqtrackerCreate
        [HttpPost]
        public async Task<ActionResult<TbIdiqtracker>> CreateTbIdiqtracker(TbIdiqtracker objTbIdiqtracker)
        {
            _context.TbIdiqtrackers.Add(objTbIdiqtracker);
            try
            {
                await _context.SaveChangesAsync();
                return StatusCode(200, objTbIdiqtracker);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }

        #endregion

        #region TbIdiqtrackerDelete
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTbIdiqtracker(int id)
        {
            try
            {
                var objTbIdiqtracker = await _context.TbIdiqtrackers.FindAsync(id);
                if (objTbIdiqtracker == null)
                {
                    return StatusCode(404, "Data not found");
                }

                _context.TbIdiqtrackers.Remove(objTbIdiqtracker);
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
                var dataGrid = await _getIDIQTrackersView.ExportAllByWhere(new ExportAllByWhereGLB()
                {
                    TableOrViewName = "IDIQTrackersView",
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
                    "WO Number",
                    "IDIQ SOW Description",
                    "Location",
                    "WO Type",
                    "Estimator",
                    "Assigned PAR",
                    "Verified By",
                    "Inspection Date",
                    "Date To PAR",
                    "Date From PAR",
                    "WO Status",
                    "Inspection Notes",
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
                excelSheet.SetColumnWidth(1, 12600);
                excelSheet.SetColumnWidth(2, 6600);
                excelSheet.SetColumnWidth(3, 6600);
                excelSheet.SetColumnWidth(4, 6600);
                excelSheet.SetColumnWidth(5, 6600);
                excelSheet.SetColumnWidth(6, 6600);
                excelSheet.SetColumnWidth(7, 6600);
                excelSheet.SetColumnWidth(8, 6600);
                excelSheet.SetColumnWidth(9, 6600);
                excelSheet.SetColumnWidth(10, 6600);
                excelSheet.SetColumnWidth(11, 12600);

                //drawing cell data into excel
                foreach (var item in dataGrid)
                {
                    row = excelSheet.CreateRow(dataGrid.IndexOf(item) + 1);

                    //normal cell defining...
                    row.CreateCell(0).SetCellValue(item.WONumber);
                    row.CreateCell(1).SetCellValue(item.IDIQSOWDescription);
                    row.CreateCell(2).SetCellValue(item.Location);
                    row.CreateCell(3).SetCellValue(item.WOType);
                    row.CreateCell(4).SetCellValue(item.Estimator);
                    row.CreateCell(5).SetCellValue(item.ParAssigned);
                    row.CreateCell(6).SetCellValue(item.VerifiedBy);
                    row.CreateCell(7).SetCellValue(item.InspectionDate.HasValue ? item.InspectionDate.Value.ToString("MM/dd/yyyy") : "No data");
                    row.CreateCell(8).SetCellValue(item.DateToPar.HasValue ? item.DateToPar.Value.ToString("MM/dd/yyyy") : "No data");
                    row.CreateCell(9).SetCellValue(item.DateFromPar.HasValue ? item.DateFromPar.Value.ToString("MM/dd/yyyy") : "No data");
                    row.CreateCell(10).SetCellValue(item.WOStatus);
                    row.CreateCell(11).SetCellValue(item.Comments);
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
