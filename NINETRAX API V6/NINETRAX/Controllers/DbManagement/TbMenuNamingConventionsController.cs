

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
    public class TbMenuNamingConventionsController : Controller
    {

        #region Variables
        private readonly IWebHostEnvironment _heSrv;
        private readonly EntityContext _context;
        private readonly IRawQueryRepo<TbMenuNamingConvention> _TbMenuNamingConventionContext;
        private readonly IRawQueryRepo<MenuNamingConventionView> _getTbMenuNamingConventionsView;
        private readonly IRawQueryRepo<TotalRecordCountGLB> _getTotalRecordCountGLB;
        private readonly IRawQueryRepo<Object> _getAllByLike;
        #endregion

        #region Constructor
        public TbMenuNamingConventionsController(
            IWebHostEnvironment heSrv,
            EntityContext context,
            IRawQueryRepo<TbMenuNamingConvention> TbMenuNamingConventionContext,
            IRawQueryRepo<MenuNamingConventionView> getTbMenuNamingConventionsView,
            IRawQueryRepo<TotalRecordCountGLB> getTotalRecordCountGLB,
            IRawQueryRepo<Object> getAllByLike
        )
        {
            _TbMenuNamingConventionContext = TbMenuNamingConventionContext;
            _heSrv = heSrv;
            _context = context;
            _getTbMenuNamingConventionsView = getTbMenuNamingConventionsView;
            _getTotalRecordCountGLB = getTotalRecordCountGLB;
            _getAllByLike = getAllByLike;
        }
        #endregion

        #region GetTbMenuNamingConventionView
        [HttpPost("GetTbMenuNamingConventionsView")]
        public async Task<ActionResult<DatatableResponseGLB>> GetTbMenuNamingConventionsView(DatatableGLB datatableGLB)
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
                var dataGrid = await _getTbMenuNamingConventionsView.GetAllByWhere(new GetAllByWhereGLB()
                {
                    TableOrViewName = "MenuNamingConventionView",
                    SortColumn = sortInformation,
                    WhereConditions = whereConditionStatement,
                    LimitStart = datatableGLB.start,
                    LimitEnd = rowSize
                });

                var dataGridCount = await _getTotalRecordCountGLB.CountAllByWhere(new CountAllByWhereGLB()
                {
                    TableOrViewName = "MenuNamingConventionView",
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

        #region GetTbMenuNamingConventionAutoCompletion
        [HttpGet("GetTbMenuNamingConventionAutoCompletion")]
        public async Task<ActionResult<IEnumerable<object>>> GetTbMenuNamingConventionAutoCompleteSuggestion(string column, string value)
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
                    TableOrViewName = "MenuNamingConventionView"
                });

                #endregion database query code
                return Ok(autoSuggestions);
            }
            #endregion Call Repository Function
            return Ok();
        }
        #endregion

        #region GetTbMenuNamingConventions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TbMenuNamingConvention>>> GetTbMenuNamingConventions()
        {
            try
            {
                return await _context.TbMenuNamingConventions.ToListAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }
        #endregion

        #region TbMenuNamingConventionById
        [HttpGet("{id}")]
        public async Task<ActionResult<TbMenuNamingConvention>> GetTbMenuNamingConvention(int id)
        {
            var objTbMenuNamingConvention = new TbMenuNamingConvention();
            try
            {
                objTbMenuNamingConvention = await _context.TbMenuNamingConventions.Where(d => d.Id == id).FirstOrDefaultAsync();

                if (objTbMenuNamingConvention == null)
                {
                    return StatusCode(404, "Data not found.");
                }

                return objTbMenuNamingConvention;
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }
        #endregion

        #region TbMenuNamingConventionUpdate 
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTbMenuNamingConvention(int id, TbMenuNamingConvention objTbMenuNamingConvention)
        {

            if (id != objTbMenuNamingConvention.Id)
            {
                return StatusCode(404, "Data not found.");
            }

            _context.Entry(objTbMenuNamingConvention).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
            return StatusCode(200, objTbMenuNamingConvention);
        }

        #endregion

        #region TbMenuNamingConventionCreate
        [HttpPost]
        public async Task<ActionResult<TbMenuNamingConvention>> CreateTbMenuNamingConvention(TbMenuNamingConvention objTbMenuNamingConvention)
        {
            var getLast = await _context.TbMenuNamingConventions.OrderByDescending(d => d.Id).AsNoTracking().FirstOrDefaultAsync();
            if (getLast == null)
                objTbMenuNamingConvention.Id = 1;
            else
                objTbMenuNamingConvention.Id = getLast.Id + 1;

            _context.TbMenuNamingConventions.Add(objTbMenuNamingConvention);
            try
            {
                await _context.SaveChangesAsync();

                if (objTbMenuNamingConvention.Id > 0)
                    return StatusCode(200, objTbMenuNamingConvention);
                else return StatusCode(500, "Failed to create data.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }

        #endregion

        #region TbMenuNamingConventionDelete
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTbMenuNamingConvention(int id)
        {
            try
            {
                var obj = await _context.TbMenuNamingConventions.FindAsync(id);
                if (obj == null)
                {
                    return StatusCode(404, "Data not found");
                }

                _context.TbMenuNamingConventions.Remove(obj);
                await _context.SaveChangesAsync();

                return StatusCode(200, true);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }

        #endregion

    }
}
