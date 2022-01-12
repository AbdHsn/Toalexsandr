

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
    public class TbMonthDatesController : Controller
    {

        #region Variables
        private readonly IWebHostEnvironment _heSrv;
        private readonly EntityContext _context;
        private readonly IRawQueryRepo<TbMonthDate> _TbMonthDateContext;
        private readonly IRawQueryRepo<TbMonthDatesView> _getTbMonthDatesView;
        private readonly IRawQueryRepo<TotalRecordCountGLB> _getTotalRecordCountGLB;
        private readonly IRawQueryRepo<Object> _getAllByLike;
        #endregion

        #region Constructor
        public TbMonthDatesController(
            IWebHostEnvironment heSrv,
            EntityContext context,
            IRawQueryRepo<TbMonthDate> TbMonthDateContext,
            IRawQueryRepo<TbMonthDatesView> getTbMonthDatesView,
            IRawQueryRepo<TotalRecordCountGLB> getTotalRecordCountGLB,
            IRawQueryRepo<Object> getAllByLike
        )
        {
            _TbMonthDateContext = TbMonthDateContext;
            _heSrv = heSrv;
            _context = context;
            _getTbMonthDatesView = getTbMonthDatesView;
            _getTotalRecordCountGLB = getTotalRecordCountGLB;
            _getAllByLike = getAllByLike;
        }
        #endregion

        #region GetTbMonthDateView
        [HttpPost("GetTbMonthDatesView")]
        public async Task<ActionResult<DatatableResponseGLB>> GetTbMonthDatesView(DatatableGLB datatableGLB)
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
                var dataGrid = await _getTbMonthDatesView.GetAllByWhere(new GetAllByWhereGLB()
                {
                    TableOrViewName = "TbMonthDatesView",
                    SortColumn = sortInformation,
                    WhereConditions = whereConditionStatement,
                    LimitStart = datatableGLB.start,
                    LimitEnd = rowSize
                });

                var dataGridCount = await _getTotalRecordCountGLB.CountAllByWhere(new CountAllByWhereGLB()
                {
                    TableOrViewName = "TbMonthDatesView",
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

        #region GetTbMonthDateAutoCompletion
        [HttpGet("GetTbMonthDateAutoCompletion")]
        public async Task<ActionResult<IEnumerable<object>>> GetTbMonthDateAutoCompleteSuggestion(string column, string value)
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
                    TableOrViewName = "TbMonthDatesView"
                });

                #endregion database query code
                return Ok(autoSuggestions);
            }
            #endregion Call Repository Function
            return Ok();
        }
        #endregion

        #region GetTbMonthDates
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TbMonthDate>>> GetTbMonthDates()
        {
            try
            {
                return await _context.TbMonthDates.ToListAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }
        #endregion

        #region TbMonthDateById
        [HttpGet("{id}")]
        public async Task<ActionResult<TbMonthDate>> GetTbMonthDate(int id)
        {
            var objTbMonthDate = new TbMonthDate();
            try
            {
                objTbMonthDate = await _context.TbMonthDates.Where(d => d.Id == id).FirstOrDefaultAsync();

                if (objTbMonthDate == null)
                {
                    return StatusCode(404, "Data not found.");
                }

                return objTbMonthDate;
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }
        #endregion

        #region TbMonthDateUpdate 
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTbMonthDate(int id, TbMonthDate objTbMonthDate)
        {

            if (id != objTbMonthDate.Id)
            {
                return StatusCode(404, "Data not found.");
            }

            _context.Entry(objTbMonthDate).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
            return StatusCode(200, objTbMonthDate);
        }

        #endregion

        #region TbMonthDateCreate
        [HttpPost]
        public async Task<ActionResult<TbMonthDate>> CreateTbMonthDate(TbMonthDate objTbMonthDate)
        {
            _context.TbMonthDates.Add(objTbMonthDate);
            try
            {
                await _context.SaveChangesAsync();
                return StatusCode(200, objTbMonthDate);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }

        #endregion

        #region TbMonthDateDelete
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTbMonthDate(int id)
        {
            var objTbMonthDate = await _context.TbMonthDates.FindAsync(id);
            if (objTbMonthDate == null)
            {
                return StatusCode(404, "Data not found");
            }

            _context.TbMonthDates.Remove(objTbMonthDate);
            await _context.SaveChangesAsync();

            return StatusCode(200, true);
        }

        #endregion

    }
}
