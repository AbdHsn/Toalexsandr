 

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
    public class TbMenuCustomerCcrstatussController: Controller
    {

        #region Variables
		private readonly IWebHostEnvironment _heSrv;
		private readonly EntityContext _context;
		private readonly IRawQueryRepo<TbMenuCustomerCcrstatus> _TbMenuCustomerCcrstatusContext;
		private readonly IRawQueryRepo<TbMenuCustomerCcrstatussView> _getTbMenuCustomerCcrstatussView;
		private readonly IRawQueryRepo<TotalRecordCountGLB> _getTotalRecordCountGLB;
		private readonly IRawQueryRepo<Object> _getAllByLike;
		#endregion

		#region Constructor
		public TbMenuCustomerCcrstatussController(
			IWebHostEnvironment heSrv,
			EntityContext context,
			IRawQueryRepo<TbMenuCustomerCcrstatus> TbMenuCustomerCcrstatusContext,
			IRawQueryRepo<TbMenuCustomerCcrstatussView> getTbMenuCustomerCcrstatussView,
			IRawQueryRepo<TotalRecordCountGLB> getTotalRecordCountGLB,
			IRawQueryRepo<Object> getAllByLike
		)
		{
			_TbMenuCustomerCcrstatusContext = TbMenuCustomerCcrstatusContext;
			_heSrv = heSrv;
			_context = context;
			_getTbMenuCustomerCcrstatussView = getTbMenuCustomerCcrstatussView;
			_getTotalRecordCountGLB = getTotalRecordCountGLB;
			_getAllByLike = getAllByLike;
		}
		#endregion

		#region GetTbMenuCustomerCcrstatusView
		[HttpPost("GetTbMenuCustomerCcrstatussView")]
		public async Task<ActionResult<DatatableResponseGLB>> GetTbMenuCustomerCcrstatussView(DatatableGLB datatableGLB)
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
				var dataGrid = await _getTbMenuCustomerCcrstatussView.GetAllByWhere(new GetAllByWhereGLB()
				{
					TableOrViewName = "TbMenuCustomerCcrstatussView",
					SortColumn = sortInformation,
					WhereConditions = whereConditionStatement,
					LimitStart = datatableGLB.start,
					LimitEnd = rowSize
				});
		
				var dataGridCount = await _getTotalRecordCountGLB.CountAllByWhere(new CountAllByWhereGLB()
				{
					TableOrViewName = "TbMenuCustomerCcrstatussView",
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

		#region GetTbMenuCustomerCcrstatusAutoCompletion
		[HttpGet("GetTbMenuCustomerCcrstatusAutoCompletion")]
		public async Task<ActionResult<IEnumerable<object>>> GetTbMenuCustomerCcrstatusAutoCompleteSuggestion(string column, string value)
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
					TableOrViewName = "TbMenuCustomerCcrstatussView"
				});
		
				#endregion database query code
				return Ok(autoSuggestions);
			}
			#endregion Call Repository Function
			return Ok();
		}
		#endregion

		#region GetTbMenuCustomerCcrstatuss
		[HttpGet]
		public async Task<ActionResult<IEnumerable<TbMenuCustomerCcrstatus>>> GetTbMenuCustomerCcrstatuss()
		{
			try
			{
				return await _context.TbMenuCustomerCcrstatuses.ToListAsync();
			}
			catch (Exception ex)
			{
				return StatusCode(500, "API response failed.");
			}
		}
		#endregion

		#region TbMenuCustomerCcrstatusById
		[HttpGet("{id}")]
		public async Task<ActionResult<TbMenuCustomerCcrstatus>> GetTbMenuCustomerCcrstatus(int id)
		{
			var objTbMenuCustomerCcrstatus = new TbMenuCustomerCcrstatus();
			try
			{
				objTbMenuCustomerCcrstatus = await _context.TbMenuCustomerCcrstatuses.Where(d => d.Id == id).FirstOrDefaultAsync();
		
				if (objTbMenuCustomerCcrstatus == null)
				{
					return StatusCode(404, "Data not found.");
				}
		
				return objTbMenuCustomerCcrstatus;
			}
			catch (Exception ex)
			{
				return StatusCode(500, "API response failed.");
			}
		}
		#endregion

		#region TbMenuCustomerCcrstatusUpdate 
		[HttpPut("{id}")]
		public async Task<IActionResult> PutTbMenuCustomerCcrstatus(int id, TbMenuCustomerCcrstatus objTbMenuCustomerCcrstatus)
		{
		
			if (id != objTbMenuCustomerCcrstatus.Id)
			{
				return StatusCode(404, "Data not found.");
			}
		
			_context.Entry(objTbMenuCustomerCcrstatus).State = EntityState.Modified;
		
			try
			{
				await _context.SaveChangesAsync();
		
			}
			catch (Exception ex)
			{
				return StatusCode(500, "API response failed.");
			}
			return StatusCode(200, objTbMenuCustomerCcrstatus);
		}
		
		#endregion

		#region TbMenuCustomerCcrstatusCreate
		[HttpPost]
		public async Task<ActionResult<TbMenuCustomerCcrstatus>> CreateTbMenuCustomerCcrstatus (TbMenuCustomerCcrstatus objTbMenuCustomerCcrstatus)
		{
			_context.TbMenuCustomerCcrstatuses.Add(objTbMenuCustomerCcrstatus);
			try
			{
				await _context.SaveChangesAsync();
				return StatusCode(200, objTbMenuCustomerCcrstatus);
			}
			catch (Exception ex)
			{
				return StatusCode(500, "API response failed.");
			}
		}
		
		#endregion

		#region TbMenuCustomerCcrstatusDelete
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteTbMenuCustomerCcrstatus(int id)
		{
			var objTbMenuCustomerCcrstatus = await _context.TbMenuCustomerCcrstatuses.FindAsync(id);
			if (objTbMenuCustomerCcrstatus == null)
			{
				return StatusCode(404, "Data not found");
			}
		
			_context.TbMenuCustomerCcrstatuses.Remove(objTbMenuCustomerCcrstatus);
			await _context.SaveChangesAsync();
		
			return StatusCode(200, true);
		}
		
		#endregion
		
	} 
}
