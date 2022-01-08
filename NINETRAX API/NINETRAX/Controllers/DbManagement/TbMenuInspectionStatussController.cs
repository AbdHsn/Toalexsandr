 

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
    public class TbMenuInspectionStatussController: Controller
    {

        #region Variables
		private readonly IWebHostEnvironment _heSrv;
		private readonly EntityContext _context;
		private readonly IRawQueryRepo<TbMenuInspectionStatus> _TbMenuInspectionStatusContext;
		private readonly IRawQueryRepo<TbMenuInspectionStatussView> _getTbMenuInspectionStatussView;
		private readonly IRawQueryRepo<TotalRecordCountGLB> _getTotalRecordCountGLB;
		private readonly IRawQueryRepo<Object> _getAllByLike;
		#endregion

		#region Constructor
		public TbMenuInspectionStatussController(
			IWebHostEnvironment heSrv,
			EntityContext context,
			IRawQueryRepo<TbMenuInspectionStatus> TbMenuInspectionStatusContext,
			IRawQueryRepo<TbMenuInspectionStatussView> getTbMenuInspectionStatussView,
			IRawQueryRepo<TotalRecordCountGLB> getTotalRecordCountGLB,
			IRawQueryRepo<Object> getAllByLike
		)
		{
			_TbMenuInspectionStatusContext = TbMenuInspectionStatusContext;
			_heSrv = heSrv;
			_context = context;
			_getTbMenuInspectionStatussView = getTbMenuInspectionStatussView;
			_getTotalRecordCountGLB = getTotalRecordCountGLB;
			_getAllByLike = getAllByLike;
		}
		#endregion

		#region GetTbMenuInspectionStatusView
		[HttpPost("GetTbMenuInspectionStatussView")]
		public async Task<ActionResult<DatatableResponseGLB>> GetTbMenuInspectionStatussView(DatatableGLB datatableGLB)
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
				var dataGrid = await _getTbMenuInspectionStatussView.GetAllByWhere(new GetAllByWhereGLB()
				{
					TableOrViewName = "TbMenuInspectionStatussView",
					SortColumn = sortInformation,
					WhereConditions = whereConditionStatement,
					LimitStart = datatableGLB.start,
					LimitEnd = rowSize
				});
		
				var dataGridCount = await _getTotalRecordCountGLB.CountAllByWhere(new CountAllByWhereGLB()
				{
					TableOrViewName = "TbMenuInspectionStatussView",
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

		#region GetTbMenuInspectionStatusAutoCompletion
		[HttpGet("GetTbMenuInspectionStatusAutoCompletion")]
		public async Task<ActionResult<IEnumerable<object>>> GetTbMenuInspectionStatusAutoCompleteSuggestion(string column, string value)
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
					TableOrViewName = "TbMenuInspectionStatussView"
				});
		
				#endregion database query code
				return Ok(autoSuggestions);
			}
			#endregion Call Repository Function
			return Ok();
		}
		#endregion

		#region GetTbMenuInspectionStatuss
		[HttpGet]
		public async Task<ActionResult<IEnumerable<TbMenuInspectionStatus>>> GetTbMenuInspectionStatuss()
		{
			try
			{
				return await _context.TbMenuInspectionStatuses.ToListAsync();
			}
			catch (Exception ex)
			{
				return StatusCode(500, "API response failed.");
			}
		}
		#endregion

		#region TbMenuInspectionStatusById
		[HttpGet("{id}")]
		public async Task<ActionResult<TbMenuInspectionStatus>> GetTbMenuInspectionStatus(int id)
		{
			var objTbMenuInspectionStatus = new TbMenuInspectionStatus();
			try
			{
				objTbMenuInspectionStatus = await _context.TbMenuInspectionStatuses.Where(d => d.Id == id).FirstOrDefaultAsync();
		
				if (objTbMenuInspectionStatus == null)
				{
					return StatusCode(404, "Data not found.");
				}
		
				return objTbMenuInspectionStatus;
			}
			catch (Exception ex)
			{
				return StatusCode(500, "API response failed.");
			}
		}
		#endregion

		#region TbMenuInspectionStatusUpdate 
		[HttpPut("{id}")]
		public async Task<IActionResult> PutTbMenuInspectionStatus(int id, TbMenuInspectionStatus objTbMenuInspectionStatus)
		{
		
			if (id != objTbMenuInspectionStatus.Id)
			{
				return StatusCode(404, "Data not found.");
			}
		
			_context.Entry(objTbMenuInspectionStatus).State = EntityState.Modified;
		
			try
			{
				await _context.SaveChangesAsync();
		
			}
			catch (Exception ex)
			{
				return StatusCode(500, "API response failed.");
			}
			return StatusCode(200, objTbMenuInspectionStatus);
		}
		
		#endregion

		#region TbMenuInspectionStatusCreate
		[HttpPost]
		public async Task<ActionResult<TbMenuInspectionStatus>> CreateTbMenuInspectionStatus (TbMenuInspectionStatus objTbMenuInspectionStatus)
		{
			_context.TbMenuInspectionStatuses.Add(objTbMenuInspectionStatus);
			try
			{
				await _context.SaveChangesAsync();
				return StatusCode(200, objTbMenuInspectionStatus);
			}
			catch (Exception ex)
			{
				return StatusCode(500, "API response failed.");
			}
		}
		
		#endregion

		#region TbMenuInspectionStatusDelete
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteTbMenuInspectionStatus(int id)
		{
			var objTbMenuInspectionStatus = await _context.TbMenuInspectionStatuses.FindAsync(id);
			if (objTbMenuInspectionStatus == null)
			{
				return StatusCode(404, "Data not found");
			}
		
			_context.TbMenuInspectionStatuses.Remove(objTbMenuInspectionStatus);
			await _context.SaveChangesAsync();
		
			return StatusCode(200, true);
		}
		
		#endregion
		
	} 
}