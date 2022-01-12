

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
    public class TbMenuIdiqWotypesController : Controller
    {

        #region Variables
        private readonly IWebHostEnvironment _heSrv;
        private readonly EntityContext _context;
        private readonly IRawQueryRepo<TbMenuIdiqWotype> _TbMenuIdiqWotypeContext;
        private readonly IRawQueryRepo<TbMenuIdiqWotypesView> _getTbMenuIdiqWotypesView;
        private readonly IRawQueryRepo<TotalRecordCountGLB> _getTotalRecordCountGLB;
        private readonly IRawQueryRepo<Object> _getAllByLike;
        #endregion

        #region Constructor
        public TbMenuIdiqWotypesController(
            IWebHostEnvironment heSrv,
            EntityContext context,
            IRawQueryRepo<TbMenuIdiqWotype> TbMenuIdiqWotypeContext,
            IRawQueryRepo<TbMenuIdiqWotypesView> getTbMenuIdiqWotypesView,
            IRawQueryRepo<TotalRecordCountGLB> getTotalRecordCountGLB,
            IRawQueryRepo<Object> getAllByLike
        )
        {
            _TbMenuIdiqWotypeContext = TbMenuIdiqWotypeContext;
            _heSrv = heSrv;
            _context = context;
            _getTbMenuIdiqWotypesView = getTbMenuIdiqWotypesView;
            _getTotalRecordCountGLB = getTotalRecordCountGLB;
            _getAllByLike = getAllByLike;
        }
        #endregion

        #region GetTbMenuIdiqWotypeView
        [HttpPost("GetTbMenuIdiqWotypesView")]
        public async Task<ActionResult<DatatableResponseGLB>> GetTbMenuIdiqWotypesView(DatatableGLB datatableGLB)
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
                var dataGrid = await _getTbMenuIdiqWotypesView.GetAllByWhere(new GetAllByWhereGLB()
                {
                    TableOrViewName = "TbMenuIdiqWotypesView",
                    SortColumn = sortInformation,
                    WhereConditions = whereConditionStatement,
                    LimitStart = datatableGLB.start,
                    LimitEnd = rowSize
                });

                var dataGridCount = await _getTotalRecordCountGLB.CountAllByWhere(new CountAllByWhereGLB()
                {
                    TableOrViewName = "TbMenuIdiqWotypesView",
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

        #region GetTbMenuIdiqWotypeAutoCompletion
        [HttpGet("GetTbMenuIdiqWotypeAutoCompletion")]
        public async Task<ActionResult<IEnumerable<object>>> GetTbMenuIdiqWotypeAutoCompleteSuggestion(string column, string value)
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
                    TableOrViewName = "TbMenuIdiqWotypesView"
                });

                #endregion database query code
                return Ok(autoSuggestions);
            }
            #endregion Call Repository Function
            return Ok();
        }
        #endregion

        #region GetTbMenuIdiqWotypes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TbMenuIdiqWotype>>> GetTbMenuIdiqWotypes()
        {
            try
            {
                return await _context.TbMenuIdiqWotypes.ToListAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }
        #endregion

        #region TbMenuIdiqWotypeById
        [HttpGet("{id}")]
        public async Task<ActionResult<TbMenuIdiqWotype>> GetTbMenuIdiqWotype(int id)
        {
            var objTbMenuIdiqWotype = new TbMenuIdiqWotype();
            try
            {
                objTbMenuIdiqWotype = await _context.TbMenuIdiqWotypes.Where(d => d.Id == id).FirstOrDefaultAsync();

                if (objTbMenuIdiqWotype == null)
                {
                    return StatusCode(404, "Data not found.");
                }

                return objTbMenuIdiqWotype;
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }
        #endregion

        #region TbMenuIdiqWotypeUpdate 
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTbMenuIdiqWotype(int id, TbMenuIdiqWotype objTbMenuIdiqWotype)
        {

            if (id != objTbMenuIdiqWotype.Id)
            {
                return StatusCode(404, "Data not found.");
            }

            _context.Entry(objTbMenuIdiqWotype).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
            return StatusCode(200, objTbMenuIdiqWotype);
        }

        #endregion

        #region TbMenuIdiqWotypeCreate
        [HttpPost]
        public async Task<ActionResult<TbMenuIdiqWotype>> CreateTbMenuIdiqWotype(TbMenuIdiqWotype objTbMenuIdiqWotype)
        {
            _context.TbMenuIdiqWotypes.Add(objTbMenuIdiqWotype);
            try
            {
                await _context.SaveChangesAsync();
                return StatusCode(200, objTbMenuIdiqWotype);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }

        #endregion

        #region TbMenuIdiqWotypeDelete
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTbMenuIdiqWotype(int id)
        {
            var objTbMenuIdiqWotype = await _context.TbMenuIdiqWotypes.FindAsync(id);
            if (objTbMenuIdiqWotype == null)
            {
                return StatusCode(404, "Data not found");
            }

            _context.TbMenuIdiqWotypes.Remove(objTbMenuIdiqWotype);
            await _context.SaveChangesAsync();

            return StatusCode(200, true);
        }

        #endregion

    }
}
