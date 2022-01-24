

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
    public class TbDirectoryNamesController : Controller
    {

        #region Variables
        private readonly IWebHostEnvironment _heSrv;
        private readonly EntityContext _context;
        private readonly IRawQueryRepo<TbDirectoryName> _TbDirectoryNameContext;
        private readonly IRawQueryRepo<TbDirectoryNamesView> _getTbDirectoryNamesView;
        private readonly IRawQueryRepo<TotalRecordCountGLB> _getTotalRecordCountGLB;
        private readonly IRawQueryRepo<Object> _getAllByLike;
        #endregion

        #region Constructor
        public TbDirectoryNamesController(
            IWebHostEnvironment heSrv,
            EntityContext context,
            IRawQueryRepo<TbDirectoryName> TbDirectoryNameContext,
            IRawQueryRepo<TbDirectoryNamesView> getTbDirectoryNamesView,
            IRawQueryRepo<TotalRecordCountGLB> getTotalRecordCountGLB,
            IRawQueryRepo<Object> getAllByLike
        )
        {
            _TbDirectoryNameContext = TbDirectoryNameContext;
            _heSrv = heSrv;
            _context = context;
            _getTbDirectoryNamesView = getTbDirectoryNamesView;
            _getTotalRecordCountGLB = getTotalRecordCountGLB;
            _getAllByLike = getAllByLike;
        }
        #endregion

        #region GetTbDirectoryNameView
        [HttpPost("GetTbDirectoryNamesView")]
        public async Task<ActionResult<DatatableResponseGLB>> GetTbDirectoryNamesView(DatatableGLB datatableGLB)
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
                var dataGrid = await _getTbDirectoryNamesView.GetAllByWhere(new GetAllByWhereGLB()
                {
                    TableOrViewName = "TbDirectoryNamesView",
                    SortColumn = sortInformation,
                    WhereConditions = whereConditionStatement,
                    LimitStart = datatableGLB.start,
                    LimitEnd = rowSize
                });

                var dataGridCount = await _getTotalRecordCountGLB.CountAllByWhere(new CountAllByWhereGLB()
                {
                    TableOrViewName = "TbDirectoryNamesView",
                    WhereConditions = whereConditionStatement
                });

                #endregion database query code

                response.data = dataGrid;
                response.totalRecords = dataGridCount.TotalRecord;
                response.totalFilteredRecords = dataGridCount.TotalRecord;


                return StatusCode(200, response);
              //  return StatusCode(400, "Failed to proceed...");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }

        }
        #endregion

        #region GetTbDirectoryNameAutoCompletion
        [HttpGet("GetTbDirectoryNameAutoCompletion")]
        public async Task<ActionResult<IEnumerable<object>>> GetTbDirectoryNameAutoCompleteSuggestion(string column, string value)
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
                    TableOrViewName = "TbDirectoryNamesView"
                });

                #endregion database query code
                return Ok(autoSuggestions);
            }
            #endregion Call Repository Function
            return Ok();
        }
        #endregion

        #region GetTbDirectoryNames
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TbDirectoryName>>> GetTbDirectoryNames()
        {
            try
            {
                return await _context.TbDirectoryNames.ToListAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }
        #endregion

        #region TbDirectoryNameById
        [HttpGet("{id}")]
        public async Task<ActionResult<TbDirectoryName>> GetTbDirectoryName(int id)
        {
            var objTbDirectoryName = new TbDirectoryName();
            try
            {
                objTbDirectoryName = await _context.TbDirectoryNames.Where(d => d.Id == id).FirstOrDefaultAsync();

                if (objTbDirectoryName == null)
                {
                    return StatusCode(404, "Data not found.");
                }

                return objTbDirectoryName;
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }
        #endregion

        #region TbDirectoryNameUpdate 
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTbDirectoryName(int id, TbDirectoryName objTbDirectoryName)
        {

            if (id != objTbDirectoryName.Id)
            {
                return StatusCode(404, "Data not found.");
            }

            _context.Entry(objTbDirectoryName).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
            return StatusCode(200, objTbDirectoryName);
        }

        #endregion

        #region TbDirectoryNameCreate
        [HttpPost]
        public async Task<ActionResult<TbDirectoryName>> CreateTbDirectoryName(TbDirectoryName objTbDirectoryName)
        {
            _context.TbDirectoryNames.Add(objTbDirectoryName);
            try
            {
                await _context.SaveChangesAsync();
                return StatusCode(200, objTbDirectoryName);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }

        #endregion

        #region TbDirectoryNameDelete
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTbDirectoryName(int id)
        {
            var objTbDirectoryName = await _context.TbDirectoryNames.FindAsync(id);
            if (objTbDirectoryName == null)
            {
                return StatusCode(404, "Data not found");
            }

            _context.TbDirectoryNames.Remove(objTbDirectoryName);
            await _context.SaveChangesAsync();

            return StatusCode(200, true);
        }

        #endregion

    }
}
