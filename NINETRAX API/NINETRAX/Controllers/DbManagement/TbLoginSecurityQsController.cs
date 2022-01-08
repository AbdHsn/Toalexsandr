 

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
    public class TbLoginSecurityQsController: Controller
    {

        #region Variables
		private readonly IWebHostEnvironment _heSrv;
		private readonly EntityContext _context;
		private readonly IRawQueryRepo<TbLoginSecurityQ> _TbLoginSecurityQContext;
		private readonly IRawQueryRepo<TbLoginSecurityQsView> _getTbLoginSecurityQsView;
		private readonly IRawQueryRepo<TotalRecordCountGLB> _getTotalRecordCountGLB;
		private readonly IRawQueryRepo<Object> _getAllByLike;
		#endregion

		#region Constructor
		public TbLoginSecurityQsController(
			IWebHostEnvironment heSrv,
			EntityContext context,
			IRawQueryRepo<TbLoginSecurityQ> TbLoginSecurityQContext,
			IRawQueryRepo<TbLoginSecurityQsView> getTbLoginSecurityQsView,
			IRawQueryRepo<TotalRecordCountGLB> getTotalRecordCountGLB,
			IRawQueryRepo<Object> getAllByLike
		)
		{
			_TbLoginSecurityQContext = TbLoginSecurityQContext;
			_heSrv = heSrv;
			_context = context;
			_getTbLoginSecurityQsView = getTbLoginSecurityQsView;
			_getTotalRecordCountGLB = getTotalRecordCountGLB;
			_getAllByLike = getAllByLike;
		}
		#endregion

		#region GetTbLoginSecurityQView
		[HttpPost("GetTbLoginSecurityQsView")]
		public async Task<ActionResult<DatatableResponseGLB>> GetTbLoginSecurityQsView(DatatableGLB datatableGLB)
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
				var dataGrid = await _getTbLoginSecurityQsView.GetAllByWhere(new GetAllByWhereGLB()
				{
					TableOrViewName = "TbLoginSecurityQsView",
					SortColumn = sortInformation,
					WhereConditions = whereConditionStatement,
					LimitStart = datatableGLB.start,
					LimitEnd = rowSize
				});
		
				var dataGridCount = await _getTotalRecordCountGLB.CountAllByWhere(new CountAllByWhereGLB()
				{
					TableOrViewName = "TbLoginSecurityQsView",
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

		#region GetTbLoginSecurityQAutoCompletion
		[HttpGet("GetTbLoginSecurityQAutoCompletion")]
		public async Task<ActionResult<IEnumerable<object>>> GetTbLoginSecurityQAutoCompleteSuggestion(string column, string value)
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
					TableOrViewName = "TbLoginSecurityQsView"
				});
		
				#endregion database query code
				return Ok(autoSuggestions);
			}
			#endregion Call Repository Function
			return Ok();
		}
		#endregion

		#region GetTbLoginSecurityQs
		[HttpGet]
		public async Task<ActionResult<IEnumerable<TbLoginSecurityQ>>> GetTbLoginSecurityQs()
		{
			try
			{
				return await _context.TbLoginSecurityQs.ToListAsync();
			}
			catch (Exception ex)
			{
				return StatusCode(500, "API response failed.");
			}
		}
		#endregion

		#region TbLoginSecurityQById
		[HttpGet("{id}")]
		public async Task<ActionResult<TbLoginSecurityQ>> GetTbLoginSecurityQ(int id)
		{
			var objTbLoginSecurityQ = new TbLoginSecurityQ();
			try
			{
				objTbLoginSecurityQ = await _context.TbLoginSecurityQs.Where(d => d.Id == id).FirstOrDefaultAsync();
		
				if (objTbLoginSecurityQ == null)
				{
					return StatusCode(404, "Data not found.");
				}
		
				return objTbLoginSecurityQ;
			}
			catch (Exception ex)
			{
				return StatusCode(500, "API response failed.");
			}
		}
		#endregion

		#region TbLoginSecurityQUpdate 
		[HttpPut("{id}")]
		public async Task<IActionResult> PutTbLoginSecurityQ(int id, TbLoginSecurityQ objTbLoginSecurityQ)
		{
		
			if (id != objTbLoginSecurityQ.Id)
			{
				return StatusCode(404, "Data not found.");
			}
		
			_context.Entry(objTbLoginSecurityQ).State = EntityState.Modified;
		
			try
			{
				await _context.SaveChangesAsync();
		
			}
			catch (Exception ex)
			{
				return StatusCode(500, "API response failed.");
			}
			return StatusCode(200, objTbLoginSecurityQ);
		}
		
		#endregion

		#region TbLoginSecurityQCreate
		[HttpPost]
		public async Task<ActionResult<TbLoginSecurityQ>> CreateTbLoginSecurityQ (TbLoginSecurityQ objTbLoginSecurityQ)
		{
			_context.TbLoginSecurityQs.Add(objTbLoginSecurityQ);
			try
			{
				await _context.SaveChangesAsync();
				return StatusCode(200, objTbLoginSecurityQ);
			}
			catch (Exception ex)
			{
				return StatusCode(500, "API response failed.");
			}
		}
		
		#endregion

		#region TbLoginSecurityQDelete
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteTbLoginSecurityQ(int id)
		{
			var objTbLoginSecurityQ = await _context.TbLoginSecurityQs.FindAsync(id);
			if (objTbLoginSecurityQ == null)
			{
				return StatusCode(404, "Data not found");
			}
		
			_context.TbLoginSecurityQs.Remove(objTbLoginSecurityQ);
			await _context.SaveChangesAsync();
		
			return StatusCode(200, true);
		}
		
		#endregion
		
	} 
}
