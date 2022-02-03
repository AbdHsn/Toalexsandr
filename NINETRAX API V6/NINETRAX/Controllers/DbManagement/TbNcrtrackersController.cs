

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
    public class TbNcrtrackersController : Controller
    {

        #region Variables
        private readonly IWebHostEnvironment _heSrv;
        private readonly EntityContext _context;
        private readonly IRawQueryRepo<TbNcrtracker> _TbNcrtrackerContext;
        private readonly IRawQueryRepo<TbNcrtrackersView> _getTbNcrtrackersView;
        private readonly IRawQueryRepo<TotalRecordCountGLB> _getTotalRecordCountGLB;
        private readonly IRawQueryRepo<Object> _getAllByLike;
        #endregion

        #region Constructor
        public TbNcrtrackersController(
            IWebHostEnvironment heSrv,
            EntityContext context,
            IRawQueryRepo<TbNcrtracker> TbNcrtrackerContext,
            IRawQueryRepo<TbNcrtrackersView> getTbNcrtrackersView,
            IRawQueryRepo<TotalRecordCountGLB> getTotalRecordCountGLB,
            IRawQueryRepo<Object> getAllByLike
        )
        {
            _TbNcrtrackerContext = TbNcrtrackerContext;
            _heSrv = heSrv;
            _context = context;
            _getTbNcrtrackersView = getTbNcrtrackersView;
            _getTotalRecordCountGLB = getTotalRecordCountGLB;
            _getAllByLike = getAllByLike;
        }
        #endregion

        #region GetTbNcrtrackerView
        [HttpPost("GetTbNcrtrackersView")]
        public async Task<ActionResult<DatatableResponseGLB>> GetTbNcrtrackersView(DatatableGLB datatableGLB)
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
                var dataGrid = await _getTbNcrtrackersView.GetAllByWhere(new GetAllByWhereGLB()
                {
                    TableOrViewName = "TbNcrtrackersView",
                    SortColumn = sortInformation,
                    WhereConditions = whereConditionStatement,
                    LimitStart = datatableGLB.start,
                    LimitEnd = rowSize
                });

                var dataGridCount = await _getTotalRecordCountGLB.CountAllByWhere(new CountAllByWhereGLB()
                {
                    TableOrViewName = "TbNcrtrackersView",
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
        [HttpGet("GetTbNcrtrackerAutoCompletion")]
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
                    TableOrViewName = "TbNcrtrackersView"
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

    }
}
