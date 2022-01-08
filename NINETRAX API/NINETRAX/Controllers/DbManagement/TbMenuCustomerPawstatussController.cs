 

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
    public class TbMenuCustomerPawstatussController: Controller
    {

        #region Variables
		private readonly IWebHostEnvironment _heSrv;
		private readonly EntityContext _context;
		private readonly IRawQueryRepo<TbMenuCustomerPawstatus> _TbMenuCustomerPawstatusContext;
		private readonly IRawQueryRepo<TbMenuCustomerPawstatussView> _getTbMenuCustomerPawstatussView;
		private readonly IRawQueryRepo<TotalRecordCountGLB> _getTotalRecordCountGLB;
		private readonly IRawQueryRepo<Object> _getAllByLike;
		#endregion

		#region Constructor
		public TbMenuCustomerPawstatussController(
			IWebHostEnvironment heSrv,
			EntityContext context,
			IRawQueryRepo<TbMenuCustomerPawstatus> TbMenuCustomerPawstatusContext,
			IRawQueryRepo<TbMenuCustomerPawstatussView> getTbMenuCustomerPawstatussView,
			IRawQueryRepo<TotalRecordCountGLB> getTotalRecordCountGLB,
			IRawQueryRepo<Object> getAllByLike
		)
		{
			_TbMenuCustomerPawstatusContext = TbMenuCustomerPawstatusContext;
			_heSrv = heSrv;
			_context = context;
			_getTbMenuCustomerPawstatussView = getTbMenuCustomerPawstatussView;
			_getTotalRecordCountGLB = getTotalRecordCountGLB;
			_getAllByLike = getAllByLike;
		}
		#endregion

		#region GetTbMenuCustomerPawstatusView
		[HttpPost("GetTbMenuCustomerPawstatussView")]
		public async Task<ActionResult<DatatableResponseGLB>> GetTbMenuCustomerPawstatussView(DatatableGLB datatableGLB)
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
				var dataGrid = await _getTbMenuCustomerPawstatussView.GetAllByWhere(new GetAllByWhereGLB()
				{
					TableOrViewName = "TbMenuCustomerPawstatussView",
					SortColumn = sortInformation,
					WhereConditions = whereConditionStatement,
					LimitStart = datatableGLB.start,
					LimitEnd = rowSize
				});
		
				var dataGridCount = await _getTotalRecordCountGLB.CountAllByWhere(new CountAllByWhereGLB()
				{
					TableOrViewName = "TbMenuCustomerPawstatussView",
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

		#region GetTbMenuCustomerPawstatusAutoCompletion
		[HttpGet("GetTbMenuCustomerPawstatusAutoCompletion")]
		public async Task<ActionResult<IEnumerable<object>>> GetTbMenuCustomerPawstatusAutoCompleteSuggestion(string column, string value)
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
					TableOrViewName = "TbMenuCustomerPawstatussView"
				});
		
				#endregion database query code
				return Ok(autoSuggestions);
			}
			#endregion Call Repository Function
			return Ok();
		}
		#endregion

		#region GetTbMenuCustomerPawstatuss
		[HttpGet]
		public async Task<ActionResult<IEnumerable<TbMenuCustomerPawstatus>>> GetTbMenuCustomerPawstatuss()
		{
			try
			{
				return await _context.TbMenuCustomerPawstatuses.ToListAsync();
			}
			catch (Exception ex)
			{
				return StatusCode(500, "API response failed.");
			}
		}
		#endregion

		#region TbMenuCustomerPawstatusById
		[HttpGet("{id}")]
		public async Task<ActionResult<TbMenuCustomerPawstatus>> GetTbMenuCustomerPawstatus(int id)
		{
			var objTbMenuCustomerPawstatus = new TbMenuCustomerPawstatus();
			try
			{
				objTbMenuCustomerPawstatus = await _context.TbMenuCustomerPawstatuses.Where(d => d.Id == id).FirstOrDefaultAsync();
		
				if (objTbMenuCustomerPawstatus == null)
				{
					return StatusCode(404, "Data not found.");
				}
		
				return objTbMenuCustomerPawstatus;
			}
			catch (Exception ex)
			{
				return StatusCode(500, "API response failed.");
			}
		}
		#endregion

		#region TbMenuCustomerPawstatusUpdate 
		[HttpPut("{id}")]
		public async Task<IActionResult> PutTbMenuCustomerPawstatus(int id, TbMenuCustomerPawstatus objTbMenuCustomerPawstatus)
		{
		
			if (id != objTbMenuCustomerPawstatus.Id)
			{
				return StatusCode(404, "Data not found.");
			}
		
			_context.Entry(objTbMenuCustomerPawstatus).State = EntityState.Modified;
		
			try
			{
				await _context.SaveChangesAsync();
		
			}
			catch (Exception ex)
			{
				return StatusCode(500, "API response failed.");
			}
			return StatusCode(200, objTbMenuCustomerPawstatus);
		}
		
		#endregion

		#region TbMenuCustomerPawstatusCreate
		[HttpPost]
		public async Task<ActionResult<TbMenuCustomerPawstatus>> CreateTbMenuCustomerPawstatus (TbMenuCustomerPawstatus objTbMenuCustomerPawstatus)
		{
			_context.TbMenuCustomerPawstatuses.Add(objTbMenuCustomerPawstatus);
			try
			{
				await _context.SaveChangesAsync();
				return StatusCode(200, objTbMenuCustomerPawstatus);
			}
			catch (Exception ex)
			{
				return StatusCode(500, "API response failed.");
			}
		}
		
		#endregion

		#region TbMenuCustomerPawstatusDelete
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteTbMenuCustomerPawstatus(int id)
		{
			var objTbMenuCustomerPawstatus = await _context.TbMenuCustomerPawstatuses.FindAsync(id);
			if (objTbMenuCustomerPawstatus == null)
			{
				return StatusCode(404, "Data not found");
			}
		
			_context.TbMenuCustomerPawstatuses.Remove(objTbMenuCustomerPawstatus);
			await _context.SaveChangesAsync();
		
			return StatusCode(200, true);
		}
		
		#endregion
		
	} 
}
