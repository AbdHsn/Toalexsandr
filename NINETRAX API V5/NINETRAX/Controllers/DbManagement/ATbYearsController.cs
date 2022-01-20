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
    public class ATbYearsController : Controller
    {

        #region Variables
        private readonly IWebHostEnvironment _heSrv;
        private readonly EntityContext _context;
        private readonly IRawQueryRepo<ATbYear> _ATbYearContext;
        private readonly IRawQueryRepo<ATbYearsView> _getATbYearsView;
        private readonly IRawQueryRepo<TotalRecordCountGLB> _getTotalRecordCountGLB;
        private readonly IRawQueryRepo<Object> _getAllByLike;
        #endregion

        #region Constructor
        public ATbYearsController(
            IWebHostEnvironment heSrv,
            EntityContext context,
            IRawQueryRepo<ATbYear> ATbYearContext,
            IRawQueryRepo<ATbYearsView> getATbYearsView,
            IRawQueryRepo<TotalRecordCountGLB> getTotalRecordCountGLB,
            IRawQueryRepo<Object> getAllByLike
        )
        {
            _ATbYearContext = ATbYearContext;
            _heSrv = heSrv;
            _context = context;
            _getATbYearsView = getATbYearsView;
            _getTotalRecordCountGLB = getTotalRecordCountGLB;
            _getAllByLike = getAllByLike;
        }
        #endregion

        #region GetATbYearView
        [HttpPost("GetATbYearsView")]
        public async Task<ActionResult<DatatableResponseGLB>> GetATbYearsView(DatatableGLB datatableGLB)
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
                var dataGrid = await _getATbYearsView.GetAllByWhere(new GetAllByWhereGLB()
                {
                    TableOrViewName = "ATbYearsView",
                    SortColumn = sortInformation,
                    WhereConditions = whereConditionStatement,
                    LimitStart = datatableGLB.start,
                    LimitEnd = rowSize
                });

                var dataGridCount = await _getTotalRecordCountGLB.CountAllByWhere(new CountAllByWhereGLB()
                {
                    TableOrViewName = "ATbYearsView",
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

        #region GetATbYearAutoCompletion
        [HttpGet("GetATbYearAutoCompletion")]
        public async Task<ActionResult<IEnumerable<object>>> GetATbYearAutoCompleteSuggestion(string column, string value)
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
                    TableOrViewName = "ATbYearsView"
                });

                #endregion database query code
                return Ok(autoSuggestions);
            }
            #endregion Call Repository Function
            return Ok();
        }
        #endregion

        #region GetATbYears
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ATbYear>>> GetATbYears()
        {
            try
            {
                return await _context.ATbYears.ToListAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }
        #endregion

        #region ATbYearById
        [HttpGet("{id}")]
        public async Task<ActionResult<ATbYear>> GetATbYear(int id)
        {
            var objATbYear = new ATbYear();
            try
            {
                objATbYear = await _context.ATbYears.Where(d => d.Id == id).FirstOrDefaultAsync();

                if (objATbYear == null)
                {
                    return StatusCode(404, "Data not found.");
                }

                return objATbYear;
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }
        #endregion

        #region ATbYearUpdate 
        [HttpPut("{id}")]
        public async Task<IActionResult> PutATbYear(int id, ATbYear objATbYear)
        {

            if (id != objATbYear.Id)
            {
                return StatusCode(404, "Data not found.");
            }

            _context.Entry(objATbYear).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
            return StatusCode(200, objATbYear);
        }

        #endregion

        #region ATbYearCreate
        [HttpPost]
        public async Task<ActionResult<ATbYear>> CreateATbYear(ATbYear objATbYear)
        {
            _context.ATbYears.Add(objATbYear);
            try
            {
                await _context.SaveChangesAsync();
                return StatusCode(200, objATbYear);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }

        #endregion

        #region ATbYearDelete
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteATbYear(int id)
        {
            var objATbYear = await _context.ATbYears.FindAsync(id);
            if (objATbYear == null)
            {
                return StatusCode(404, "Data not found");
            }

            _context.ATbYears.Remove(objATbYear);
            await _context.SaveChangesAsync();

            return StatusCode(200, true);
        }

        #endregion

    }
}
