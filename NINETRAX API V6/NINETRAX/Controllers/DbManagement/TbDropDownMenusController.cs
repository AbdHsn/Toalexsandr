

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
    public class TbDropDownMenusController : Controller
    {

        #region Variables
        private readonly IWebHostEnvironment _heSrv;
        private readonly EntityContext _context;
        private readonly IRawQueryRepo<TbDropDownMenu> _TbDropDownMenuContext;
        private readonly IRawQueryRepo<TbDropDownMenusView> _getTbDropDownMenusView;
        private readonly IRawQueryRepo<TotalRecordCountGLB> _getTotalRecordCountGLB;
        private readonly IRawQueryRepo<Object> _getAllByLike;
        #endregion

        #region Constructor
        public TbDropDownMenusController(
            IWebHostEnvironment heSrv,
            EntityContext context,
            IRawQueryRepo<TbDropDownMenu> TbDropDownMenuContext,
            IRawQueryRepo<TbDropDownMenusView> getTbDropDownMenusView,
            IRawQueryRepo<TotalRecordCountGLB> getTotalRecordCountGLB,
            IRawQueryRepo<Object> getAllByLike
        )
        {
            _TbDropDownMenuContext = TbDropDownMenuContext;
            _heSrv = heSrv;
            _context = context;
            _getTbDropDownMenusView = getTbDropDownMenusView;
            _getTotalRecordCountGLB = getTotalRecordCountGLB;
            _getAllByLike = getAllByLike;
        }
        #endregion

        #region GetTbDropDownMenuView
        [HttpPost("GetTbDropDownMenusView")]
        public async Task<ActionResult<DatatableResponseGLB>> GetTbDropDownMenusView(DatatableGLB datatableGLB)
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
                var dataGrid = await _getTbDropDownMenusView.GetAllByWhere(new GetAllByWhereGLB()
                {
                    TableOrViewName = "TbDropDownMenusView",
                    SortColumn = sortInformation,
                    WhereConditions = whereConditionStatement,
                    LimitStart = datatableGLB.start,
                    LimitEnd = rowSize
                });

                var dataGridCount = await _getTotalRecordCountGLB.CountAllByWhere(new CountAllByWhereGLB()
                {
                    TableOrViewName = "TbDropDownMenusView",
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

        #region GetTbDropDownMenuAutoCompletion
        [HttpGet("GetTbDropDownMenuAutoCompletion")]
        public async Task<ActionResult<IEnumerable<object>>> GetTbDropDownMenuAutoCompleteSuggestion(string column, string value)
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
                    TableOrViewName = "TbDropDownMenusView"
                });

                #endregion database query code
                return Ok(autoSuggestions);
            }
            #endregion Call Repository Function
            return Ok();
        }
        #endregion

        #region GetTbDropDownMenus
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TbDropDownMenu>>> GetTbDropDownMenus()
        {
            try
            {
                return await _context.TbDropDownMenus.ToListAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }
        #endregion

        #region TbDropDownMenuById
        [HttpGet("{id}")]
        public async Task<ActionResult<TbDropDownMenu>> GetTbDropDownMenu(int id)
        {
            var objTbDropDownMenu = new TbDropDownMenu();
            try
            {
                objTbDropDownMenu = await _context.TbDropDownMenus.Where(d => d.Id == id).FirstOrDefaultAsync();

                if (objTbDropDownMenu == null)
                {
                    return StatusCode(404, "Data not found.");
                }

                return objTbDropDownMenu;
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }
        #endregion

        #region TbDropDownMenuUpdate 
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTbDropDownMenu(int id, TbDropDownMenu objTbDropDownMenu)
        {

            if (id != objTbDropDownMenu.Id)
            {
                return StatusCode(404, "Data not found.");
            }

            _context.Entry(objTbDropDownMenu).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
            return StatusCode(200, objTbDropDownMenu);
        }

        #endregion

        #region TbDropDownMenuCreate
        [HttpPost]
        public async Task<ActionResult<TbDropDownMenu>> CreateTbDropDownMenu(TbDropDownMenu objTbDropDownMenu)
        {
            _context.TbDropDownMenus.Add(objTbDropDownMenu);
            try
            {
                await _context.SaveChangesAsync();
                return StatusCode(200, objTbDropDownMenu);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "API response failed.");
            }
        }

        #endregion

        #region TbDropDownMenuDelete
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTbDropDownMenu(int id)
        {
            var objTbDropDownMenu = await _context.TbDropDownMenus.FindAsync(id);
            if (objTbDropDownMenu == null)
            {
                return StatusCode(404, "Data not found");
            }

            _context.TbDropDownMenus.Remove(objTbDropDownMenu);
            await _context.SaveChangesAsync();

            return StatusCode(200, true);
        }

        #endregion

    }
}
