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
        private readonly IRawQueryRepo<Object> _getAllByLike;
        #endregion

        #region Constructor
        public ATbNasinspectionsImportsController(
            IWebHostEnvironment heSrv,
            EntityContext context,
            IRawQueryRepo<ATbNasinspectionsImport> ATbNasinspectionsImportContext,
            IRawQueryRepo<ATbNasinspectionsImportsView> getATbNasinspectionsImportsView,
            IRawQueryRepo<TotalRecordCountGLB> getTotalRecordCountGLB,
            IRawQueryRepo<Object> getAllByLike
        )
        {
            _ATbNasinspectionsImportContext = ATbNasinspectionsImportContext;
            _heSrv = heSrv;
            _context = context;
            _getATbNasinspectionsImportsView = getATbNasinspectionsImportsView;
            _getTotalRecordCountGLB = getTotalRecordCountGLB;
            _getAllByLike = getAllByLike;
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
                response.recordsTotal = dataGridCount.TotalRecord;
                response.recordsFiltered = dataGridCount.TotalRecord;

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

    }
}
