using DataLayer.Models.EntityModels;
using DataLayer.Models.GlobalModels;
using ExcelDataReader;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RepositoryLayer;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;
using NINETRAX.Globals;
using DataLayer.Models.SPModels;

namespace NINETRAX.Controllers.DbManagement
{
    [Route("api/d/[controller]")]
    [ApiController]
    public class ATbNasinspectionsImportsController : Controller
    {

        #region Variables
        private readonly IWebHostEnvironment _heSrv;
        private readonly EntityContext _context;
        private readonly IRawQueryRepo<ATbNasinspectionsImport> _ATbNasinspectionsImportContext;
        private readonly IRawQueryRepo<ATbNasinspectionsImportsView> _getATbNasinspectionsImportsView;
        private readonly IRawQueryRepo<TotalRecordCountGLB> _getTotalRecordCountGLB;
        private readonly IRawQueryRepo<object> _getAllByLike;
        private readonly IRawQueryRepo<object> _callSP;
        #endregion

        #region Constructor
        public ATbNasinspectionsImportsController(
            IWebHostEnvironment heSrv,
            EntityContext context,
            IRawQueryRepo<ATbNasinspectionsImport> ATbNasinspectionsImportContext,
            IRawQueryRepo<ATbNasinspectionsImportsView> getATbNasinspectionsImportsView,
            IRawQueryRepo<TotalRecordCountGLB> getTotalRecordCountGLB,
            IRawQueryRepo<Object> getAllByLike,
            IRawQueryRepo<Object> callSP
     
        )
        {
            _ATbNasinspectionsImportContext = ATbNasinspectionsImportContext;
            _heSrv = heSrv;
            _context = context;
            _getATbNasinspectionsImportsView = getATbNasinspectionsImportsView;
            _getTotalRecordCountGLB = getTotalRecordCountGLB;
            _getAllByLike = getAllByLike;
            _callSP = callSP;
        
        }
        #endregion

        #region GetATbNasinspectionsImportView
        [HttpPost("GetATbNasinspectionsImportsView")]
        public async Task<ActionResult<DatatableResponseGLB>> GetATbNasinspectionsImportsView(DatatableGLB datatableGLB)
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
                var dataGrid = await _getATbNasinspectionsImportsView.GetAllByWhere(new GetAllByWhereGLB()
                {
                    TableOrViewName = "ATbNasinspectionsImportsView",
                    SortColumn = sortInformation,
                    WhereConditions = whereConditionStatement,
                    LimitStart = datatableGLB.start,
                    LimitEnd = rowSize
                });

                var dataGridCount = await _getTotalRecordCountGLB.CountAllByWhere(new CountAllByWhereGLB()
                {
                    TableOrViewName = "ATbNasinspectionsImportsView",
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

        #region GetATbNasinspectionsImportAutoCompletion
        [HttpGet("GetATbNasinspectionsImportAutoCompletion")]
        public async Task<ActionResult<IEnumerable<object>>> GetATbNasinspectionsImportAutoCompleteSuggestion(string column, string value)
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
                    TableOrViewName = "ATbNasinspectionsImportsView"
                });

