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
    public class ATbElinNumbersController : Controller
    {

        #region Variables
        private readonly IWebHostEnvironment _heSrv;
        private readonly EntityContext _context;
        private readonly IRawQueryRepo<ATbElinNumber> _ATbElinNumberContext;
        private readonly IRawQueryRepo<ATbElinNumbersView> _getATbElinNumbersView;
        private readonly IRawQueryRepo<TotalRecordCountGLB> _getTotalRecordCountGLB;
        private readonly IRawQueryRepo<Object> _getAllByLike;
        #endregion

        #region Constructor
        public ATbElinNumbersController(
            IWebHostEnvironment heSrv,
            EntityContext context,
            IRawQueryRepo<ATbElinNumber> ATbElinNumberContext,
            IRawQueryRepo<ATbElinNumbersView> getATbElinNumbersView,
            IRawQueryRepo<TotalRecordCountGLB> getTotalRecordCountGLB,
            IRawQueryRepo<Object> getAllByLike
        )
        {
            _ATbElinNumberContext = ATbElinNumberContext;
            _heSrv = heSrv;
            _context = context;
            _getATbElinNumbersView = getATbElinNumbersView;
            _getTotalRecordCountGLB = getTotalRecordCountGLB;
            _getAllByLike = getAllByLike;
        }
        #endregion

        #region GetATbElinNumberView
        [HttpPost("GetATbElinNumbersView")]
        public async Task<ActionResult<DatatableResponseGLB>> GetATbElinNumbersView(DatatableGLB datatableGLB)
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
                var dataGrid = await _getATbElinNumbersView.GetAllByWhere(new GetAllByWhereGLB()
                {
                    TableOrViewName = "ATbElinNumbersView",
                    SortColumn = sortInformation,
                    WhereConditions = whereConditionStatement,
                    LimitStart = datatableGLB.start,
                    LimitEnd = rowSize
                });

                var dataGridCount = await _getTotalRecordCountGLB.CountAllByWhere(new CountAllByWhereGLB()
                {
                    TableOrViewName = "ATbElinNumbersView",
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

        #region GetATbElinNumberAutoCompletion
        [HttpGet("GetATbElinNumberAutoCompletion")]
        public async Task<ActionResult<IEnumerable<object>>> GetATbElinNumberAutoCompleteSuggestion(string column, string value)
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
                    TableOrViewName = "ATbElinNumbersView"
                });

                #endregion database query code
                return Ok(autoSuggestions);
            }
            #endregion Call Repository Function
            return Ok();
        }
        #endregion

        #region GetATbElinNumbers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ATbElinNumber>>> GetATbElinNumbers()
        {
            try
            {
                return await _context.ATbElinNumbers.ToListAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }
        #endregion

        #region ATbElinNumberById
        [HttpGet("{id}")]
        public async Task<ActionResult<ATbElinNumber>> GetATbElinNumber(int id)
        {
            var objATbElinNumber = new ATbElinNumber();
            try
            {
                objATbElinNumber = await _context.ATbElinNumbers.Where(d => d.Id == id).FirstOrDefaultAsync();

                if (objATbElinNumber == null)
                {
                    return StatusCode(404, "Data not found.");
                }

                return objATbElinNumber;
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }
        #endregion

        #region ATbElinNumberUpdate 
        [HttpPut("{id}")]
        public async Task<IActionResult> PutATbElinNumber(int id, ATbElinNumber objATbElinNumber)
        {

            if (id != objATbElinNumber.Id)
            {
                return StatusCode(404, "Data not found.");
            }

            _context.Entry(objATbElinNumber).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
            return StatusCode(200, objATbElinNumber);
        }

        #endregion

        #region ATbElinNumberCreate
        [HttpPost]
        public async Task<ActionResult<ATbElinNumber>> CreateATbElinNumber(ATbElinNumber objATbElinNumber)
        {
            _context.ATbElinNumbers.Add(objATbElinNumber);
            try
            {
                await _context.SaveChangesAsync();
                return StatusCode(200, objATbElinNumber);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }

        #endregion

        #region ATbElinNumberDelete
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteATbElinNumber(int id)
        {
            var objATbElinNumber = await _context.ATbElinNumbers.FindAsync(id);
            if (objATbElinNumber == null)
            {
                return StatusCode(404, "Data not found");
            }

            _context.ATbElinNumbers.Remove(objATbElinNumber);
            await _context.SaveChangesAsync();

            return StatusCode(200, true);
        }

        #endregion

    }
}
