 

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
    public class TbIdiqtrackersController: Controller
    {

        #region Variables
		private readonly IWebHostEnvironment _heSrv;
		private readonly EntityContext _context;
		private readonly IRawQueryRepo<TbIdiqtracker> _TbIdiqtrackerContext;
		private readonly IRawQueryRepo<TbIdiqtrackersView> _getTbIdiqtrackersView;
		private readonly IRawQueryRepo<TotalRecordCountGLB> _getTotalRecordCountGLB;
		private readonly IRawQueryRepo<Object> _getAllByLike;
		#endregion

		#region Constructor
		public TbIdiqtrackersController(
			IWebHostEnvironment heSrv,
			EntityContext context,
			IRawQueryRepo<TbIdiqtracker> TbIdiqtrackerContext,
			IRawQueryRepo<TbIdiqtrackersView> getTbIdiqtrackersView,
			IRawQueryRepo<TotalRecordCountGLB> getTotalRecordCountGLB,
			IRawQueryRepo<Object> getAllByLike
		)
		{
			_TbIdiqtrackerContext = TbIdiqtrackerContext;
			_heSrv = heSrv;
			_context = context;
			_getTbIdiqtrackersView = getTbIdiqtrackersView;
			_getTotalRecordCountGLB = getTotalRecordCountGLB;
			_getAllByLike = getAllByLike;
		}
		#endregion

		#region GetTbIdiqtrackerView
		[HttpPost("GetTbIdiqtrackersView")]
		public async Task<ActionResult<DatatableResponseGLB>> GetTbIdiqtrackersView(DatatableGLB datatableGLB)
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
				var dataGrid = await _getTbIdiqtrackersView.GetAllByWhere(new GetAllByWhereGLB()
				{
					TableOrViewName = "TbIdiqtrackersView",
					SortColumn = sortInformation,
					WhereConditions = whereConditionStatement,
					LimitStart = datatableGLB.start,
					LimitEnd = rowSize
				});
		
				var dataGridCount = await _getTotalRecordCountGLB.CountAllByWhere(new CountAllByWhereGLB()
				{
					TableOrViewName = "TbIdiqtrackersView",
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

		#region GetTbIdiqtrackerAutoCompletion
		[HttpGet("GetTbIdiqtrackerAutoCompletion")]
		public async Task<ActionResult<IEnumerable<object>>> GetTbIdiqtrackerAutoCompleteSuggestion(string column, string value)
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
					TableOrViewName = "TbIdiqtrackersView"
				});
		
				#endregion database query code
				return Ok(autoSuggestions);
			}
			#endregion Call Repository Function
			return Ok();
		}
		#endregion

		#region GetTbIdiqtrackers
		[HttpGet]
		public async Task<ActionResult<IEnumerable<TbIdiqtracker>>> GetTbIdiqtrackers()
		{
			try
			{
				return await _context.TbIdiqtrackers.ToListAsync();
			}
			catch (Exception ex)
			{
				return StatusCode(500, "API response failed.");
			}
		}
		#endregion

		#region TbIdiqtrackerById
		[HttpGet("{id}")]
		public async Task<ActionResult<TbIdiqtracker>> GetTbIdiqtracker(int id)
		{
			var objTbIdiqtracker = new TbIdiqtracker();
			try
			{
				objTbIdiqtracker = await _context.TbIdiqtrackers.Where(d => d.Id == id).FirstOrDefaultAsync();
		
				if (objTbIdiqtracker == null)
				{
					return StatusCode(404, "Data not found.");
				}
		
				return objTbIdiqtracker;
			}
			catch (Exception ex)
			{
				return StatusCode(500, "API response failed.");
			}
		}
		#endregion

		#region TbIdiqtrackerUpdate 
		[HttpPut("{id}")]
		public async Task<IActionResult> PutTbIdiqtracker(int id, TbIdiqtracker objTbIdiqtracker)
		{
		
			if (id != objTbIdiqtracker.Id)
			{
				return StatusCode(404, "Data not found.");
			}
		
			_context.Entry(objTbIdiqtracker).State = EntityState.Modified;
		
			try
			{
				await _context.SaveChangesAsync();
		
			}
			catch (Exception ex)
			{
				return StatusCode(500, "API response failed.");
			}
			return StatusCode(200, objTbIdiqtracker);
		}
		
		#endregion

		#region TbIdiqtrackerCreate
		[HttpPost]
		public async Task<ActionResult<TbIdiqtracker>> CreateTbIdiqtracker (TbIdiqtracker objTbIdiqtracker)
		{
			_context.TbIdiqtrackers.Add(objTbIdiqtracker);
			try
			{
				await _context.SaveChangesAsync();
				return StatusCode(200, objTbIdiqtracker);
			}
			catch (Exception ex)
			{
				return StatusCode(500, "API response failed.");
			}
		}
		
		#endregion

		#region TbIdiqtrackerDelete
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteTbIdiqtracker(int id)
		{
			var objTbIdiqtracker = await _context.TbIdiqtrackers.FindAsync(id);
			if (objTbIdiqtracker == null)
			{
				return StatusCode(404, "Data not found");
			}
		
			_context.TbIdiqtrackers.Remove(objTbIdiqtracker);
			await _context.SaveChangesAsync();
		
			return StatusCode(200, true);
		}
		
		#endregion
		
	} 
}