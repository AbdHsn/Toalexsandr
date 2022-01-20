

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
    public class TblBuildingsController : Controller
    {

        #region Variables
        private readonly IWebHostEnvironment _heSrv;
        private readonly EntityContext _context;
        private readonly IRawQueryRepo<TblBuilding> _TblBuildingContext;
        private readonly IRawQueryRepo<TblBuildingsView> _getTblBuildingsView;
        private readonly IRawQueryRepo<TotalRecordCountGLB> _getTotalRecordCountGLB;
        private readonly IRawQueryRepo<Object> _getAllByLike;
        #endregion

        #region Constructor
        public TblBuildingsController(
            IWebHostEnvironment heSrv,
            EntityContext context,
            IRawQueryRepo<TblBuilding> TblBuildingContext,
            IRawQueryRepo<TblBuildingsView> getTblBuildingsView,
            IRawQueryRepo<TotalRecordCountGLB> getTotalRecordCountGLB,
            IRawQueryRepo<Object> getAllByLike
        )
        {
            _TblBuildingContext = TblBuildingContext;
            _heSrv = heSrv;
            _context = context;
            _getTblBuildingsView = getTblBuildingsView;
            _getTotalRecordCountGLB = getTotalRecordCountGLB;
            _getAllByLike = getAllByLike;
        }
        #endregion

        #region GetTblBuildingView
        [HttpPost("GetTblBuildingsView")]
        public async Task<ActionResult<DatatableResponseGLB>> GetTblBuildingsView(DatatableGLB datatableGLB)
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
                var dataGrid = await _getTblBuildingsView.GetAllByWhere(new GetAllByWhereGLB()
                {
                    TableOrViewName = "TblBuildingsView",
                    SortColumn = sortInformation,
                    WhereConditions = whereConditionStatement,
                    LimitStart = datatableGLB.start,
                    LimitEnd = rowSize
                });

                var dataGridCount = await _getTotalRecordCountGLB.CountAllByWhere(new CountAllByWhereGLB()
                {
                    TableOrViewName = "TblBuildingsView",
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

        #region GetTblBuildingAutoCompletion
        [HttpGet("GetTblBuildingAutoCompletion")]
        public async Task<ActionResult<IEnumerable<object>>> GetTblBuildingAutoCompleteSuggestion(string column, string value)
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
                    TableOrViewName = "TblBuildingsView"
                });

                #endregion database query code
                return Ok(autoSuggestions);
            }
            #endregion Call Repository Function
            return Ok();
        }
        #endregion

        #region GetTblBuildings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TblBuilding>>> GetTblBuildings()
        {
            try
            {
                return await _context.TblBuildings.ToListAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }
        #endregion

        #region TblBuildingById
        [HttpGet("{id}")]
        public async Task<ActionResult<TblBuilding>> GetTblBuilding(int id)
        {
            var objTblBuilding = new TblBuilding();
            try
            {
                objTblBuilding = await _context.TblBuildings.Where(d => d.Id == id).FirstOrDefaultAsync();

                if (objTblBuilding == null)
                {
                    return StatusCode(404, "Data not found.");
                }

                return objTblBuilding;
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }
        #endregion

        #region TblBuildingUpdate 
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTblBuilding(int id, TblBuilding objTblBuilding)
        {

            if (id != objTblBuilding.Id)
            {
                return StatusCode(404, "Data not found.");
            }

            _context.Entry(objTblBuilding).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
            return StatusCode(200, objTblBuilding);
        }

        #endregion

        #region TblBuildingCreate
        [HttpPost]
        public async Task<ActionResult<TblBuilding>> CreateTblBuilding(TblBuilding objTblBuilding)
        {
            _context.TblBuildings.Add(objTblBuilding);
            try
            {
                await _context.SaveChangesAsync();
                return StatusCode(200, objTblBuilding);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }

        #endregion

        #region TblBuildingDelete
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTblBuilding(int id)
        {
            var objTblBuilding = await _context.TblBuildings.FindAsync(id);
            if (objTblBuilding == null)
            {
                return StatusCode(404, "Data not found");
            }

            _context.TblBuildings.Remove(objTblBuilding);
            await _context.SaveChangesAsync();

            return StatusCode(200, true);
        }

        #endregion

    }
}
