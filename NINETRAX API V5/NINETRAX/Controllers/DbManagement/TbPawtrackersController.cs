

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
    public class TbPawtrackersController : Controller
    {

        #region Variables
        private readonly IWebHostEnvironment _heSrv;
        private readonly EntityContext _context;
        private readonly IRawQueryRepo<TbPawtracker> _TbPawtrackerContext;
        private readonly IRawQueryRepo<TbPawtrackersView> _getTbPawtrackersView;
        private readonly IRawQueryRepo<TotalRecordCountGLB> _getTotalRecordCountGLB;
        private readonly IRawQueryRepo<Object> _getAllByLike;
        #endregion

        #region Constructor
        public TbPawtrackersController(
            IWebHostEnvironment heSrv,
            EntityContext context,
            IRawQueryRepo<TbPawtracker> TbPawtrackerContext,
            IRawQueryRepo<TbPawtrackersView> getTbPawtrackersView,
            IRawQueryRepo<TotalRecordCountGLB> getTotalRecordCountGLB,
            IRawQueryRepo<Object> getAllByLike
        )
        {
            _TbPawtrackerContext = TbPawtrackerContext;
            _heSrv = heSrv;
            _context = context;
            _getTbPawtrackersView = getTbPawtrackersView;
            _getTotalRecordCountGLB = getTotalRecordCountGLB;
            _getAllByLike = getAllByLike;
        }
        #endregion

        #region GetTbPawtrackerView
        [HttpPost("GetTbPawtrackersView")]
        public async Task<ActionResult<DatatableResponseGLB>> GetTbPawtrackersView(DatatableGLB datatableGLB)
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
                var dataGrid = await _getTbPawtrackersView.GetAllByWhere(new GetAllByWhereGLB()
                {
                    TableOrViewName = "TbPawtrackersView",
                    SortColumn = sortInformation,
                    WhereConditions = whereConditionStatement,
                    LimitStart = datatableGLB.start,
                    LimitEnd = rowSize
                });

                var dataGridCount = await _getTotalRecordCountGLB.CountAllByWhere(new CountAllByWhereGLB()
                {
                    TableOrViewName = "TbPawtrackersView",
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

        #region GetTbPawtrackerAutoCompletion
        [HttpGet("GetTbPawtrackerAutoCompletion")]
        public async Task<ActionResult<IEnumerable<object>>> GetTbPawtrackerAutoCompleteSuggestion(string column, string value)
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
                    TableOrViewName = "TbPawtrackersView"
                });

                #endregion database query code
                return Ok(autoSuggestions);
            }
            #endregion Call Repository Function
            return Ok();
        }
        #endregion

        #region GetTbPawtrackers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TbPawtracker>>> GetTbPawtrackers()
        {
            try
            {
                return await _context.TbPawtrackers.ToListAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }
        #endregion

        #region TbPawtrackerById
        [HttpGet("{id}")]
        public async Task<ActionResult<TbPawtracker>> GetTbPawtracker(int id)
        {
            var objTbPawtracker = new TbPawtracker();
            try
            {
                objTbPawtracker = await _context.TbPawtrackers.Where(d => d.Id == id).FirstOrDefaultAsync();

                if (objTbPawtracker == null)
                {
                    return StatusCode(404, "Data not found.");
                }

                return objTbPawtracker;
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }
        #endregion

        #region TbPawtrackerUpdate 
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTbPawtracker(int id, TbPawtracker objTbPawtracker)
        {

            if (id != objTbPawtracker.Id)
            {
                return StatusCode(404, "Data not found.");
            }

            _context.Entry(objTbPawtracker).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
            return StatusCode(200, objTbPawtracker);
        }

        #endregion

        #region TbPawtrackerCreate
        [HttpPost]
        public async Task<ActionResult<TbPawtracker>> CreateTbPawtracker(TbPawtracker objTbPawtracker)
        {
            _context.TbPawtrackers.Add(objTbPawtracker);
            try
            {
                await _context.SaveChangesAsync();
                return StatusCode(200, objTbPawtracker);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }

        #endregion

        #region TbPawtrackerDelete
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTbPawtracker(int id)
        {
            var objTbPawtracker = await _context.TbPawtrackers.FindAsync(id);
            if (objTbPawtracker == null)
            {
                return StatusCode(404, "Data not found");
            }

            _context.TbPawtrackers.Remove(objTbPawtracker);
            await _context.SaveChangesAsync();

            return StatusCode(200, true);
        }

        #endregion

    }
}
