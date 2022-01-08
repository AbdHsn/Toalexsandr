 

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
    public class ATbPdrtrackersController: Controller
    {

        #region Variables
		private readonly IWebHostEnvironment _heSrv;
		private readonly EntityContext _context;
		private readonly IRawQueryRepo<ATbPdrtracker> _ATbPdrtrackerContext;
		private readonly IRawQueryRepo<ATbPdrtrackersView> _getATbPdrtrackersView;
		private readonly IRawQueryRepo<TotalRecordCountGLB> _getTotalRecordCountGLB;
		private readonly IRawQueryRepo<Object> _getAllByLike;
		#endregion

		#region Constructor
		public ATbPdrtrackersController(
			IWebHostEnvironment heSrv,
			EntityContext context,
			IRawQueryRepo<ATbPdrtracker> ATbPdrtrackerContext,
			IRawQueryRepo<ATbPdrtrackersView> getATbPdrtrackersView,
			IRawQueryRepo<TotalRecordCountGLB> getTotalRecordCountGLB,
			IRawQueryRepo<Object> getAllByLike
		)
		{
			_ATbPdrtrackerContext = ATbPdrtrackerContext;
			_heSrv = heSrv;
			_context = context;
			_getATbPdrtrackersView = getATbPdrtrackersView;
			_getTotalRecordCountGLB = getTotalRecordCountGLB;
			_getAllByLike = getAllByLike;
		}
		#endregion

		#region GetATbPdrtrackerView
		[HttpPost("GetATbPdrtrackersView")]
		public async Task<ActionResult<DatatableResponseGLB>> GetATbPdrtrackersView(DatatableGLB datatableGLB)
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
				var dataGrid = await _getATbPdrtrackersView.GetAllByWhere(new GetAllByWhereGLB()
				{
					TableOrViewName = "ATbPdrtrackersView",
					SortColumn = sortInformation,
					WhereConditions = whereConditionStatement,
					LimitStart = datatableGLB.start,
					LimitEnd = rowSize
				});
		
				var dataGridCount = await _getTotalRecordCountGLB.CountAllByWhere(new CountAllByWhereGLB()
				{
					TableOrViewName = "ATbPdrtrackersView",
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

		#region GetATbPdrtrackerAutoCompletion
		[HttpGet("GetATbPdrtrackerAutoCompletion")]
		public async Task<ActionResult<IEnumerable<object>>> GetATbPdrtrackerAutoCompleteSuggestion(string column, string value)
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
					TableOrViewName = "ATbPdrtrackersView"
				});
		
				#endregion database query code
				return Ok(autoSuggestions);
			}
			#endregion Call Repository Function
			return Ok();
		}
		#endregion

		#region GetATbPdrtrackers
		[HttpGet]
		public async Task<ActionResult<IEnumerable<ATbPdrtracker>>> GetATbPdrtrackers()
		{
			try
			{
				return await _context.ATbPdrtrackers.ToListAsync();
			}
			catch (Exception ex)
			{
				return StatusCode(500, "API response failed.");
			}
		}
		#endregion

		#region ATbPdrtrackerById
		[HttpGet("{id}")]
		public async Task<ActionResult<ATbPdrtracker>> GetATbPdrtracker(int id)
		{
			var objATbPdrtracker = new ATbPdrtracker();
			try
			{
				objATbPdrtracker = await _context.ATbPdrtrackers.Where(d => d.Id == id).FirstOrDefaultAsync();
		
				if (objATbPdrtracker == null)
				{
					return StatusCode(404, "Data not found.");
				}
		
				return objATbPdrtracker;
			}
			catch (Exception ex)
			{
				return StatusCode(500, "API response failed.");
			}
		}
		#endregion

		#region ATbPdrtrackerUpdate 
		[HttpPut("{id}")]
		public async Task<IActionResult> PutATbPdrtracker(int id, ATbPdrtracker objATbPdrtracker)
		{
		
			if (id != objATbPdrtracker.Id)
			{
				return StatusCode(404, "Data not found.");
			}
		
			_context.Entry(objATbPdrtracker).State = EntityState.Modified;
		
			try
			{
				await _context.SaveChangesAsync();
		
			}
			catch (Exception ex)
			{
				return StatusCode(500, "API response failed.");
			}
			return StatusCode(200, objATbPdrtracker);
		}
		
		#endregion

		#region ATbPdrtrackerCreate
		[HttpPost]
		public async Task<ActionResult<ATbPdrtracker>> CreateATbPdrtracker (ATbPdrtracker objATbPdrtracker)
		{
			_context.ATbPdrtrackers.Add(objATbPdrtracker);
			try
			{
				await _context.SaveChangesAsync();
				return StatusCode(200, objATbPdrtracker);
			}
			catch (Exception ex)
			{
				return StatusCode(500, "API response failed.");
			}
		}
		
		#endregion

		#region ATbPdrtrackerDelete
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteATbPdrtracker(int id)
		{
			var objATbPdrtracker = await _context.ATbPdrtrackers.FindAsync(id);
			if (objATbPdrtracker == null)
			{
				return StatusCode(404, "Data not found");
			}
		
			_context.ATbPdrtrackers.Remove(objATbPdrtracker);
			await _context.SaveChangesAsync();
		
			return StatusCode(200, true);
		}
		
		#endregion
		
	} 
}
