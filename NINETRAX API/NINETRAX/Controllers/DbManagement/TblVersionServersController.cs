 

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
    public class TblVersionServersController: Controller
    {

        #region Variables
		private readonly IWebHostEnvironment _heSrv;
		private readonly EntityContext _context;
		private readonly IRawQueryRepo<TblVersionServer> _TblVersionServerContext;
		private readonly IRawQueryRepo<TblVersionServersView> _getTblVersionServersView;
		private readonly IRawQueryRepo<TotalRecordCountGLB> _getTotalRecordCountGLB;
		private readonly IRawQueryRepo<Object> _getAllByLike;
		#endregion

		#region Constructor
		public TblVersionServersController(
			IWebHostEnvironment heSrv,
			EntityContext context,
			IRawQueryRepo<TblVersionServer> TblVersionServerContext,
			IRawQueryRepo<TblVersionServersView> getTblVersionServersView,
			IRawQueryRepo<TotalRecordCountGLB> getTotalRecordCountGLB,
			IRawQueryRepo<Object> getAllByLike
		)
		{
			_TblVersionServerContext = TblVersionServerContext;
			_heSrv = heSrv;
			_context = context;
			_getTblVersionServersView = getTblVersionServersView;
			_getTotalRecordCountGLB = getTotalRecordCountGLB;
			_getAllByLike = getAllByLike;
		}
		#endregion

		#region GetTblVersionServerView
		[HttpPost("GetTblVersionServersView")]
		public async Task<ActionResult<DatatableResponseGLB>> GetTblVersionServersView(DatatableGLB datatableGLB)
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
				var dataGrid = await _getTblVersionServersView.GetAllByWhere(new GetAllByWhereGLB()
				{
					TableOrViewName = "TblVersionServersView",
					SortColumn = sortInformation,
					WhereConditions = whereConditionStatement,
					LimitStart = datatableGLB.start,
					LimitEnd = rowSize
				});
		
				var dataGridCount = await _getTotalRecordCountGLB.CountAllByWhere(new CountAllByWhereGLB()
				{
					TableOrViewName = "TblVersionServersView",
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

		#region GetTblVersionServerAutoCompletion
		[HttpGet("GetTblVersionServerAutoCompletion")]
		public async Task<ActionResult<IEnumerable<object>>> GetTblVersionServerAutoCompleteSuggestion(string column, string value)
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
					TableOrViewName = "TblVersionServersView"
				});
		
				#endregion database query code
				return Ok(autoSuggestions);
			}
			#endregion Call Repository Function
			return Ok();
		}
		#endregion

		#region GetTblVersionServers
		[HttpGet]
		public async Task<ActionResult<IEnumerable<TblVersionServer>>> GetTblVersionServers()
		{
			try
			{
				return await _context.TblVersionServers.ToListAsync();
			}
			catch (Exception ex)
			{
				return StatusCode(500, "API response failed.");
			}
		}
		#endregion

		#region TblVersionServerById
		[HttpGet("{id}")]
		public async Task<ActionResult<TblVersionServer>> GetTblVersionServer(int id)
		{
			var objTblVersionServer = new TblVersionServer();
			try
			{
				objTblVersionServer = await _context.TblVersionServers.Where(d => d.Id == id).FirstOrDefaultAsync();
		
				if (objTblVersionServer == null)
				{
					return StatusCode(404, "Data not found.");
				}
		
				return objTblVersionServer;
			}
			catch (Exception ex)
			{
				return StatusCode(500, "API response failed.");
			}
		}
		#endregion

		#region TblVersionServerUpdate 
		[HttpPut("{id}")]
		public async Task<IActionResult> PutTblVersionServer(int id, TblVersionServer objTblVersionServer)
		{
		
			if (id != objTblVersionServer.Id)
			{
				return StatusCode(404, "Data not found.");
			}
		
			_context.Entry(objTblVersionServer).State = EntityState.Modified;
		
			try
			{
				await _context.SaveChangesAsync();
		
			}
			catch (Exception ex)
			{
				return StatusCode(500, "API response failed.");
			}
			return StatusCode(200, objTblVersionServer);
		}
		
		#endregion

		#region TblVersionServerCreate
		[HttpPost]
		public async Task<ActionResult<TblVersionServer>> CreateTblVersionServer (TblVersionServer objTblVersionServer)
		{
			_context.TblVersionServers.Add(objTblVersionServer);
			try
			{
				await _context.SaveChangesAsync();
				return StatusCode(200, objTblVersionServer);
			}
			catch (Exception ex)
			{
				return StatusCode(500, "API response failed.");
			}
		}
		
		#endregion

		#region TblVersionServerDelete
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteTblVersionServer(int id)
		{
			var objTblVersionServer = await _context.TblVersionServers.FindAsync(id);
			if (objTblVersionServer == null)
			{
				return StatusCode(404, "Data not found");
			}
		
			_context.TblVersionServers.Remove(objTblVersionServer);
			await _context.SaveChangesAsync();
		
			return StatusCode(200, true);
		}
		
		#endregion
		
	} 
}
