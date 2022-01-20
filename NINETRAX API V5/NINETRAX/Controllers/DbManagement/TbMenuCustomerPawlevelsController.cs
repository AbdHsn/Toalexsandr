

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
    public class TbMenuCustomerPawlevelsController : Controller
    {

        #region Variables
        private readonly IWebHostEnvironment _heSrv;
        private readonly EntityContext _context;
        private readonly IRawQueryRepo<TbMenuCustomerPawlevel> _TbMenuCustomerPawlevelContext;
        private readonly IRawQueryRepo<TbMenuCustomerPawlevelsView> _getTbMenuCustomerPawlevelsView;
        private readonly IRawQueryRepo<TotalRecordCountGLB> _getTotalRecordCountGLB;
        private readonly IRawQueryRepo<Object> _getAllByLike;
        #endregion

        #region Constructor
        public TbMenuCustomerPawlevelsController(
            IWebHostEnvironment heSrv,
            EntityContext context,
            IRawQueryRepo<TbMenuCustomerPawlevel> TbMenuCustomerPawlevelContext,
            IRawQueryRepo<TbMenuCustomerPawlevelsView> getTbMenuCustomerPawlevelsView,
            IRawQueryRepo<TotalRecordCountGLB> getTotalRecordCountGLB,
            IRawQueryRepo<Object> getAllByLike
        )
        {
            _TbMenuCustomerPawlevelContext = TbMenuCustomerPawlevelContext;
            _heSrv = heSrv;
            _context = context;
            _getTbMenuCustomerPawlevelsView = getTbMenuCustomerPawlevelsView;
            _getTotalRecordCountGLB = getTotalRecordCountGLB;
            _getAllByLike = getAllByLike;
        }
        #endregion

        #region GetTbMenuCustomerPawlevelView
        [HttpPost("GetTbMenuCustomerPawlevelsView")]
        public async Task<ActionResult<DatatableResponseGLB>> GetTbMenuCustomerPawlevelsView(DatatableGLB datatableGLB)
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
                var dataGrid = await _getTbMenuCustomerPawlevelsView.GetAllByWhere(new GetAllByWhereGLB()
                {
                    TableOrViewName = "TbMenuCustomerPawlevelsView",
                    SortColumn = sortInformation,
                    WhereConditions = whereConditionStatement,
                    LimitStart = datatableGLB.start,
                    LimitEnd = rowSize
                });

                var dataGridCount = await _getTotalRecordCountGLB.CountAllByWhere(new CountAllByWhereGLB()
                {
                    TableOrViewName = "TbMenuCustomerPawlevelsView",
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

        #region GetTbMenuCustomerPawlevelAutoCompletion
        [HttpGet("GetTbMenuCustomerPawlevelAutoCompletion")]
        public async Task<ActionResult<IEnumerable<object>>> GetTbMenuCustomerPawlevelAutoCompleteSuggestion(string column, string value)
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
                    TableOrViewName = "TbMenuCustomerPawlevelsView"
                });

                #endregion database query code
                return Ok(autoSuggestions);
            }
            #endregion Call Repository Function
            return Ok();
        }
        #endregion

        #region GetTbMenuCustomerPawlevels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TbMenuCustomerPawlevel>>> GetTbMenuCustomerPawlevels()
        {
            try
            {
                return await _context.TbMenuCustomerPawlevels.ToListAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }
        #endregion

        #region TbMenuCustomerPawlevelById
        [HttpGet("{id}")]
        public async Task<ActionResult<TbMenuCustomerPawlevel>> GetTbMenuCustomerPawlevel(int id)
        {
            var objTbMenuCustomerPawlevel = new TbMenuCustomerPawlevel();
            try
            {
                objTbMenuCustomerPawlevel = await _context.TbMenuCustomerPawlevels.Where(d => d.Id == id).FirstOrDefaultAsync();

                if (objTbMenuCustomerPawlevel == null)
                {
                    return StatusCode(404, "Data not found.");
                }

                return objTbMenuCustomerPawlevel;
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }
        #endregion

        #region TbMenuCustomerPawlevelUpdate 
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTbMenuCustomerPawlevel(int id, TbMenuCustomerPawlevel objTbMenuCustomerPawlevel)
        {

            if (id != objTbMenuCustomerPawlevel.Id)
            {
                return StatusCode(404, "Data not found.");
            }

            _context.Entry(objTbMenuCustomerPawlevel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
            return StatusCode(200, objTbMenuCustomerPawlevel);
        }

        #endregion

        #region TbMenuCustomerPawlevelCreate
        [HttpPost]
        public async Task<ActionResult<TbMenuCustomerPawlevel>> CreateTbMenuCustomerPawlevel(TbMenuCustomerPawlevel objTbMenuCustomerPawlevel)
        {
            _context.TbMenuCustomerPawlevels.Add(objTbMenuCustomerPawlevel);
            try
            {
                await _context.SaveChangesAsync();
                return StatusCode(200, objTbMenuCustomerPawlevel);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }

        #endregion

        #region TbMenuCustomerPawlevelDelete
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTbMenuCustomerPawlevel(int id)
        {
            var objTbMenuCustomerPawlevel = await _context.TbMenuCustomerPawlevels.FindAsync(id);
            if (objTbMenuCustomerPawlevel == null)
            {
                return StatusCode(404, "Data not found");
            }

            _context.TbMenuCustomerPawlevels.Remove(objTbMenuCustomerPawlevel);
            await _context.SaveChangesAsync();

            return StatusCode(200, true);
        }

        #endregion

    }
}
