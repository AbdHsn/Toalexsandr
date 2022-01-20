

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
    public class TbMenuInspectionCauseCorrectiveActionsController : Controller
    {

        #region Variables
        private readonly IWebHostEnvironment _heSrv;
        private readonly EntityContext _context;
        private readonly IRawQueryRepo<TbMenuInspectionCauseCorrectiveAction> _TbMenuInspectionCauseCorrectiveActionContext;
        private readonly IRawQueryRepo<TbMenuInspectionCauseCorrectiveActionsView> _getTbMenuInspectionCauseCorrectiveActionsView;
        private readonly IRawQueryRepo<TotalRecordCountGLB> _getTotalRecordCountGLB;
        private readonly IRawQueryRepo<Object> _getAllByLike;
        #endregion

        #region Constructor
        public TbMenuInspectionCauseCorrectiveActionsController(
            IWebHostEnvironment heSrv,
            EntityContext context,
            IRawQueryRepo<TbMenuInspectionCauseCorrectiveAction> TbMenuInspectionCauseCorrectiveActionContext,
            IRawQueryRepo<TbMenuInspectionCauseCorrectiveActionsView> getTbMenuInspectionCauseCorrectiveActionsView,
            IRawQueryRepo<TotalRecordCountGLB> getTotalRecordCountGLB,
            IRawQueryRepo<Object> getAllByLike
        )
        {
            _TbMenuInspectionCauseCorrectiveActionContext = TbMenuInspectionCauseCorrectiveActionContext;
            _heSrv = heSrv;
            _context = context;
            _getTbMenuInspectionCauseCorrectiveActionsView = getTbMenuInspectionCauseCorrectiveActionsView;
            _getTotalRecordCountGLB = getTotalRecordCountGLB;
            _getAllByLike = getAllByLike;
        }
        #endregion

        #region GetTbMenuInspectionCauseCorrectiveActionView
        [HttpPost("GetTbMenuInspectionCauseCorrectiveActionsView")]
        public async Task<ActionResult<DatatableResponseGLB>> GetTbMenuInspectionCauseCorrectiveActionsView(DatatableGLB datatableGLB)
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
                var dataGrid = await _getTbMenuInspectionCauseCorrectiveActionsView.GetAllByWhere(new GetAllByWhereGLB()
                {
                    TableOrViewName = "TbMenuInspectionCauseCorrectiveActionsView",
                    SortColumn = sortInformation,
                    WhereConditions = whereConditionStatement,
                    LimitStart = datatableGLB.start,
                    LimitEnd = rowSize
                });

                var dataGridCount = await _getTotalRecordCountGLB.CountAllByWhere(new CountAllByWhereGLB()
                {
                    TableOrViewName = "TbMenuInspectionCauseCorrectiveActionsView",
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

        #region GetTbMenuInspectionCauseCorrectiveActionAutoCompletion
        [HttpGet("GetTbMenuInspectionCauseCorrectiveActionAutoCompletion")]
        public async Task<ActionResult<IEnumerable<object>>> GetTbMenuInspectionCauseCorrectiveActionAutoCompleteSuggestion(string column, string value)
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
                    TableOrViewName = "TbMenuInspectionCauseCorrectiveActionsView"
                });

                #endregion database query code
                return Ok(autoSuggestions);
            }
            #endregion Call Repository Function
            return Ok();
        }
        #endregion

        #region GetTbMenuInspectionCauseCorrectiveActions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TbMenuInspectionCauseCorrectiveAction>>> GetTbMenuInspectionCauseCorrectiveActions()
        {
            try
            {
                return await _context.TbMenuInspectionCauseCorrectiveActions.ToListAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }
        #endregion

        #region TbMenuInspectionCauseCorrectiveActionById
        [HttpGet("{id}")]
        public async Task<ActionResult<TbMenuInspectionCauseCorrectiveAction>> GetTbMenuInspectionCauseCorrectiveAction(int id)
        {
            var objTbMenuInspectionCauseCorrectiveAction = new TbMenuInspectionCauseCorrectiveAction();
            try
            {
                objTbMenuInspectionCauseCorrectiveAction = await _context.TbMenuInspectionCauseCorrectiveActions.Where(d => d.Id == id).FirstOrDefaultAsync();

                if (objTbMenuInspectionCauseCorrectiveAction == null)
                {
                    return StatusCode(404, "Data not found.");
                }

                return objTbMenuInspectionCauseCorrectiveAction;
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }
        #endregion

        #region TbMenuInspectionCauseCorrectiveActionUpdate 
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTbMenuInspectionCauseCorrectiveAction(int id, TbMenuInspectionCauseCorrectiveAction objTbMenuInspectionCauseCorrectiveAction)
        {

            if (id != objTbMenuInspectionCauseCorrectiveAction.Id)
            {
                return StatusCode(404, "Data not found.");
            }

            _context.Entry(objTbMenuInspectionCauseCorrectiveAction).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
            return StatusCode(200, objTbMenuInspectionCauseCorrectiveAction);
        }

        #endregion

        #region TbMenuInspectionCauseCorrectiveActionCreate
        [HttpPost]
        public async Task<ActionResult<TbMenuInspectionCauseCorrectiveAction>> CreateTbMenuInspectionCauseCorrectiveAction(TbMenuInspectionCauseCorrectiveAction objTbMenuInspectionCauseCorrectiveAction)
        {
            _context.TbMenuInspectionCauseCorrectiveActions.Add(objTbMenuInspectionCauseCorrectiveAction);
            try
            {
                await _context.SaveChangesAsync();
                return StatusCode(200, objTbMenuInspectionCauseCorrectiveAction);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }

        #endregion

        #region TbMenuInspectionCauseCorrectiveActionDelete
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTbMenuInspectionCauseCorrectiveAction(int id)
        {
            var objTbMenuInspectionCauseCorrectiveAction = await _context.TbMenuInspectionCauseCorrectiveActions.FindAsync(id);
            if (objTbMenuInspectionCauseCorrectiveAction == null)
            {
                return StatusCode(404, "Data not found");
            }

            _context.TbMenuInspectionCauseCorrectiveActions.Remove(objTbMenuInspectionCauseCorrectiveAction);
            await _context.SaveChangesAsync();

            return StatusCode(200, true);
        }

        #endregion

    }
}
