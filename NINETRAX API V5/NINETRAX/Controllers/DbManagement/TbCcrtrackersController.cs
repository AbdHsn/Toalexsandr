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
    public class TbCcrtrackersController : Controller
    {

        #region Variables
        private readonly IWebHostEnvironment _heSrv;
        private readonly EntityContext _context;
        private readonly IRawQueryRepo<TbCcrtracker> _TbCcrtrackerContext;
        private readonly IRawQueryRepo<TbCcrtrackersView> _getTbCcrtrackersView;
        private readonly IRawQueryRepo<TotalRecordCountGLB> _getTotalRecordCountGLB;
        private readonly IRawQueryRepo<Object> _getAllByLike;
        #endregion

        #region Constructor
        public TbCcrtrackersController(
            IWebHostEnvironment heSrv,
            EntityContext context,
            IRawQueryRepo<TbCcrtracker> TbCcrtrackerContext,
            IRawQueryRepo<TbCcrtrackersView> getTbCcrtrackersView,
            IRawQueryRepo<TotalRecordCountGLB> getTotalRecordCountGLB,
            IRawQueryRepo<Object> getAllByLike
        )
        {
            _TbCcrtrackerContext = TbCcrtrackerContext;
            _heSrv = heSrv;
            _context = context;
            _getTbCcrtrackersView = getTbCcrtrackersView;
            _getTotalRecordCountGLB = getTotalRecordCountGLB;
            _getAllByLike = getAllByLike;
        }
        #endregion

        #region GetTbCcrtrackerView
        [HttpPost("GetTbCcrtrackersView")]
        public async Task<ActionResult<DatatableResponseGLB>> GetTbCcrtrackersView(DatatableGLB datatableGLB)
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
                var dataGrid = await _getTbCcrtrackersView.GetAllByWhere(new GetAllByWhereGLB()
                {
                    TableOrViewName = "TbCcrtrackersView",
                    SortColumn = sortInformation,
                    WhereConditions = whereConditionStatement,
                    LimitStart = datatableGLB.start,
                    LimitEnd = rowSize
                });

                var dataGridCount = await _getTotalRecordCountGLB.CountAllByWhere(new CountAllByWhereGLB()
                {
                    TableOrViewName = "TbCcrtrackersView",
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

        #region GetTbCcrtrackerAutoCompletion
        [HttpGet("GetTbCcrtrackerAutoCompletion")]
        public async Task<ActionResult<IEnumerable<object>>> GetTbCcrtrackerAutoCompleteSuggestion(string column, string value)
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
                    TableOrViewName = "TbCcrtrackersView"
                });

                #endregion database query code
                return Ok(autoSuggestions);
            }
            #endregion Call Repository Function
            return Ok();
        }
        #endregion

        #region GetTbCcrtrackers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TbCcrtracker>>> GetTbCcrtrackers()
        {
            try
            {
                return await _context.TbCcrtrackers.ToListAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }
        #endregion

        #region TbCcrtrackerById
        [HttpGet("{id}")]
        public async Task<ActionResult<TbCcrtracker>> GetTbCcrtracker(int id)
        {
            var objTbCcrtracker = new TbCcrtracker();
            try
            {
                objTbCcrtracker = await _context.TbCcrtrackers.Where(d => d.Id == id).FirstOrDefaultAsync();

                if (objTbCcrtracker == null)
                {
                    return StatusCode(404, "Data not found.");
                }

                return objTbCcrtracker;
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }
        #endregion

        #region TbCcrtrackerUpdate 
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTbCcrtracker(int id, TbCcrtracker objTbCcrtracker)
        {

            if (id != objTbCcrtracker.Id)
            {
                return StatusCode(404, "Data not found.");
            }

            _context.Entry(objTbCcrtracker).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
            return StatusCode(200, objTbCcrtracker);
        }

        #endregion

        #region TbCcrtrackerCreate
        [HttpPost]
        public async Task<ActionResult<TbCcrtracker>> CreateTbCcrtracker(TbCcrtracker objTbCcrtracker)
        {
            _context.TbCcrtrackers.Add(objTbCcrtracker);
            try
            {
                await _context.SaveChangesAsync();
                return StatusCode(200, objTbCcrtracker);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }

        #endregion

        #region TbCcrtrackerDelete
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTbCcrtracker(int id)
        {
            var objTbCcrtracker = await _context.TbCcrtrackers.FindAsync(id);
            if (objTbCcrtracker == null)
            {
                return StatusCode(404, "Data not found");
            }

            _context.TbCcrtrackers.Remove(objTbCcrtracker);
            await _context.SaveChangesAsync();

            return StatusCode(200, true);
        }

        #endregion

    }
}
