 

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
    public class ATbNasinspectionsArchivesController: Controller
    {

        #region Variables
		private readonly IWebHostEnvironment _heSrv;
		private readonly EntityContext _context;
		private readonly IRawQueryRepo<ATbNasinspectionsArchive> _ATbNasinspectionsArchiveContext;
		private readonly IRawQueryRepo<ATbNasinspectionsArchivesView> _getATbNasinspectionsArchivesView;
		private readonly IRawQueryRepo<TotalRecordCountGLB> _getTotalRecordCountGLB;
		private readonly IRawQueryRepo<Object> _getAllByLike;
		#endregion

		#region Constructor
		public ATbNasinspectionsArchivesController(
			IWebHostEnvironment heSrv,
			EntityContext context,
			IRawQueryRepo<ATbNasinspectionsArchive> ATbNasinspectionsArchiveContext,
			IRawQueryRepo<ATbNasinspectionsArchivesView> getATbNasinspectionsArchivesView,
			IRawQueryRepo<TotalRecordCountGLB> getTotalRecordCountGLB,
			IRawQueryRepo<Object> getAllByLike
		)
		{
			_ATbNasinspectionsArchiveContext = ATbNasinspectionsArchiveContext;
			_heSrv = heSrv;
			_context = context;
			_getATbNasinspectionsArchivesView = getATbNasinspectionsArchivesView;
			_getTotalRecordCountGLB = getTotalRecordCountGLB;
			_getAllByLike = getAllByLike;
		}
		#endregion

		#region GetATbNasinspectionsArchiveView
		[HttpPost("GetATbNasinspectionsArchivesView")]
		public async Task<ActionResult<DatatableResponseGLB>> GetATbNasinspectionsArchivesView(DatatableGLB datatableGLB)
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
				var dataGrid = await _getATbNasinspectionsArchivesView.GetAllByWhere(new GetAllByWhereGLB()
				{
					TableOrViewName = "ATbNasinspectionsArchivesView",
					SortColumn = sortInformation,
					WhereConditions = whereConditionStatement,
					LimitStart = datatableGLB.start,
					LimitEnd = rowSize
				});
		
				var dataGridCount = await _getTotalRecordCountGLB.CountAllByWhere(new CountAllByWhereGLB()
				{
					TableOrViewName = "ATbNasinspectionsArchivesView",
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

		#region GetATbNasinspectionsArchiveAutoCompletion
		[HttpGet("GetATbNasinspectionsArchiveAutoCompletion")]
		public async Task<ActionResult<IEnumerable<object>>> GetATbNasinspectionsArchiveAutoCompleteSuggestion(string column, string value)
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
					TableOrViewName = "ATbNasinspectionsArchivesView"
				});
		
				#endregion database query code
				return Ok(autoSuggestions);
			}
			#endregion Call Repository Function
			return Ok();
		}
		#endregion

		#region GetATbNasinspectionsArchives
		[HttpGet]
		public async Task<ActionResult<IEnumerable<ATbNasinspectionsArchive>>> GetATbNasinspectionsArchives()
		{
			try
			{
				return await _context.ATbNasinspectionsArchives.ToListAsync();
			}
			catch (Exception ex)
			{
				return StatusCode(500, "API response failed.");
			}
		}
		#endregion

		#region ATbNasinspectionsArchiveById
		[HttpGet("{id}")]
		public async Task<ActionResult<ATbNasinspectionsArchive>> GetATbNasinspectionsArchive(int id)
		{
			var objATbNasinspectionsArchive = new ATbNasinspectionsArchive();
			try
			{
				objATbNasinspectionsArchive = await _context.ATbNasinspectionsArchives.Where(d => d.Id == id).FirstOrDefaultAsync();
		
				if (objATbNasinspectionsArchive == null)
				{
					return StatusCode(404, "Data not found.");
				}
		
				return objATbNasinspectionsArchive;
			}
			catch (Exception ex)
			{
				return StatusCode(500, "API response failed.");
			}
		}
		#endregion

		#region ATbNasinspectionsArchiveUpdate 
		[HttpPut("{id}")]
		public async Task<IActionResult> PutATbNasinspectionsArchive(int id, ATbNasinspectionsArchive objATbNasinspectionsArchive)
		{
		
			if (id != objATbNasinspectionsArchive.Id)
			{
				return StatusCode(404, "Data not found.");
			}
		
			_context.Entry(objATbNasinspectionsArchive).State = EntityState.Modified;
		
			try
			{
				await _context.SaveChangesAsync();
		
			}
			catch (Exception ex)
			{
				return StatusCode(500, "API response failed.");
			}
			return StatusCode(200, objATbNasinspectionsArchive);
		}
		
		#endregion

		#region ATbNasinspectionsArchiveCreate
		[HttpPost]
		public async Task<ActionResult<ATbNasinspectionsArchive>> CreateATbNasinspectionsArchive (ATbNasinspectionsArchive objATbNasinspectionsArchive)
		{
			_context.ATbNasinspectionsArchives.Add(objATbNasinspectionsArchive);
			try
			{
				await _context.SaveChangesAsync();
				return StatusCode(200, objATbNasinspectionsArchive);
			}
			catch (Exception ex)
			{
				return StatusCode(500, "API response failed.");
			}
		}
		
		#endregion

		#region ATbNasinspectionsArchiveDelete
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteATbNasinspectionsArchive(int id)
		{
			var objATbNasinspectionsArchive = await _context.ATbNasinspectionsArchives.FindAsync(id);
			if (objATbNasinspectionsArchive == null)
			{
				return StatusCode(404, "Data not found");
			}
		
			_context.ATbNasinspectionsArchives.Remove(objATbNasinspectionsArchive);
			await _context.SaveChangesAsync();
		
			return StatusCode(200, true);
		}
		
		#endregion
		
	} 
}
