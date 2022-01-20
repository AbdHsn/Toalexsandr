

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
    public class TbMenuValidStatussController : Controller
    {

        #region Variables
        private readonly IWebHostEnvironment _heSrv;
        private readonly EntityContext _context;
        private readonly IRawQueryRepo<TbMenuValidStatus> _TbMenuValidStatusContext;
        private readonly IRawQueryRepo<TbMenuValidStatussView> _getTbMenuValidStatussView;
        private readonly IRawQueryRepo<TotalRecordCountGLB> _getTotalRecordCountGLB;
        private readonly IRawQueryRepo<Object> _getAllByLike;
        #endregion

        #region Constructor
        public TbMenuValidStatussController(
            IWebHostEnvironment heSrv,
            EntityContext context,
            IRawQueryRepo<TbMenuValidStatus> TbMenuValidStatusContext,
            IRawQueryRepo<TbMenuValidStatussView> getTbMenuValidStatussView,
            IRawQueryRepo<TotalRecordCountGLB> getTotalRecordCountGLB,
            IRawQueryRepo<Object> getAllByLike
        )
        {
            _TbMenuValidStatusContext = TbMenuValidStatusContext;
            _heSrv = heSrv;
            _context = context;
            _getTbMenuValidStatussView = getTbMenuValidStatussView;
            _getTotalRecordCountGLB = getTotalRecordCountGLB;
            _getAllByLike = getAllByLike;
        }
        #endregion

        #region GetTbMenuValidStatusView
        [HttpPost("GetTbMenuValidStatussView")]
        public async Task<ActionResult<DatatableResponseGLB>> GetTbMenuValidStatussView(DatatableGLB datatableGLB)
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
                var dataGrid = await _getTbMenuValidStatussView.GetAllByWhere(new GetAllByWhereGLB()
                {
                    TableOrViewName = "TbMenuValidStatussView",
                    SortColumn = sortInformation,
                    WhereConditions = whereConditionStatement,
                    LimitStart = datatableGLB.start,
                    LimitEnd = rowSize
                });

                var dataGridCount = await _getTotalRecordCountGLB.CountAllByWhere(new CountAllByWhereGLB()
                {
                    TableOrViewName = "TbMenuValidStatussView",
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

        #region GetTbMenuValidStatusAutoCompletion
        [HttpGet("GetTbMenuValidStatusAutoCompletion")]
        public async Task<ActionResult<IEnumerable<object>>> GetTbMenuValidStatusAutoCompleteSuggestion(string column, string value)
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
                    TableOrViewName = "TbMenuValidStatussView"
                });

                #endregion database query code
                return Ok(autoSuggestions);
            }
            #endregion Call Repository Function
            return Ok();
        }
        #endregion

        #region GetTbMenuValidStatuss
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TbMenuValidStatus>>> GetTbMenuValidStatuss()
        {
            try
            {
                return await _context.TbMenuValidStatuses.ToListAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }
        #endregion

        #region TbMenuValidStatusById
        [HttpGet("{id}")]
        public async Task<ActionResult<TbMenuValidStatus>> GetTbMenuValidStatus(int id)
        {
            var objTbMenuValidStatus = new TbMenuValidStatus();
            try
            {
                objTbMenuValidStatus = await _context.TbMenuValidStatuses.Where(d => d.Id == id).FirstOrDefaultAsync();

                if (objTbMenuValidStatus == null)
                {
                    return StatusCode(404, "Data not found.");
                }

                return objTbMenuValidStatus;
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }
        #endregion

        #region TbMenuValidStatusUpdate 
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTbMenuValidStatus(int id, TbMenuValidStatus objTbMenuValidStatus)
        {

            if (id != objTbMenuValidStatus.Id)
            {
                return StatusCode(404, "Data not found.");
            }

            _context.Entry(objTbMenuValidStatus).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
            return StatusCode(200, objTbMenuValidStatus);
        }

        #endregion

        #region TbMenuValidStatusCreate
        [HttpPost]
        public async Task<ActionResult<TbMenuValidStatus>> CreateTbMenuValidStatus(TbMenuValidStatus objTbMenuValidStatus)
        {
            _context.TbMenuValidStatuses.Add(objTbMenuValidStatus);
            try
            {
                await _context.SaveChangesAsync();
                return StatusCode(200, objTbMenuValidStatus);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }

        #endregion

        #region TbMenuValidStatusDelete
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTbMenuValidStatus(int id)
        {
            var objTbMenuValidStatus = await _context.TbMenuValidStatuses.FindAsync(id);
            if (objTbMenuValidStatus == null)
            {
                return StatusCode(404, "Data not found");
            }

            _context.TbMenuValidStatuses.Remove(objTbMenuValidStatus);
            await _context.SaveChangesAsync();

            return StatusCode(200, true);
        }

        #endregion

    }
}
