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
    public class TbNcrtrackersController : Controller
    {

        #region Variables
        private readonly IWebHostEnvironment _heSrv;
        private readonly EntityContext _context;
        private readonly IRawQueryRepo<TbNcrtracker> _TbNcrtrackerContext;
        private readonly IRawQueryRepo<NCRTrackersView> _getNCRTrackersView;
        private readonly IRawQueryRepo<TotalRecordCountGLB> _getTotalRecordCountGLB;
        private readonly IRawQueryRepo<Object> _getAllByLike;
        #endregion

        #region Constructor
        public TbNcrtrackersController(
            IWebHostEnvironment heSrv,
            EntityContext context,
            IRawQueryRepo<TbNcrtracker> TbNcrtrackerContext,
            IRawQueryRepo<NCRTrackersView> getNCRTrackersView,
            IRawQueryRepo<TotalRecordCountGLB> getTotalRecordCountGLB,
            IRawQueryRepo<Object> getAllByLike
        )
        {
            _TbNcrtrackerContext = TbNcrtrackerContext;
            _heSrv = heSrv;
            _context = context;
            _getNCRTrackersView = getNCRTrackersView;
            _getTotalRecordCountGLB = getTotalRecordCountGLB;
            _getAllByLike = getAllByLike;
        }
        #endregion

        #region GetTbNcrtrackerView
        [HttpPost("GetNCRTrackersView")]
        public async Task<ActionResult<DatatableResponseGLB>> GetNCRTrackersView(DatatableGLB datatableGLB)
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
                var dataGrid = await _getNCRTrackersView.GetAllByWhere(new GetAllByWhereGLB()
                {
                    TableOrViewName = "NCRTrackersView",
                    SortColumn = sortInformation,
                    WhereConditions = whereConditionStatement,
                    LimitStart = datatableGLB.start,
                    LimitEnd = rowSize
                });

                var dataGridCount = await _getTotalRecordCountGLB.CountAllByWhere(new CountAllByWhereGLB()
                {
                    TableOrViewName = "NCRTrackersView",
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

        #region GetTbNcrtrackerAutoCompletion
        [HttpGet("GetNCRTrackersViewAutoCompletion")]
        public async Task<ActionResult<IEnumerable<object>>> GetTbNcrtrackerAutoCompleteSuggestion(string column, string value)
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
                    TableOrViewName = "NCRTrackersView"
                });

                #endregion database query code
                return Ok(autoSuggestions);
            }
            #endregion Call Repository Function
            return Ok();
        }
        #endregion

        #region GetTbNcrtrackers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TbNcrtracker>>> GetTbNcrtrackers()
        {
            try
            {
                return await _context.TbNcrtrackers.ToListAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }
        #endregion

        #region TbNcrtrackerById
        [HttpGet("{id}")]
        public async Task<ActionResult<TbNcrtracker>> GetTbNcrtracker(int id)
        {
            var objTbNcrtracker = new TbNcrtracker();
            try
            {
                objTbNcrtracker = await _context.TbNcrtrackers.Where(d => d.Id == id).FirstOrDefaultAsync();

                if (objTbNcrtracker == null)
                {
                    return StatusCode(404, "Data not found.");
                }

                return objTbNcrtracker;
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }
        #endregion

        #region TbNcrtrackerUpdate 
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTbNcrtracker(int id, TbNcrtracker objTbNcrtracker)
        {

            if (id != objTbNcrtracker.Id)
            {
                return StatusCode(404, "Data not found.");
            }

            _context.Entry(objTbNcrtracker).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
            return StatusCode(200, objTbNcrtracker);
        }

        #endregion

        #region TbNcrtrackerCreate
        [HttpPost]
        public async Task<ActionResult<TbNcrtracker>> CreateTbNcrtracker(TbNcrtracker objTbNcrtracker)
        {
            var getLast = _context.TbNcrtrackers.LastOrDefaultAsync();
            if (getLast == null)
                objTbNcrtracker.Id = 1;
            else
                objTbNcrtracker.Id = getLast.Id;

            _context.TbNcrtrackers.Add(objTbNcrtracker);
            try
            {
                await _context.SaveChangesAsync();
                return StatusCode(200, objTbNcrtracker);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }

        #endregion

        #region TbNcrtrackerDelete
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTbNcrtracker(int id)
        {
            var objTbNcrtracker = await _context.TbNcrtrackers.FindAsync(id);
            if (objTbNcrtracker == null)
            {
                return StatusCode(404, "Data not found");
            }

            _context.TbNcrtrackers.Remove(objTbNcrtracker);
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
                var dataGrid = await _getNCRTrackersView.ExportAllByWhere(new ExportAllByWhereGLB()
                {
                    TableOrViewName = "NCRTrackersView",
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
                    "NCR Number",
                    "PDR Number",
                    "WO Number",
                    "Date Issued",
                    "OC Inspector",
                    "Non-Conformance Summary",
                    "Date CAP Due",
                    "Status",
                    "Annex",
                    "Spec Item",
                    "Title",
                    "Responsible Person",
                    "Responsible Sub",
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

                //drawing cell data into excel
                foreach (var item in dataGrid)
                {
                    row = excelSheet.CreateRow(dataGrid.IndexOf(item) + 1);

                    //normal cell defining...
                    row.CreateCell(0).SetCellValue(item.NCRNumber);
                    row.CreateCell(1).SetCellValue(item.PDRNumber);
                    row.CreateCell(2).SetCellValue(item.WONumber);
                    row.CreateCell(3).SetCellValue(item.DateIssued.HasValue ? item.DateIssued.Value.ToString("MM/dd/yyyy") : "No data");
                    row.CreateCell(4).SetCellValue(item.QCInspector);
                    row.CreateCell(5).SetCellValue(item.NonConformanceSummary);
                    row.CreateCell(6).SetCellValue(item.DateCAPDue.HasValue ? item.DateCAPDue.Value.ToString("MM/dd/yyyy") : "No data");
                    row.CreateCell(7).SetCellValue(item.Status);
                    row.CreateCell(8).SetCellValue(item.Annex);
                    row.CreateCell(9).SetCellValue(item.SpecItem);
                    row.CreateCell(10).SetCellValue(item.Title);
                    row.CreateCell(11).SetCellValue(item.ResponsiblePerson);
                    row.CreateCell(12).SetCellValue(item.ResponsibleSub);

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
