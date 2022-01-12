

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
    public class TbMenuCustomerPawassessmentsController : Controller
    {

        #region Variables
        private readonly IWebHostEnvironment _heSrv;
        private readonly EntityContext _context;
        private readonly IRawQueryRepo<TbMenuCustomerPawassessment> _TbMenuCustomerPawassessmentContext;
        private readonly IRawQueryRepo<TbMenuCustomerPawassessmentsView> _getTbMenuCustomerPawassessmentsView;
        private readonly IRawQueryRepo<TotalRecordCountGLB> _getTotalRecordCountGLB;
        private readonly IRawQueryRepo<Object> _getAllByLike;
        #endregion

        #region Constructor
        public TbMenuCustomerPawassessmentsController(
            IWebHostEnvironment heSrv,
            EntityContext context,
            IRawQueryRepo<TbMenuCustomerPawassessment> TbMenuCustomerPawassessmentContext,
            IRawQueryRepo<TbMenuCustomerPawassessmentsView> getTbMenuCustomerPawassessmentsView,
            IRawQueryRepo<TotalRecordCountGLB> getTotalRecordCountGLB,
            IRawQueryRepo<Object> getAllByLike
        )
        {
            _TbMenuCustomerPawassessmentContext = TbMenuCustomerPawassessmentContext;
            _heSrv = heSrv;
            _context = context;
            _getTbMenuCustomerPawassessmentsView = getTbMenuCustomerPawassessmentsView;
            _getTotalRecordCountGLB = getTotalRecordCountGLB;
            _getAllByLike = getAllByLike;
        }
        #endregion

        #region GetTbMenuCustomerPawassessmentView
        [HttpPost("GetTbMenuCustomerPawassessmentsView")]
        public async Task<ActionResult<DatatableResponseGLB>> GetTbMenuCustomerPawassessmentsView(DatatableGLB datatableGLB)
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
                var dataGrid = await _getTbMenuCustomerPawassessmentsView.GetAllByWhere(new GetAllByWhereGLB()
                {
                    TableOrViewName = "TbMenuCustomerPawassessmentsView",
                    SortColumn = sortInformation,
                    WhereConditions = whereConditionStatement,
                    LimitStart = datatableGLB.start,
                    LimitEnd = rowSize
                });

                var dataGridCount = await _getTotalRecordCountGLB.CountAllByWhere(new CountAllByWhereGLB()
                {
                    TableOrViewName = "TbMenuCustomerPawassessmentsView",
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

        #region GetTbMenuCustomerPawassessmentAutoCompletion
        [HttpGet("GetTbMenuCustomerPawassessmentAutoCompletion")]
        public async Task<ActionResult<IEnumerable<object>>> GetTbMenuCustomerPawassessmentAutoCompleteSuggestion(string column, string value)
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
                    TableOrViewName = "TbMenuCustomerPawassessmentsView"
                });

                #endregion database query code
                return Ok(autoSuggestions);
            }
            #endregion Call Repository Function
            return Ok();
        }
        #endregion

        #region GetTbMenuCustomerPawassessments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TbMenuCustomerPawassessment>>> GetTbMenuCustomerPawassessments()
        {
            try
            {
                return await _context.TbMenuCustomerPawassessments.ToListAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }
        #endregion

        #region TbMenuCustomerPawassessmentById
        [HttpGet("{id}")]
        public async Task<ActionResult<TbMenuCustomerPawassessment>> GetTbMenuCustomerPawassessment(int id)
        {
            var objTbMenuCustomerPawassessment = new TbMenuCustomerPawassessment();
            try
            {
                objTbMenuCustomerPawassessment = await _context.TbMenuCustomerPawassessments.Where(d => d.Id == id).FirstOrDefaultAsync();

                if (objTbMenuCustomerPawassessment == null)
                {
                    return StatusCode(404, "Data not found.");
                }

                return objTbMenuCustomerPawassessment;
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }
        #endregion

        #region TbMenuCustomerPawassessmentUpdate 
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTbMenuCustomerPawassessment(int id, TbMenuCustomerPawassessment objTbMenuCustomerPawassessment)
        {

            if (id != objTbMenuCustomerPawassessment.Id)
            {
                return StatusCode(404, "Data not found.");
            }

            _context.Entry(objTbMenuCustomerPawassessment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
            return StatusCode(200, objTbMenuCustomerPawassessment);
        }

        #endregion

        #region TbMenuCustomerPawassessmentCreate
        [HttpPost]
        public async Task<ActionResult<TbMenuCustomerPawassessment>> CreateTbMenuCustomerPawassessment(TbMenuCustomerPawassessment objTbMenuCustomerPawassessment)
        {
            _context.TbMenuCustomerPawassessments.Add(objTbMenuCustomerPawassessment);
            try
            {
                await _context.SaveChangesAsync();
                return StatusCode(200, objTbMenuCustomerPawassessment);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }

        #endregion

        #region TbMenuCustomerPawassessmentDelete
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTbMenuCustomerPawassessment(int id)
        {
            var objTbMenuCustomerPawassessment = await _context.TbMenuCustomerPawassessments.FindAsync(id);
            if (objTbMenuCustomerPawassessment == null)
            {
                return StatusCode(404, "Data not found");
            }

            _context.TbMenuCustomerPawassessments.Remove(objTbMenuCustomerPawassessment);
            await _context.SaveChangesAsync();

            return StatusCode(200, true);
        }

        #endregion

    }
}
