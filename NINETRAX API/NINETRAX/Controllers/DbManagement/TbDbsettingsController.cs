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
    public class TbDbsettingsController : Controller
    {

        #region Variables
        private readonly IWebHostEnvironment _heSrv;
        private readonly EntityContext _context;
        private readonly IRawQueryRepo<TbDbsetting> _TbDbsettingContext;
        private readonly IRawQueryRepo<TbDbsettingsView> _getTbDbsettingsView;
        private readonly IRawQueryRepo<TotalRecordCountGLB> _getTotalRecordCountGLB;
        private readonly IRawQueryRepo<Object> _getAllByLike;
        #endregion

        #region Constructor
        public TbDbsettingsController(
            IWebHostEnvironment heSrv,
            EntityContext context,
            IRawQueryRepo<TbDbsetting> TbDbsettingContext,
            IRawQueryRepo<TbDbsettingsView> getTbDbsettingsView,
            IRawQueryRepo<TotalRecordCountGLB> getTotalRecordCountGLB,
            IRawQueryRepo<Object> getAllByLike
        )
        {
            _TbDbsettingContext = TbDbsettingContext;
            _heSrv = heSrv;
            _context = context;
            _getTbDbsettingsView = getTbDbsettingsView;
            _getTotalRecordCountGLB = getTotalRecordCountGLB;
            _getAllByLike = getAllByLike;
        }
        #endregion

        #region GetTbDbsettingView
        [HttpPost("GetTbDbsettingsView")]
        public async Task<ActionResult<DatatableResponseGLB>> GetTbDbsettingsView(DatatableGLB datatableGLB)
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
                var dataGrid = await _getTbDbsettingsView.GetAllByWhere(new GetAllByWhereGLB()
                {
                    TableOrViewName = "TbDbsettingsView",
                    SortColumn = sortInformation,
                    WhereConditions = whereConditionStatement,
                    LimitStart = datatableGLB.start,
                    LimitEnd = rowSize
                });

                var dataGridCount = await _getTotalRecordCountGLB.CountAllByWhere(new CountAllByWhereGLB()
                {
                    TableOrViewName = "TbDbsettingsView",
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

        #region GetTbDbsettingAutoCompletion
        [HttpGet("GetTbDbsettingAutoCompletion")]
        public async Task<ActionResult<IEnumerable<object>>> GetTbDbsettingAutoCompleteSuggestion(string column, string value)
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
                    TableOrViewName = "TbDbsettingsView"
                });

                #endregion database query code
                return Ok(autoSuggestions);
            }
            #endregion Call Repository Function
            return Ok();
        }
        #endregion

        #region GetTbDbsettings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TbDbsetting>>> GetTbDbsettings()
        {
            try
            {
                return await _context.TbDbsettings.ToListAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }
        #endregion

        #region TbDbsettingById
        [HttpGet("{id}")]
        public async Task<ActionResult<TbDbsetting>> GetTbDbsetting(int id)
        {
            var objTbDbsetting = new TbDbsetting();
            try
            {
                objTbDbsetting = await _context.TbDbsettings.Where(d => d.Id == id).FirstOrDefaultAsync();

                if (objTbDbsetting == null)
                {
                    return StatusCode(404, "Data not found.");
                }

                return objTbDbsetting;
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }
        #endregion

        #region TbDbsettingUpdate 
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTbDbsetting(int id, TbDbsetting objTbDbsetting)
        {

            if (id != objTbDbsetting.Id)
            {
                return StatusCode(404, "Data not found.");
            }

            _context.Entry(objTbDbsetting).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
            return StatusCode(200, objTbDbsetting);
        }

        #endregion

        #region TbDbsettingCreate
        [HttpPost]
        public async Task<ActionResult<TbDbsetting>> CreateTbDbsetting(TbDbsetting objTbDbsetting)
        {
            _context.TbDbsettings.Add(objTbDbsetting);
            try
            {
                await _context.SaveChangesAsync();
                return StatusCode(200, objTbDbsetting);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }

        #endregion

        #region TbDbsettingDelete
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTbDbsetting(int id)
        {
            var objTbDbsetting = await _context.TbDbsettings.FindAsync(id);
            if (objTbDbsetting == null)
            {
                return StatusCode(404, "Data not found");
            }

            _context.TbDbsettings.Remove(objTbDbsetting);
            await _context.SaveChangesAsync();

            return StatusCode(200, true);
        }

        #endregion

    }
}
