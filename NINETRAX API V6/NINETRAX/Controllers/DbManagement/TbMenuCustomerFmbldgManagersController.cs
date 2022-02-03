

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
    public class TbMenuCustomerFmbldgManagersController : Controller
    {

        #region Variables
        private readonly IWebHostEnvironment _heSrv;
        private readonly EntityContext _context;
        private readonly IRawQueryRepo<TbMenuCustomerFmbldgManager> _TbMenuCustomerFmbldgManagerContext;
        private readonly IRawQueryRepo<TbMenuCustomerFmbldgManagersView> _getTbMenuCustomerFmbldgManagersView;
        private readonly IRawQueryRepo<TotalRecordCountGLB> _getTotalRecordCountGLB;
        private readonly IRawQueryRepo<Object> _getAllByLike;
        #endregion

        #region Constructor
        public TbMenuCustomerFmbldgManagersController(
            IWebHostEnvironment heSrv,
            EntityContext context,
            IRawQueryRepo<TbMenuCustomerFmbldgManager> TbMenuCustomerFmbldgManagerContext,
            IRawQueryRepo<TbMenuCustomerFmbldgManagersView> getTbMenuCustomerFmbldgManagersView,
            IRawQueryRepo<TotalRecordCountGLB> getTotalRecordCountGLB,
            IRawQueryRepo<Object> getAllByLike
        )
        {
            _TbMenuCustomerFmbldgManagerContext = TbMenuCustomerFmbldgManagerContext;
            _heSrv = heSrv;
            _context = context;
            _getTbMenuCustomerFmbldgManagersView = getTbMenuCustomerFmbldgManagersView;
            _getTotalRecordCountGLB = getTotalRecordCountGLB;
            _getAllByLike = getAllByLike;
        }
        #endregion

        #region GetTbMenuCustomerFmbldgManagerView
        [HttpPost("GetTbMenuCustomerFmbldgManagersView")]
        public async Task<ActionResult<DatatableResponseGLB>> GetTbMenuCustomerFmbldgManagersView(DatatableGLB datatableGLB)
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
                var dataGrid = await _getTbMenuCustomerFmbldgManagersView.GetAllByWhere(new GetAllByWhereGLB()
                {
                    TableOrViewName = "TbMenuCustomerFmbldgManagersView",
                    SortColumn = sortInformation,
                    WhereConditions = whereConditionStatement,
                    LimitStart = datatableGLB.start,
                    LimitEnd = rowSize
                });

                var dataGridCount = await _getTotalRecordCountGLB.CountAllByWhere(new CountAllByWhereGLB()
                {
                    TableOrViewName = "TbMenuCustomerFmbldgManagersView",
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

        #region GetTbMenuCustomerFmbldgManagerAutoCompletion
        [HttpGet("GetTbMenuCustomerFmbldgManagerAutoCompletion")]
        public async Task<ActionResult<IEnumerable<object>>> GetTbMenuCustomerFmbldgManagerAutoCompleteSuggestion(string column, string value)
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
                    TableOrViewName = "TbMenuCustomerFmbldgManagersView"
                });

                #endregion database query code
                return Ok(autoSuggestions);
            }
            #endregion Call Repository Function
            return Ok();
        }
        #endregion

        #region GetTbMenuCustomerFmbldgManagers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TbMenuCustomerFmbldgManager>>> GetTbMenuCustomerFmbldgManagers()
        {
            try
            {
                return await _context.TbMenuCustomerFmbldgManagers.ToListAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }
        #endregion

        #region TbMenuCustomerFmbldgManagerById
        [HttpGet("{id}")]
        public async Task<ActionResult<TbMenuCustomerFmbldgManager>> GetTbMenuCustomerFmbldgManager(int id)
        {
            var objTbMenuCustomerFmbldgManager = new TbMenuCustomerFmbldgManager();
            try
            {
                objTbMenuCustomerFmbldgManager = await _context.TbMenuCustomerFmbldgManagers.Where(d => d.Id == id).FirstOrDefaultAsync();

                if (objTbMenuCustomerFmbldgManager == null)
                {
                    return StatusCode(404, "Data not found.");
                }

                return objTbMenuCustomerFmbldgManager;
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }
        #endregion

        #region TbMenuCustomerFmbldgManagerUpdate 
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTbMenuCustomerFmbldgManager(int id, TbMenuCustomerFmbldgManager objTbMenuCustomerFmbldgManager)
        {

            if (id != objTbMenuCustomerFmbldgManager.Id)
            {
                return StatusCode(404, "Data not found.");
            }

            _context.Entry(objTbMenuCustomerFmbldgManager).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
            return StatusCode(200, objTbMenuCustomerFmbldgManager);
        }

        #endregion

        #region TbMenuCustomerFmbldgManagerCreate
        [HttpPost]
        public async Task<ActionResult<TbMenuCustomerFmbldgManager>> CreateTbMenuCustomerFmbldgManager(TbMenuCustomerFmbldgManager objTbMenuCustomerFmbldgManager)
        {
            _context.TbMenuCustomerFmbldgManagers.Add(objTbMenuCustomerFmbldgManager);
            try
            {
                await _context.SaveChangesAsync();
                return StatusCode(200, objTbMenuCustomerFmbldgManager);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }

        #endregion

        #region TbMenuCustomerFmbldgManagerDelete
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTbMenuCustomerFmbldgManager(int id)
        {
            var objTbMenuCustomerFmbldgManager = await _context.TbMenuCustomerFmbldgManagers.FindAsync(id);
            if (objTbMenuCustomerFmbldgManager == null)
            {
                return StatusCode(404, "Data not found");
            }

            _context.TbMenuCustomerFmbldgManagers.Remove(objTbMenuCustomerFmbldgManager);
            await _context.SaveChangesAsync();

            return StatusCode(200, true);
        }

        #endregion

    }
}
