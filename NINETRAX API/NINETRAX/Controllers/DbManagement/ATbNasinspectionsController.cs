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
    public class ATbNasinspectionsController : Controller
    {

        #region Variables
        private readonly IWebHostEnvironment _heSrv;
        private readonly EntityContext _context;
        private readonly IRawQueryRepo<ATbNasinspection> _ATbNasinspectionContext;
        private readonly IRawQueryRepo<ATbNasinspectionsView> _getATbNasinspectionsView;
        private readonly IRawQueryRepo<TotalRecordCountGLB> _getTotalRecordCountGLB;
        private readonly IRawQueryRepo<Object> _getAllByLike;
        #endregion

        #region Constructor
        public ATbNasinspectionsController(
            IWebHostEnvironment heSrv,
            EntityContext context,
            IRawQueryRepo<ATbNasinspection> ATbNasinspectionContext,
            IRawQueryRepo<ATbNasinspectionsView> getATbNasinspectionsView,
            IRawQueryRepo<TotalRecordCountGLB> getTotalRecordCountGLB,
            IRawQueryRepo<Object> getAllByLike
        )
        {
            _ATbNasinspectionContext = ATbNasinspectionContext;
            _heSrv = heSrv;
            _context = context;
            _getATbNasinspectionsView = getATbNasinspectionsView;
            _getTotalRecordCountGLB = getTotalRecordCountGLB;
            _getAllByLike = getAllByLike;
        }
        #endregion

        #region GetATbNasinspectionView
        [HttpPost("GetATbNasinspectionsView")]
        public async Task<ActionResult<DatatableResponseGLB>> GetATbNasinspectionsView(DatatableGLB datatableGLB)
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
                var dataGrid = await _getATbNasinspectionsView.GetAllByWhere(new GetAllByWhereGLB()
                {
                    TableOrViewName = "ATbNasinspectionsView",
                    SortColumn = sortInformation,
                    WhereConditions = whereConditionStatement,
                    LimitStart = datatableGLB.start,
                    LimitEnd = rowSize
                });

                var dataGridCount = await _getTotalRecordCountGLB.CountAllByWhere(new CountAllByWhereGLB()
                {
                    TableOrViewName = "ATbNasinspectionsView",
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

        #region GetATbNasinspectionAutoCompletion
        [HttpGet("GetATbNasinspectionAutoCompletion")]
        public async Task<ActionResult<IEnumerable<object>>> GetATbNasinspectionAutoCompleteSuggestion(string column, string value)
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
                    TableOrViewName = "ATbNasinspectionsView"
                });

                #endregion database query code
                return Ok(autoSuggestions);
            }
            #endregion Call Repository Function
            return Ok();
        }
        #endregion

        #region GetATbNasinspections
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ATbNasinspection>>> GetATbNasinspections()
        {
            try
            {
                return await _context.ATbNasinspections.ToListAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }
        #endregion

        #region ATbNasinspectionById
        [HttpGet("{id}")]
        public async Task<ActionResult<ATbNasinspection>> GetATbNasinspection(int id)
        {
            var objATbNasinspection = new ATbNasinspection();
            try
            {
                objATbNasinspection = await _context.ATbNasinspections.Where(d => d.Id == id).FirstOrDefaultAsync();

                if (objATbNasinspection == null)
                {
                    return StatusCode(404, "Data not found.");
                }

                return objATbNasinspection;
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }
        #endregion

        #region ATbNasinspectionUpdate 
        [HttpPut("{id}")]
        public async Task<IActionResult> PutATbNasinspection(int id, ATbNasinspection objATbNasinspection)
        {

            if (id != objATbNasinspection.Id)
            {
                return StatusCode(404, "Data not found.");
            }

            _context.Entry(objATbNasinspection).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
            return StatusCode(200, objATbNasinspection);
        }

        #endregion

        #region ATbNasinspectionCreate
        [HttpPost]
        public async Task<ActionResult<ATbNasinspection>> CreateATbNasinspection(ATbNasinspection objATbNasinspection)
        {
            _context.ATbNasinspections.Add(objATbNasinspection);
            try
            {
                await _context.SaveChangesAsync();
                return StatusCode(200, objATbNasinspection);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }

        #endregion

        #region ATbNasinspectionDelete
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteATbNasinspection(int id)
        {
            var objATbNasinspection = await _context.ATbNasinspections.FindAsync(id);
            if (objATbNasinspection == null)
            {
                return StatusCode(404, "Data not found");
            }

            _context.ATbNasinspections.Remove(objATbNasinspection);
            await _context.SaveChangesAsync();

            return StatusCode(200, true);
        }

        #endregion

    }
}
