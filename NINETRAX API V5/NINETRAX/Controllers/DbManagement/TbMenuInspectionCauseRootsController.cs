

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
    public class TbMenuInspectionCauseRootsController : Controller
    {

        #region Variables
        private readonly IWebHostEnvironment _heSrv;
        private readonly EntityContext _context;
        private readonly IRawQueryRepo<TbMenuInspectionCauseRoot> _TbMenuInspectionCauseRootContext;
        private readonly IRawQueryRepo<TbMenuInspectionCauseRootsView> _getTbMenuInspectionCauseRootsView;
        private readonly IRawQueryRepo<TotalRecordCountGLB> _getTotalRecordCountGLB;
        private readonly IRawQueryRepo<Object> _getAllByLike;
        #endregion

        #region Constructor
        public TbMenuInspectionCauseRootsController(
            IWebHostEnvironment heSrv,
            EntityContext context,
            IRawQueryRepo<TbMenuInspectionCauseRoot> TbMenuInspectionCauseRootContext,
            IRawQueryRepo<TbMenuInspectionCauseRootsView> getTbMenuInspectionCauseRootsView,
            IRawQueryRepo<TotalRecordCountGLB> getTotalRecordCountGLB,
            IRawQueryRepo<Object> getAllByLike
        )
        {
            _TbMenuInspectionCauseRootContext = TbMenuInspectionCauseRootContext;
            _heSrv = heSrv;
            _context = context;
            _getTbMenuInspectionCauseRootsView = getTbMenuInspectionCauseRootsView;
            _getTotalRecordCountGLB = getTotalRecordCountGLB;
            _getAllByLike = getAllByLike;
        }
        #endregion

        #region GetTbMenuInspectionCauseRootView
        [HttpPost("GetTbMenuInspectionCauseRootsView")]
        public async Task<ActionResult<DatatableResponseGLB>> GetTbMenuInspectionCauseRootsView(DatatableGLB datatableGLB)
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
                var dataGrid = await _getTbMenuInspectionCauseRootsView.GetAllByWhere(new GetAllByWhereGLB()
                {
                    TableOrViewName = "TbMenuInspectionCauseRootsView",
                    SortColumn = sortInformation,
                    WhereConditions = whereConditionStatement,
                    LimitStart = datatableGLB.start,
                    LimitEnd = rowSize
                });

                var dataGridCount = await _getTotalRecordCountGLB.CountAllByWhere(new CountAllByWhereGLB()
                {
                    TableOrViewName = "TbMenuInspectionCauseRootsView",
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

        #region GetTbMenuInspectionCauseRootAutoCompletion
        [HttpGet("GetTbMenuInspectionCauseRootAutoCompletion")]
        public async Task<ActionResult<IEnumerable<object>>> GetTbMenuInspectionCauseRootAutoCompleteSuggestion(string column, string value)
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
                    TableOrViewName = "TbMenuInspectionCauseRootsView"
                });

                #endregion database query code
                return Ok(autoSuggestions);
            }
            #endregion Call Repository Function
            return Ok();
        }
        #endregion

        #region GetTbMenuInspectionCauseRoots
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TbMenuInspectionCauseRoot>>> GetTbMenuInspectionCauseRoots()
        {
            try
            {
                return await _context.TbMenuInspectionCauseRoots.ToListAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }
        #endregion

        #region TbMenuInspectionCauseRootById
        [HttpGet("{id}")]
        public async Task<ActionResult<TbMenuInspectionCauseRoot>> GetTbMenuInspectionCauseRoot(int id)
        {
            var objTbMenuInspectionCauseRoot = new TbMenuInspectionCauseRoot();
            try
            {
                objTbMenuInspectionCauseRoot = await _context.TbMenuInspectionCauseRoots.Where(d => d.Id == id).FirstOrDefaultAsync();

                if (objTbMenuInspectionCauseRoot == null)
                {
                    return StatusCode(404, "Data not found.");
                }

                return objTbMenuInspectionCauseRoot;
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }
        #endregion

        #region TbMenuInspectionCauseRootUpdate 
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTbMenuInspectionCauseRoot(int id, TbMenuInspectionCauseRoot objTbMenuInspectionCauseRoot)
        {

            if (id != objTbMenuInspectionCauseRoot.Id)
            {
                return StatusCode(404, "Data not found.");
            }

            _context.Entry(objTbMenuInspectionCauseRoot).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
            return StatusCode(200, objTbMenuInspectionCauseRoot);
        }

        #endregion

        #region TbMenuInspectionCauseRootCreate
        [HttpPost]
        public async Task<ActionResult<TbMenuInspectionCauseRoot>> CreateTbMenuInspectionCauseRoot(TbMenuInspectionCauseRoot objTbMenuInspectionCauseRoot)
        {
            _context.TbMenuInspectionCauseRoots.Add(objTbMenuInspectionCauseRoot);
            try
            {
                await _context.SaveChangesAsync();
                return StatusCode(200, objTbMenuInspectionCauseRoot);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }

        #endregion

        #region TbMenuInspectionCauseRootDelete
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTbMenuInspectionCauseRoot(int id)
        {
            var objTbMenuInspectionCauseRoot = await _context.TbMenuInspectionCauseRoots.FindAsync(id);
            if (objTbMenuInspectionCauseRoot == null)
            {
                return StatusCode(404, "Data not found");
            }

            _context.TbMenuInspectionCauseRoots.Remove(objTbMenuInspectionCauseRoot);
            await _context.SaveChangesAsync();

            return StatusCode(200, true);
        }

        #endregion

    }
}
