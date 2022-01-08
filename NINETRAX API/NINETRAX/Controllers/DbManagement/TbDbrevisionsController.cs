 

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
    public class TbDbrevisionsController: Controller
    {

        #region Variables
		private readonly IWebHostEnvironment _heSrv;
		private readonly EntityContext _context;
		private readonly IRawQueryRepo<TbDbrevision> _TbDbrevisionContext;
		private readonly IRawQueryRepo<TbDbrevisionsView> _getTbDbrevisionsView;
		private readonly IRawQueryRepo<TotalRecordCountGLB> _getTotalRecordCountGLB;
		private readonly IRawQueryRepo<Object> _getAllByLike;
		#endregion

		#region Constructor
		public TbDbrevisionsController(
			IWebHostEnvironment heSrv,
			EntityContext context,
			IRawQueryRepo<TbDbrevision> TbDbrevisionContext,
			IRawQueryRepo<TbDbrevisionsView> getTbDbrevisionsView,
			IRawQueryRepo<TotalRecordCountGLB> getTotalRecordCountGLB,
			IRawQueryRepo<Object> getAllByLike
		)
		{
			_TbDbrevisionContext = TbDbrevisionContext;
			_heSrv = heSrv;
			_context = context;
			_getTbDbrevisionsView = getTbDbrevisionsView;
			_getTotalRecordCountGLB = getTotalRecordCountGLB;
			_getAllByLike = getAllByLike;
		}
		#endregion

		#region GetTbDbrevisionView
		[HttpPost("GetTbDbrevisionsView")]
		public async Task<ActionResult<DatatableResponseGLB>> GetTbDbrevisionsView(DatatableGLB datatableGLB)
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
				var dataGrid = await _getTbDbrevisionsView.GetAllByWhere(new GetAllByWhereGLB()
				{
					TableOrViewName = "TbDbrevisionsView",
					SortColumn = sortInformation,
					WhereConditions = whereConditionStatement,
					LimitStart = datatableGLB.start,
					LimitEnd = rowSize
				});
		
				var dataGridCount = await _getTotalRecordCountGLB.CountAllByWhere(new CountAllByWhereGLB()
				{
					TableOrViewName = "TbDbrevisionsView",
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

		#region GetTbDbrevisionAutoCompletion
		[HttpGet("GetTbDbrevisionAutoCompletion")]
		public async Task<ActionResult<IEnumerable<object>>> GetTbDbrevisionAutoCompleteSuggestion(string column, string value)
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
					TableOrViewName = "TbDbrevisionsView"
				});
		
				#endregion database query code
				return Ok(autoSuggestions);
			}
			#endregion Call Repository Function
			return Ok();
		}
		#endregion

		#region GetTbDbrevisions
		[HttpGet]
		public async Task<ActionResult<IEnumerable<TbDbrevision>>> GetTbDbrevisions()
		{
			try
			{
				return await _context.TbDbrevisions.ToListAsync();
			}
			catch (Exception ex)
			{
				return StatusCode(500, "API response failed.");
			}
		}
		#endregion

		#region TbDbrevisionById
		[HttpGet("{id}")]
		public async Task<ActionResult<TbDbrevision>> GetTbDbrevision(int id)
		{
			var objTbDbrevision = new TbDbrevision();
			try
			{
				objTbDbrevision = await _context.TbDbrevisions.Where(d => d.Id == id).FirstOrDefaultAsync();
		
				if (objTbDbrevision == null)
				{
					return StatusCode(404, "Data not found.");
				}
		
				return objTbDbrevision;
			}
			catch (Exception ex)
			{
				return StatusCode(500, "API response failed.");
			}
		}
		#endregion

		#region TbDbrevisionUpdate 
		[HttpPut("{id}")]
		public async Task<IActionResult> PutTbDbrevision(int id, TbDbrevision objTbDbrevision)
		{
		
			if (id != objTbDbrevision.Id)
			{
				return StatusCode(404, "Data not found.");
			}
		
			_context.Entry(objTbDbrevision).State = EntityState.Modified;
		
			try
			{
				await _context.SaveChangesAsync();
		
			}
			catch (Exception ex)
			{
				return StatusCode(500, "API response failed.");
			}
			return StatusCode(200, objTbDbrevision);
		}
		
		#endregion

		#region TbDbrevisionCreate
		[HttpPost]
		public async Task<ActionResult<TbDbrevision>> CreateTbDbrevision (TbDbrevision objTbDbrevision)
		{
			_context.TbDbrevisions.Add(objTbDbrevision);
			try
			{
				await _context.SaveChangesAsync();
				return StatusCode(200, objTbDbrevision);
			}
			catch (Exception ex)
			{
				return StatusCode(500, "API response failed.");
			}
		}
		
		#endregion

		#region TbDbrevisionDelete
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteTbDbrevision(int id)
		{
			var objTbDbrevision = await _context.TbDbrevisions.FindAsync(id);
			if (objTbDbrevision == null)
			{
				return StatusCode(404, "Data not found");
			}
		
			_context.TbDbrevisions.Remove(objTbDbrevision);
			await _context.SaveChangesAsync();
		
			return StatusCode(200, true);
		}
		
		#endregion
		
	} 
}
