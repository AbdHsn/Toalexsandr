

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
    public class TbMenuInspectionPdrstatussController : Controller
    {

        #region Variables
        private readonly IWebHostEnvironment _heSrv;
        private readonly EntityContext _context;
        private readonly IRawQueryRepo<TbMenuInspectionPdrstatus> _TbMenuInspectionPdrstatusContext;
        private readonly IRawQueryRepo<TbMenuInspectionPdrstatussView> _getTbMenuInspectionPdrstatussView;
        private readonly IRawQueryRepo<TotalRecordCountGLB> _getTotalRecordCountGLB;
        private readonly IRawQueryRepo<Object> _getAllByLike;
        #endregion

        #region Constructor
        public TbMenuInspectionPdrstatussController(
            IWebHostEnvironment heSrv,
            EntityContext context,
            IRawQueryRepo<TbMenuInspectionPdrstatus> TbMenuInspectionPdrstatusContext,
            IRawQueryRepo<TbMenuInspectionPdrstatussView> getTbMenuInspectionPdrstatussView,
            IRawQueryRepo<TotalRecordCountGLB> getTotalRecordCountGLB,
            IRawQueryRepo<Object> getAllByLike
        )
        {
            _TbMenuInspectionPdrstatusContext = TbMenuInspectionPdrstatusContext;
            _heSrv = heSrv;
            _context = context;
            _getTbMenuInspectionPdrstatussView = getTbMenuInspectionPdrstatussView;
            _getTotalRecordCountGLB = getTotalRecordCountGLB;
            _getAllByLike = getAllByLike;
        }
        #endregion

        #region GetTbMenuInspectionPdrstatusView
        [HttpPost("GetTbMenuInspectionPdrstatussView")]
        public async Task<ActionResult<DatatableResponseGLB>> GetTbMenuInspectionPdrstatussView(DatatableGLB datatableGLB)
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
                var dataGrid = await _getTbMenuInspectionPdrstatussView.GetAllByWhere(new GetAllByWhereGLB()
                {
                    TableOrViewName = "TbMenuInspectionPdrstatussView",
                    SortColumn = sortInformation,
                    WhereConditions = whereConditionStatement,
                    LimitStart = datatableGLB.start,
                    LimitEnd = rowSize
                });

                var dataGridCount = await _getTotalRecordCountGLB.CountAllByWhere(new CountAllByWhereGLB()
                {
                    TableOrViewName = "TbMenuInspectionPdrstatussView",
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

        #region GetTbMenuInspectionPdrstatusAutoCompletion
        [HttpGet("GetTbMenuInspectionPdrstatusAutoCompletion")]
        public async Task<ActionResult<IEnumerable<object>>> GetTbMenuInspectionPdrstatusAutoCompleteSuggestion(string column, string value)
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
                    TableOrViewName = "TbMenuInspectionPdrstatussView"
                });

                #endregion database query code
                return Ok(autoSuggestions);
            }
            #endregion Call Repository Function
            return Ok();
        }
        #endregion

        #region GetTbMenuInspectionPdrstatuss
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TbMenuInspectionPdrstatus>>> GetTbMenuInspectionPdrstatuss()
        {
            try
            {
                return await _context.TbMenuInspectionPdrstatuses.ToListAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }
        #endregion

        #region TbMenuInspectionPdrstatusById
        [HttpGet("{id}")]
        public async Task<ActionResult<TbMenuInspectionPdrstatus>> GetTbMenuInspectionPdrstatus(int id)
        {
            var objTbMenuInspectionPdrstatus = new TbMenuInspectionPdrstatus();
            try
            {
                objTbMenuInspectionPdrstatus = await _context.TbMenuInspectionPdrstatuses.Where(d => d.Id == id).FirstOrDefaultAsync();

                if (objTbMenuInspectionPdrstatus == null)
                {
                    return StatusCode(404, "Data not found.");
                }

                return objTbMenuInspectionPdrstatus;
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }
        #endregion

        #region TbMenuInspectionPdrstatusUpdate 
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTbMenuInspectionPdrstatus(int id, TbMenuInspectionPdrstatus objTbMenuInspectionPdrstatus)
        {

            if (id != objTbMenuInspectionPdrstatus.Id)
            {
                return StatusCode(404, "Data not found.");
            }

            _context.Entry(objTbMenuInspectionPdrstatus).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
            return StatusCode(200, objTbMenuInspectionPdrstatus);
        }

        #endregion

        #region TbMenuInspectionPdrstatusCreate
        [HttpPost]
        public async Task<ActionResult<TbMenuInspectionPdrstatus>> CreateTbMenuInspectionPdrstatus(TbMenuInspectionPdrstatus objTbMenuInspectionPdrstatus)
        {
            _context.TbMenuInspectionPdrstatuses.Add(objTbMenuInspectionPdrstatus);
            try
            {
                await _context.SaveChangesAsync();
                return StatusCode(200, objTbMenuInspectionPdrstatus);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }

        #endregion

        #region TbMenuInspectionPdrstatusDelete
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTbMenuInspectionPdrstatus(int id)
        {
            var objTbMenuInspectionPdrstatus = await _context.TbMenuInspectionPdrstatuses.FindAsync(id);
            if (objTbMenuInspectionPdrstatus == null)
            {
                return StatusCode(404, "Data not found");
            }

            _context.TbMenuInspectionPdrstatuses.Remove(objTbMenuInspectionPdrstatus);
            await _context.SaveChangesAsync();

            return StatusCode(200, true);
        }

        #endregion

    }
}
