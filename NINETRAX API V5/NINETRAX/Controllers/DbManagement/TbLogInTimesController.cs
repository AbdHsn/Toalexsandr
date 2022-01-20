

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
    public class TbLogInTimesController : Controller
    {

        #region Variables
        private readonly IWebHostEnvironment _heSrv;
        private readonly EntityContext _context;
        private readonly IRawQueryRepo<TbLogInTime> _TbLogInTimeContext;
        private readonly IRawQueryRepo<TbLogInTimesView> _getTbLogInTimesView;
        private readonly IRawQueryRepo<TotalRecordCountGLB> _getTotalRecordCountGLB;
        private readonly IRawQueryRepo<Object> _getAllByLike;
        #endregion

        #region Constructor
        public TbLogInTimesController(
            IWebHostEnvironment heSrv,
            EntityContext context,
            IRawQueryRepo<TbLogInTime> TbLogInTimeContext,
            IRawQueryRepo<TbLogInTimesView> getTbLogInTimesView,
            IRawQueryRepo<TotalRecordCountGLB> getTotalRecordCountGLB,
            IRawQueryRepo<Object> getAllByLike
        )
        {
            _TbLogInTimeContext = TbLogInTimeContext;
            _heSrv = heSrv;
            _context = context;
            _getTbLogInTimesView = getTbLogInTimesView;
            _getTotalRecordCountGLB = getTotalRecordCountGLB;
            _getAllByLike = getAllByLike;
        }
        #endregion

        #region GetTbLogInTimeView
        [HttpPost("GetTbLogInTimesView")]
        public async Task<ActionResult<DatatableResponseGLB>> GetTbLogInTimesView(DatatableGLB datatableGLB)
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
                var dataGrid = await _getTbLogInTimesView.GetAllByWhere(new GetAllByWhereGLB()
                {
                    TableOrViewName = "TbLogInTimesView",
                    SortColumn = sortInformation,
                    WhereConditions = whereConditionStatement,
                    LimitStart = datatableGLB.start,
                    LimitEnd = rowSize
                });

                var dataGridCount = await _getTotalRecordCountGLB.CountAllByWhere(new CountAllByWhereGLB()
                {
                    TableOrViewName = "TbLogInTimesView",
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

        #region GetTbLogInTimeAutoCompletion
        [HttpGet("GetTbLogInTimeAutoCompletion")]
        public async Task<ActionResult<IEnumerable<object>>> GetTbLogInTimeAutoCompleteSuggestion(string column, string value)
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
                    TableOrViewName = "TbLogInTimesView"
                });

                #endregion database query code
                return Ok(autoSuggestions);
            }
            #endregion Call Repository Function
            return Ok();
        }
        #endregion

        #region GetTbLogInTimes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TbLogInTime>>> GetTbLogInTimes()
        {
            try
            {
                return await _context.TbLogInTimes.ToListAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }
        #endregion

        #region TbLogInTimeById
        [HttpGet("{id}")]
        public async Task<ActionResult<TbLogInTime>> GetTbLogInTime(int id)
        {
            var objTbLogInTime = new TbLogInTime();
            try
            {
                objTbLogInTime = await _context.TbLogInTimes.Where(d => d.Id == id).FirstOrDefaultAsync();

                if (objTbLogInTime == null)
                {
                    return StatusCode(404, "Data not found.");
                }

                return objTbLogInTime;
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }
        #endregion

        #region TbLogInTimeUpdate 
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTbLogInTime(int id, TbLogInTime objTbLogInTime)
        {

            if (id != objTbLogInTime.Id)
            {
                return StatusCode(404, "Data not found.");
            }

            _context.Entry(objTbLogInTime).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
            return StatusCode(200, objTbLogInTime);
        }

        #endregion

        #region TbLogInTimeCreate
        [HttpPost]
        public async Task<ActionResult<TbLogInTime>> CreateTbLogInTime(TbLogInTime objTbLogInTime)
        {
            _context.TbLogInTimes.Add(objTbLogInTime);
            try
            {
                await _context.SaveChangesAsync();
                return StatusCode(200, objTbLogInTime);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }

        #endregion

        #region TbLogInTimeDelete
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTbLogInTime(int id)
        {
            var objTbLogInTime = await _context.TbLogInTimes.FindAsync(id);
            if (objTbLogInTime == null)
            {
                return StatusCode(404, "Data not found");
            }

            _context.TbLogInTimes.Remove(objTbLogInTime);
            await _context.SaveChangesAsync();

            return StatusCode(200, true);
        }

        #endregion

    }
}
