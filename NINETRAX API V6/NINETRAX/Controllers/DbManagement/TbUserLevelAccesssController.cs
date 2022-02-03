

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
    public class TbUserLevelAccesssController : Controller
    {

        #region Variables
        private readonly IWebHostEnvironment _heSrv;
        private readonly EntityContext _context;
        private readonly IRawQueryRepo<TbUserLevelAccess> _TbUserLevelAccessContext;
        private readonly IRawQueryRepo<TbUserLevelAccesssView> _getTbUserLevelAccesssView;
        private readonly IRawQueryRepo<TotalRecordCountGLB> _getTotalRecordCountGLB;
        private readonly IRawQueryRepo<Object> _getAllByLike;
        #endregion

        #region Constructor
        public TbUserLevelAccesssController(
            IWebHostEnvironment heSrv,
            EntityContext context,
            IRawQueryRepo<TbUserLevelAccess> TbUserLevelAccessContext,
            IRawQueryRepo<TbUserLevelAccesssView> getTbUserLevelAccesssView,
            IRawQueryRepo<TotalRecordCountGLB> getTotalRecordCountGLB,
            IRawQueryRepo<Object> getAllByLike
        )
        {
            _TbUserLevelAccessContext = TbUserLevelAccessContext;
            _heSrv = heSrv;
            _context = context;
            _getTbUserLevelAccesssView = getTbUserLevelAccesssView;
            _getTotalRecordCountGLB = getTotalRecordCountGLB;
            _getAllByLike = getAllByLike;
        }
        #endregion

        #region GetTbUserLevelAccessView
        [HttpPost("GetTbUserLevelAccesssView")]
        public async Task<ActionResult<DatatableResponseGLB>> GetTbUserLevelAccesssView(DatatableGLB datatableGLB)
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
                var dataGrid = await _getTbUserLevelAccesssView.GetAllByWhere(new GetAllByWhereGLB()
                {
                    TableOrViewName = "TbUserLevelAccesssView",
                    SortColumn = sortInformation,
                    WhereConditions = whereConditionStatement,
                    LimitStart = datatableGLB.start,
                    LimitEnd = rowSize
                });

                var dataGridCount = await _getTotalRecordCountGLB.CountAllByWhere(new CountAllByWhereGLB()
                {
                    TableOrViewName = "TbUserLevelAccesssView",
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

        #region GetTbUserLevelAccessAutoCompletion
        [HttpGet("GetTbUserLevelAccessAutoCompletion")]
        public async Task<ActionResult<IEnumerable<object>>> GetTbUserLevelAccessAutoCompleteSuggestion(string column, string value)
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
                    TableOrViewName = "TbUserLevelAccesssView"
                });

                #endregion database query code
                return Ok(autoSuggestions);
            }
            #endregion Call Repository Function
            return Ok();
        }
        #endregion

        #region GetTbUserLevelAccesss
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TbUserLevelAccess>>> GetTbUserLevelAccesss()
        {
            try
            {
                return await _context.TbUserLevelAccesses.ToListAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }
        #endregion

        #region TbUserLevelAccessById
        [HttpGet("{id}")]
        public async Task<ActionResult<TbUserLevelAccess>> GetTbUserLevelAccess(int id)
        {
            var objTbUserLevelAccess = new TbUserLevelAccess();
            try
            {
                objTbUserLevelAccess = await _context.TbUserLevelAccesses.Where(d => d.Id == id).FirstOrDefaultAsync();

                if (objTbUserLevelAccess == null)
                {
                    return StatusCode(404, "Data not found.");
                }

                return objTbUserLevelAccess;
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }
        #endregion

        #region TbUserLevelAccessUpdate 
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTbUserLevelAccess(int id, TbUserLevelAccess objTbUserLevelAccess)
        {

            if (id != objTbUserLevelAccess.Id)
            {
                return StatusCode(404, "Data not found.");
            }

            _context.Entry(objTbUserLevelAccess).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
            return StatusCode(200, objTbUserLevelAccess);
        }

        #endregion

        #region TbUserLevelAccessCreate
        [HttpPost]
        public async Task<ActionResult<TbUserLevelAccess>> CreateTbUserLevelAccess(TbUserLevelAccess objTbUserLevelAccess)
        {
            _context.TbUserLevelAccesses.Add(objTbUserLevelAccess);
            try
            {
                await _context.SaveChangesAsync();
                return StatusCode(200, objTbUserLevelAccess);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }

        #endregion

        #region TbUserLevelAccessDelete
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTbUserLevelAccess(int id)
        {
            var objTbUserLevelAccess = await _context.TbUserLevelAccesses.FindAsync(id);
            if (objTbUserLevelAccess == null)
            {
                return StatusCode(404, "Data not found");
            }

            _context.TbUserLevelAccesses.Remove(objTbUserLevelAccess);
            await _context.SaveChangesAsync();

            return StatusCode(200, true);
        }

        #endregion

    }
}
