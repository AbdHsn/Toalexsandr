 

using DataLayer.Models.EntityModels;
using DataLayer.Models.GlobalModels;
using DataLayer.Models.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RepositoryLayer;

namespace NINETRAX.Controllers.DbManagement
{
    [Route("api/d/[controller]")]
    [ApiController]
    public class ATbNasbmdannexTablesController: Controller
    {

        #region Variables
		private readonly IWebHostEnvironment _heSrv;
		private readonly EntityContext _context;
		private readonly IRawQueryRepo<ATbNasbmdannexTable> _ATbNasbmdannexTableContext;
		private readonly IRawQueryRepo<ATbNasbmdannexTablesView> _getATbNasbmdannexTablesView;
		private readonly IRawQueryRepo<TotalRecordCountGLB> _getTotalRecordCountGLB;
		private readonly IRawQueryRepo<Object> _getAllByLike;
		#endregion

		#region Constructor
		public ATbNasbmdannexTablesController(
			IWebHostEnvironment heSrv,
			EntityContext context,
			IRawQueryRepo<ATbNasbmdannexTable> ATbNasbmdannexTableContext,
			IRawQueryRepo<ATbNasbmdannexTablesView> getATbNasbmdannexTablesView,
			IRawQueryRepo<TotalRecordCountGLB> getTotalRecordCountGLB,
			IRawQueryRepo<Object> getAllByLike
		)
		{
			_ATbNasbmdannexTableContext = ATbNasbmdannexTableContext;
			_heSrv = heSrv;
			_context = context;
			_getATbNasbmdannexTablesView = getATbNasbmdannexTablesView;
			_getTotalRecordCountGLB = getTotalRecordCountGLB;
			_getAllByLike = getAllByLike;
		}
		#endregion

		#region GetATbNasbmdannexTableView
		[HttpPost("GetATbNasbmdannexTablesView")]
		public async Task<ActionResult<DatatableResponseGLB>> GetATbNasbmdannexTablesView(DatatableGLB datatableGLB)
        {
			DatatableResponseGLB response = new DatatableResponseGLB();
			try
			{		
				int rowSize = 0;
				if(datatableGLB.length == "All")
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
				var dataGrid = await _getATbNasbmdannexTablesView.GetAllByWhere(new GetAllByWhereGLB()
				{
					TableOrViewName = "ATbNasbmdannexTablesView",
					SortColumn = sortInformation,
					WhereConditions = whereConditionStatement,
					LimitStart = datatableGLB.start,
					LimitEnd = rowSize
				});
		
				var dataGridCount = await _getTotalRecordCountGLB.CountAllByWhere(new CountAllByWhereGLB()
				{
					TableOrViewName = "ATbNasbmdannexTablesView",
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

		#region GetATbNasbmdannexTableAutoCompletion
		[HttpGet("GetATbNasbmdannexTableAutoCompletion")]
		public async Task<ActionResult<IEnumerable<object>>> GetATbNasbmdannexTableAutoCompleteSuggestion(string column, string value)
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
					TableOrViewName = "ATbNasbmdannexTablesView"
				});
		
				#endregion database query code
				return Ok(autoSuggestions);
			}
			#endregion Call Repository Function
			return Ok();
		}
		#endregion

		#region GetATbNasbmdannexTables
		[HttpGet]
		public async Task<ActionResult<IEnumerable<ATbNasbmdannexTable>>> GetATbNasbmdannexTables()
		{
			try
			{
				return await _context.ATbNasbmdannexTables.ToListAsync();
			}
			catch (Exception ex)
			{
				return StatusCode(500, "API response failed.");
			}
		}
		#endregion

		#region ATbNasbmdannexTableById
		[HttpGet("{id}")]
		public async Task<ActionResult<ATbNasbmdannexTable>> GetATbNasbmdannexTable(int id)
		{
			var objATbNasbmdannexTable = new ATbNasbmdannexTable();
			try
			{
				objATbNasbmdannexTable = await _context.ATbNasbmdannexTables.Where(d => d.Id == id).FirstOrDefaultAsync();
		
				if (objATbNasbmdannexTable == null)
				{
					return StatusCode(404, "Data not found.");
				}
		
				return objATbNasbmdannexTable;
			}
			catch (Exception ex)
			{
				return StatusCode(500, "API response failed.");
			}
		}
		#endregion

		#region ATbNasbmdannexTableUpdate 
		[HttpPut("{id}")]
		public async Task<IActionResult> PutATbNasbmdannexTable(int id, ATbNasbmdannexTable objATbNasbmdannexTable)
		{
		
			if (id != objATbNasbmdannexTable.Id)
			{
				return StatusCode(404, "Data not found.");
			}
		
			_context.Entry(objATbNasbmdannexTable).State = EntityState.Modified;
		
			try
			{
				await _context.SaveChangesAsync();
		
			}
			catch (Exception ex)
			{
				return StatusCode(500, "API response failed.");
			}
			return StatusCode(200, objATbNasbmdannexTable);
		}
		
		#endregion

		#region ATbNasbmdannexTableCreate
		[HttpPost]
		public async Task<ActionResult<ATbNasbmdannexTable>> CreateATbNasbmdannexTable (ATbNasbmdannexTable objATbNasbmdannexTable)
		{
			_context.ATbNasbmdannexTables.Add(objATbNasbmdannexTable);
			try
			{
				await _context.SaveChangesAsync();
				return StatusCode(200, objATbNasbmdannexTable);
			}
			catch (Exception ex)
			{
				return StatusCode(500, "API response failed.");
			}
		}
		
		#endregion

		#region ATbNasbmdannexTableDelete
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteATbNasbmdannexTable(int id)
		{
			var objATbNasbmdannexTable = await _context.ATbNasbmdannexTables.FindAsync(id);
			if (objATbNasbmdannexTable == null)
			{
				return StatusCode(404, "Data not found");
			}
		
			_context.ATbNasbmdannexTables.Remove(objATbNasbmdannexTable);
			await _context.SaveChangesAsync();
		
			return StatusCode(200, true);
		}
		
		#endregion
		
	} 
}
