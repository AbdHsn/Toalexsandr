

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
    public class TbMenuInspectionCauseCodesController : Controller
    {

        #region Variables
        private readonly IWebHostEnvironment _heSrv;
        private readonly EntityContext _context;
        private readonly IRawQueryRepo<TbMenuInspectionCauseCode> _TbMenuInspectionCauseCodeContext;
        private readonly IRawQueryRepo<TbMenuInspectionCauseCodesView> _getTbMenuInspectionCauseCodesView;
        private readonly IRawQueryRepo<TotalRecordCountGLB> _getTotalRecordCountGLB;
        private readonly IRawQueryRepo<Object> _getAllByLike;
        #endregion

        #region Constructor
        public TbMenuInspectionCauseCodesController(
            IWebHostEnvironment heSrv,
            EntityContext context,
            IRawQueryRepo<TbMenuInspectionCauseCode> TbMenuInspectionCauseCodeContext,
            IRawQueryRepo<TbMenuInspectionCauseCodesView> getTbMenuInspectionCauseCodesView,
            IRawQueryRepo<TotalRecordCountGLB> getTotalRecordCountGLB,
            IRawQueryRepo<Object> getAllByLike
        )
        {
            _TbMenuInspectionCauseCodeContext = TbMenuInspectionCauseCodeContext;
            _heSrv = heSrv;
            _context = context;
            _getTbMenuInspectionCauseCodesView = getTbMenuInspectionCauseCodesView;
            _getTotalRecordCountGLB = getTotalRecordCountGLB;
            _getAllByLike = getAllByLike;
        }
        #endregion

        #region GetTbMenuInspectionCauseCodeView
        [HttpPost("GetTbMenuInspectionCauseCodesView")]
        public async Task<ActionResult<DatatableResponseGLB>> GetTbMenuInspectionCauseCodesView(DatatableGLB datatableGLB)
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
                var dataGrid = await _getTbMenuInspectionCauseCodesView.GetAllByWhere(new GetAllByWhereGLB()
                {
                    TableOrViewName = "TbMenuInspectionCauseCodesView",
                    SortColumn = sortInformation,
                    WhereConditions = whereConditionStatement,
                    LimitStart = datatableGLB.start,
                    LimitEnd = rowSize
                });

                var dataGridCount = await _getTotalRecordCountGLB.CountAllByWhere(new CountAllByWhereGLB()
                {
                    TableOrViewName = "TbMenuInspectionCauseCodesView",
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

        #region GetTbMenuInspectionCauseCodeAutoCompletion
        [HttpGet("GetTbMenuInspectionCauseCodeAutoCompletion")]
        public async Task<ActionResult<IEnumerable<object>>> GetTbMenuInspectionCauseCodeAutoCompleteSuggestion(string column, string value)
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
                    TableOrViewName = "TbMenuInspectionCauseCodesView"
                });

                #endregion database query code
                return Ok(autoSuggestions);
            }
            #endregion Call Repository Function
            return Ok();
        }
        #endregion

        #region GetTbMenuInspectionCauseCodes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TbMenuInspectionCauseCode>>> GetTbMenuInspectionCauseCodes()
        {
            try
            {
                return await _context.TbMenuInspectionCauseCodes.ToListAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }
        #endregion

        #region TbMenuInspectionCauseCodeById
        [HttpGet("{id}")]
        public async Task<ActionResult<TbMenuInspectionCauseCode>> GetTbMenuInspectionCauseCode(int id)
        {
            var objTbMenuInspectionCauseCode = new TbMenuInspectionCauseCode();
            try
            {
                objTbMenuInspectionCauseCode = await _context.TbMenuInspectionCauseCodes.Where(d => d.Id == id).FirstOrDefaultAsync();

                if (objTbMenuInspectionCauseCode == null)
                {
                    return StatusCode(404, "Data not found.");
                }

                return objTbMenuInspectionCauseCode;
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }
        #endregion

        #region TbMenuInspectionCauseCodeUpdate 
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTbMenuInspectionCauseCode(int id, TbMenuInspectionCauseCode objTbMenuInspectionCauseCode)
        {

            if (id != objTbMenuInspectionCauseCode.Id)
            {
                return StatusCode(404, "Data not found.");
            }

            _context.Entry(objTbMenuInspectionCauseCode).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
            return StatusCode(200, objTbMenuInspectionCauseCode);
        }

        #endregion

        #region TbMenuInspectionCauseCodeCreate
        [HttpPost]
        public async Task<ActionResult<TbMenuInspectionCauseCode>> CreateTbMenuInspectionCauseCode(TbMenuInspectionCauseCode objTbMenuInspectionCauseCode)
        {
            _context.TbMenuInspectionCauseCodes.Add(objTbMenuInspectionCauseCode);
            try
            {
                await _context.SaveChangesAsync();
                return StatusCode(200, objTbMenuInspectionCauseCode);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }

        #endregion

        #region TbMenuInspectionCauseCodeDelete
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTbMenuInspectionCauseCode(int id)
        {
            var objTbMenuInspectionCauseCode = await _context.TbMenuInspectionCauseCodes.FindAsync(id);
            if (objTbMenuInspectionCauseCode == null)
            {
                return StatusCode(404, "Data not found");
            }

            _context.TbMenuInspectionCauseCodes.Remove(objTbMenuInspectionCauseCode);
            await _context.SaveChangesAsync();

            return StatusCode(200, true);
        }

        #endregion

    }
}
