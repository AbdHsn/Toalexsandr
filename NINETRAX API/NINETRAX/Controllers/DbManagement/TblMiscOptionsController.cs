 

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
    public class TblMiscOptionsController: Controller
    {

        #region Variables
		private readonly IWebHostEnvironment _heSrv;
		private readonly EntityContext _context;
		private readonly IRawQueryRepo<TblMiscOption> _TblMiscOptionContext;
		private readonly IRawQueryRepo<TblMiscOptionsView> _getTblMiscOptionsView;
		private readonly IRawQueryRepo<TotalRecordCountGLB> _getTotalRecordCountGLB;
		private readonly IRawQueryRepo<Object> _getAllByLike;
		#endregion

		#region Constructor
		public TblMiscOptionsController(
			IWebHostEnvironment heSrv,
			EntityContext context,
			IRawQueryRepo<TblMiscOption> TblMiscOptionContext,
			IRawQueryRepo<TblMiscOptionsView> getTblMiscOptionsView,
			IRawQueryRepo<TotalRecordCountGLB> getTotalRecordCountGLB,
			IRawQueryRepo<Object> getAllByLike
		)
		{
			_TblMiscOptionContext = TblMiscOptionContext;
			_heSrv = heSrv;
			_context = context;
			_getTblMiscOptionsView = getTblMiscOptionsView;
			_getTotalRecordCountGLB = getTotalRecordCountGLB;
			_getAllByLike = getAllByLike;
		}
		#endregion

		#region GetTblMiscOptionView
		[HttpPost("GetTblMiscOptionsView")]
		public async Task<ActionResult<DatatableResponseGLB>> GetTblMiscOptionsView(DatatableGLB datatableGLB)
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
				var dataGrid = await _getTblMiscOptionsView.GetAllByWhere(new GetAllByWhereGLB()
				{
					TableOrViewName = "TblMiscOptionsView",
					SortColumn = sortInformation,
					WhereConditions = whereConditionStatement,
					LimitStart = datatableGLB.start,
					LimitEnd = rowSize
				});
		
				var dataGridCount = await _getTotalRecordCountGLB.CountAllByWhere(new CountAllByWhereGLB()
				{
					TableOrViewName = "TblMiscOptionsView",
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

		#region GetTblMiscOptionAutoCompletion
		[HttpGet("GetTblMiscOptionAutoCompletion")]
		public async Task<ActionResult<IEnumerable<object>>> GetTblMiscOptionAutoCompleteSuggestion(string column, string value)
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
					TableOrViewName = "TblMiscOptionsView"
				});
		
				#endregion database query code
				return Ok(autoSuggestions);
			}
			#endregion Call Repository Function
			return Ok();
		}
		#endregion

		#region GetTblMiscOptions
		[HttpGet]
		public async Task<ActionResult<IEnumerable<TblMiscOption>>> GetTblMiscOptions()
		{
			try
			{
				return await _context.TblMiscOptions.ToListAsync();
			}
			catch (Exception ex)
			{
				return StatusCode(500, "API response failed.");
			}
		}
		#endregion

		#region TblMiscOptionById
		[HttpGet("{id}")]
		public async Task<ActionResult<TblMiscOption>> GetTblMiscOption(int id)
		{
			var objTblMiscOption = new TblMiscOption();
			try
			{
				objTblMiscOption = await _context.TblMiscOptions.Where(d => d.Id == id).FirstOrDefaultAsync();
		
				if (objTblMiscOption == null)
				{
					return StatusCode(404, "Data not found.");
				}
		
				return objTblMiscOption;
			}
			catch (Exception ex)
			{
				return StatusCode(500, "API response failed.");
			}
		}
		#endregion

		#region TblMiscOptionUpdate 
		[HttpPut("{id}")]
		public async Task<IActionResult> PutTblMiscOption(int id, TblMiscOption objTblMiscOption)
		{
		
			if (id != objTblMiscOption.Id)
			{
				return StatusCode(404, "Data not found.");
			}
		
			_context.Entry(objTblMiscOption).State = EntityState.Modified;
		
			try
			{
				await _context.SaveChangesAsync();
		
			}
			catch (Exception ex)
			{
				return StatusCode(500, "API response failed.");
			}
			return StatusCode(200, objTblMiscOption);
		}
		
		#endregion

		#region TblMiscOptionCreate
		[HttpPost]
		public async Task<ActionResult<TblMiscOption>> CreateTblMiscOption (TblMiscOption objTblMiscOption)
		{
			_context.TblMiscOptions.Add(objTblMiscOption);
			try
			{
				await _context.SaveChangesAsync();
				return StatusCode(200, objTblMiscOption);
			}
			catch (Exception ex)
			{
				return StatusCode(500, "API response failed.");
			}
		}
		
		#endregion

		#region TblMiscOptionDelete
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteTblMiscOption(int id)
		{
			var objTblMiscOption = await _context.TblMiscOptions.FindAsync(id);
			if (objTblMiscOption == null)
			{
				return StatusCode(404, "Data not found");
			}
		
			_context.TblMiscOptions.Remove(objTblMiscOption);
			await _context.SaveChangesAsync();
		
			return StatusCode(200, true);
		}
		
		#endregion
		
	} 
}
