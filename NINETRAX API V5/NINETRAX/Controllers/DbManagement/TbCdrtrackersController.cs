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
    public class TbCdrtrackersController : Controller
    {

        #region Variables
        private readonly IWebHostEnvironment _heSrv;
        private readonly EntityContext _context;
        private readonly IRawQueryRepo<TbCdrtracker> _TbCdrtrackerContext;
        private readonly IRawQueryRepo<TbCdrtrackersView> _getTbCdrtrackersView;
        private readonly IRawQueryRepo<TotalRecordCountGLB> _getTotalRecordCountGLB;
        private readonly IRawQueryRepo<Object> _getAllByLike;
        #endregion

        #region Constructor
        public TbCdrtrackersController(
            IWebHostEnvironment heSrv,
            EntityContext context,
            IRawQueryRepo<TbCdrtracker> TbCdrtrackerContext,
            IRawQueryRepo<TbCdrtrackersView> getTbCdrtrackersView,
            IRawQueryRepo<TotalRecordCountGLB> getTotalRecordCountGLB,
            IRawQueryRepo<Object> getAllByLike
        )
        {
            _TbCdrtrackerContext = TbCdrtrackerContext;
            _heSrv = heSrv;
            _context = context;
            _getTbCdrtrackersView = getTbCdrtrackersView;
            _getTotalRecordCountGLB = getTotalRecordCountGLB;
            _getAllByLike = getAllByLike;
        }
        #endregion

        #region GetTbCdrtrackerView
        [HttpPost("GetTbCdrtrackersView")]
        public async Task<ActionResult<DatatableResponseGLB>> GetTbCdrtrackersView(DatatableGLB datatableGLB)
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
                var dataGrid = await _getTbCdrtrackersView.GetAllByWhere(new GetAllByWhereGLB()
                {
                    TableOrViewName = "TbCdrtrackersView",
                    SortColumn = sortInformation,
                    WhereConditions = whereConditionStatement,
                    LimitStart = datatableGLB.start,
                    LimitEnd = rowSize
                });

                var dataGridCount = await _getTotalRecordCountGLB.CountAllByWhere(new CountAllByWhereGLB()
                {
                    TableOrViewName = "TbCdrtrackersView",
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

        #region GetTbCdrtrackerAutoCompletion
        [HttpGet("GetTbCdrtrackerAutoCompletion")]
        public async Task<ActionResult<IEnumerable<object>>> GetTbCdrtrackerAutoCompleteSuggestion(string column, string value)
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
                    TableOrViewName = "TbCdrtrackersView"
                });

                #endregion database query code
                return Ok(autoSuggestions);
            }
            #endregion Call Repository Function
            return Ok();
        }
        #endregion

        #region GetTbCdrtrackers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TbCdrtracker>>> GetTbCdrtrackers()
        {
            try
            {
                return await _context.TbCdrtrackers.ToListAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }
        #endregion

        #region TbCdrtrackerById
        [HttpGet("{id}")]
        public async Task<ActionResult<TbCdrtracker>> GetTbCdrtracker(int id)
        {
            var objTbCdrtracker = new TbCdrtracker();
            try
            {
                objTbCdrtracker = await _context.TbCdrtrackers.Where(d => d.Id == id).FirstOrDefaultAsync();

                if (objTbCdrtracker == null)
                {
                    return StatusCode(404, "Data not found.");
                }

                return objTbCdrtracker;
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }
        #endregion

        #region TbCdrtrackerUpdate 
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTbCdrtracker(int id, TbCdrtracker objTbCdrtracker)
        {

            if (id != objTbCdrtracker.Id)
            {
                return StatusCode(404, "Data not found.");
            }

            _context.Entry(objTbCdrtracker).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
            return StatusCode(200, objTbCdrtracker);
        }

        #endregion

        #region TbCdrtrackerCreate
        [HttpPost]
        public async Task<ActionResult<TbCdrtracker>> CreateTbCdrtracker(TbCdrtracker objTbCdrtracker)
        {
            _context.TbCdrtrackers.Add(objTbCdrtracker);
            try
            {
                await _context.SaveChangesAsync();
                return StatusCode(200, objTbCdrtracker);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }

        #endregion

        #region TbCdrtrackerDelete
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTbCdrtracker(int id)
        {
            var objTbCdrtracker = await _context.TbCdrtrackers.FindAsync(id);
            if (objTbCdrtracker == null)
            {
                return StatusCode(404, "Data not found");
            }

            _context.TbCdrtrackers.Remove(objTbCdrtracker);
            await _context.SaveChangesAsync();

            return StatusCode(200, true);
        }

        #endregion

    }
}