                #endregion database query code
                return Ok(autoSuggestions);
            }
            #endregion Call Repository Function
            return Ok();
        }
        #endregion

        #region GetATbNasinspectionsImports
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ATbNasinspectionsImport>>> GetATbNasinspectionsImports()
        {
            try
            {
                return await _context.ATbNasinspectionsImports.ToListAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }
        #endregion

        #region ATbNasinspectionsImportById
        [HttpGet("{id}")]
        public async Task<ActionResult<ATbNasinspectionsImport>> GetATbNasinspectionsImport(int id)
        {
            var objATbNasinspectionsImport = new ATbNasinspectionsImport();
            try
            {
                objATbNasinspectionsImport = await _context.ATbNasinspectionsImports.Where(d => d.Id == id).FirstOrDefaultAsync();

                if (objATbNasinspectionsImport == null)
                {
                    return StatusCode(404, "Data not found.");
                }

                return objATbNasinspectionsImport;
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }
        #endregion

        #region ATbNasinspectionsImportUpdate 
        [HttpPut("{id}")]
        public async Task<IActionResult> PutATbNasinspectionsImport(int id, ATbNasinspectionsImport objATbNasinspectionsImport)
        {

            if (id != objATbNasinspectionsImport.Id)
            {
                return StatusCode(404, "Data not found.");
            }

            _context.Entry(objATbNasinspectionsImport).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
            return StatusCode(200, objATbNasinspectionsImport);
        }

        #endregion

        #region ATbNasinspectionsImportCreate
        [HttpPost]
        public async Task<ActionResult<ATbNasinspectionsImport>> CreateATbNasinspectionsImport(ATbNasinspectionsImport objATbNasinspectionsImport)
        {
            _context.ATbNasinspectionsImports.Add(objATbNasinspectionsImport);
            try
            {
                await _context.SaveChangesAsync();
                return StatusCode(200, objATbNasinspectionsImport);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }

        #endregion

        #region ATbNasinspectionsImportDelete
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteATbNasinspectionsImport(int id)
        {
            var objATbNasinspectionsImport = await _context.ATbNasinspectionsImports.FindAsync(id);
            if (objATbNasinspectionsImport == null)
            {
                return StatusCode(404, "Data not found");
            }

            _context.ATbNasinspectionsImports.Remove(objATbNasinspectionsImport);
            await _context.SaveChangesAsync();

            return StatusCode(200, true);
        }

        #endregion

        #region ImportFromMAXIMO
        [HttpPost("ImportFromMaximo")]
        public async Task<Object> ImportFromMaximo(IFormFile importFile)
        {
            try
            {
                //var f = file;

                var excelData = new List<ATbNasinspectionsImport>();
                #region FileProcessing
                if (Request.Form.Files[0] != null)
                {
                    //var uploadedExcelFile = Request.Form.Files[0];
                    var uploadedExcelFile = importFile;

                    string getExtension = Path.GetExtension(uploadedExcelFile.FileName).ToLower();

                    if (getExtension == ".xlsx" || getExtension == ".xls" || getExtension == ".csv")
                    {
                        // required because of known issue when running on .NET Core
                        System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);

                        using (var stream = new MemoryStream())
                        {
                            uploadedExcelFile.CopyTo(stream);
                            stream.Position = 0;
                            using (var reader = ExcelReaderFactory.CreateReader(stream))
                            {
                                int count = 0;
                                while (reader.Read()) //Each row of the file
                                {
                                    //skipping header record.
                                    if (count == 0)
                                    {
                                        count++;
                                        continue;
                                    }

                                    //var t = reader.GetValue(0).ToString();

                                    //Assigning excel data into ExcelReaderVM
                                    excelData.Add(new ATbNasinspectionsImport
                                    {
                                        WorkOrder = reader.GetValue(0).ToString(),
                                        Description = reader.GetValue(1).ToString(),
                                        Long_Description = reader.GetValue(2).ToString(),
                                        Location = reader.GetValue(3).ToString(),
                                        Asset = reader.GetValue(4).ToString(),
                                        Asset_Description = reader.GetValue(5).ToString(),
                                        Status = reader.GetValue(6).ToString(),
                                        Crew = reader.GetValue(7).ToString(),
                                        Lead = reader.GetValue(8).ToString(),
                                        WorkType = reader.GetValue(9).ToString(),
                                        SubWorkType = reader.GetValue(10).ToString(),
                                        Elin = reader.GetValue(11).ToString(),
                                        OnBehalfOf = reader.GetValue(12)?.ToString(),
                                        Phone = reader.GetValue(13).ToString(),
                                        Duration = reader.GetValue(14).ToString(),
                                        TargetStart = reader.GetValue(15) != null ? DateTime.Parse(reader.GetValue(15).ToString()) : null,
                                        TargetFinish = reader.GetValue(16) != null ? DateTime.Parse(reader.GetValue(16).ToString()) : null,
                                        ActualStart = reader.GetValue(17) != null ? DateTime.Parse(reader.GetValue(17).ToString()) : null,
                                        ActualFinish = reader.GetValue(18) != null ? DateTime.Parse(reader.GetValue(18).ToString()) : null,
                                        StatusDate = reader.GetValue(19) != null ? DateTime.Parse(reader.GetValue(19).ToString()) : null
                                    });
                                    count++;
                                }
                            }
                        }

                        //save data
                        if (excelData.Count() > 0)
                        {
                            _context.ChangeTracker.AutoDetectChangesEnabled = false;
                            _context.ATbNasinspectionsImports.AddRange(excelData);
                            _context.ChangeTracker.DetectChanges();
                            await _context.SaveChangesAsync();
                            //Don't forget to revert changes
                            _context.ChangeTracker.AutoDetectChangesEnabled = true;

                            int importedCount = await _context.Database.ExecuteSqlRawAsync($"CALL InspectionsImportMatchAppend()");

                            if (importedCount > 0)
                            {
                                //clean temporary imported data
                                int deletedCount = await _context.Database.ExecuteSqlRawAsync($"DELETE FROM A_tb_NASInspectionsImport");
                                return StatusCode(200, $"{importedCount} Data successfully imported.");
                            }
                            else
                                return StatusCode(200, "No data imported.");
                        }
                        else
                        {
                            return StatusCode(404, "No data found to procceed.");
                        }
                    }
                    else
                    {
                        return BadRequest("Invalid file provided.");
                    }
                }
                else
                {
                    return NotFound("File not provided to proceed.");
                }
                #endregion
            }
            catch (Exception ex)
            {
                string error = ex.StackTrace.ToString();
                return StatusCode(500, "Excel importing failed to proceed.");
            }
        }
        #endregion

        #region GetSampleExcel
        [HttpGet("GetSampleExcel")]
        public async Task<IActionResult> GetSampleExcelOfImportMaximo()
        {
            try
            {
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
                     "Work Order",
                     "Description",
                     "Long Description",
                     "WO Location",
                     "Asset",
                     "Asset Description",
                     "Status",
                     "Crew",
                     "Lead",
                     "Work Type",
                     "Sub Work Type",
                     "Elin",
                     "Point Of Contact",
                     "Phone",
                     "Duration",
                     "Target Start",
                     "Target Finish",
                     "Actual Start",
                     "Actual Finish",
                     "Status Date"
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
                excelSheet.SetColumnWidth(0, 6600);
                excelSheet.SetColumnWidth(1, 6600);
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

                #endregion

                var prepareExcelData = CommonFunctions.ExportToExcelFile(_heSrv, Request, workbook);

                return File(prepareExcelData, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "ImportFromMaximoSample.xlsx");
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
