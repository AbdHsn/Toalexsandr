 

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
    public class TbUserLoginsController: Controller
    {

        #region Variables
		private readonly IWebHostEnvironment _heSrv;
		private readonly EntityContext _context;
		private readonly IRawQueryRepo<TbUserLogin> _TbUserLoginContext;
		private readonly IRawQueryRepo<TbUserLoginsView> _getTbUserLoginsView;
		private readonly IRawQueryRepo<TotalRecordCountGLB> _getTotalRecordCountGLB;
		private readonly IRawQueryRepo<Object> _getAllByLike;
		#endregion

		#region Constructor
		public TbUserLoginsController(
			IWebHostEnvironment heSrv,
			EntityContext context,
			IRawQueryRepo<TbUserLogin> TbUserLoginContext,
			IRawQueryRepo<TbUserLoginsView> getTbUserLoginsView,
			IRawQueryRepo<TotalRecordCountGLB> getTotalRecordCountGLB,
			IRawQueryRepo<Object> getAllByLike
		)
		{
			_TbUserLoginContext = TbUserLoginContext;
			_heSrv = heSrv;
			_context = context;
			_getTbUserLoginsView = getTbUserLoginsView;
			_getTotalRecordCountGLB = getTotalRecordCountGLB;
			_getAllByLike = getAllByLike;
		}
		#endregion

		#region GetTbUserLoginView
		[HttpPost("GetTbUserLoginsView")]
		public async Task<ActionResult<DatatableResponseGLB>> GetTbUserLoginsView(DatatableGLB datatableGLB)
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
				var dataGrid = await _getTbUserLoginsView.GetAllByWhere(new GetAllByWhereGLB()
				{
					TableOrViewName = "TbUserLoginsView",
					SortColumn = sortInformation,
					WhereConditions = whereConditionStatement,
					LimitStart = datatableGLB.start,
					LimitEnd = rowSize
				});
		
				var dataGridCount = await _getTotalRecordCountGLB.CountAllByWhere(new CountAllByWhereGLB()
				{
					TableOrViewName = "TbUserLoginsView",
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

		#region GetTbUserLoginAutoCompletion
		[HttpGet("GetTbUserLoginAutoCompletion")]
		public async Task<ActionResult<IEnumerable<object>>> GetTbUserLoginAutoCompleteSuggestion(string column, string value)
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
					TableOrViewName = "TbUserLoginsView"
				});
		
				#endregion database query code
				return Ok(autoSuggestions);
			}
			#endregion Call Repository Function
			return Ok();
		}
		#endregion

		#region GetTbUserLogins
		[HttpGet]
		public async Task<ActionResult<IEnumerable<TbUserLogin>>> GetTbUserLogins()
		{
			try
			{
				return await _context.TbUserLogins.ToListAsync();
			}
			catch (Exception ex)
			{
				return StatusCode(500, "API response failed.");
			}
		}
		#endregion

		#region TbUserLoginById
		[HttpGet("{id}")]
		public async Task<ActionResult<TbUserLogin>> GetTbUserLogin(int id)
		{
			var objTbUserLogin = new TbUserLogin();
			try
			{
				objTbUserLogin = await _context.TbUserLogins.Where(d => d.Id == id).FirstOrDefaultAsync();
		
				if (objTbUserLogin == null)
				{
					return StatusCode(404, "Data not found.");
				}
		
				return objTbUserLogin;
			}
			catch (Exception ex)
			{
				return StatusCode(500, "API response failed.");
			}
		}
		#endregion

		#region TbUserLoginUpdate 
		[HttpPut("{id}")]
		public async Task<IActionResult> PutTbUserLogin(int id, TbUserLogin objTbUserLogin)
		{
		
			if (id != objTbUserLogin.Id)
			{
				return StatusCode(404, "Data not found.");
			}
		
			_context.Entry(objTbUserLogin).State = EntityState.Modified;
		
			try
			{
				await _context.SaveChangesAsync();
		
			}
			catch (Exception ex)
			{
				return StatusCode(500, "API response failed.");
			}
			return StatusCode(200, objTbUserLogin);
		}
		
		#endregion

		#region TbUserLoginCreate
		[HttpPost]
		public async Task<ActionResult<TbUserLogin>> CreateTbUserLogin (TbUserLogin objTbUserLogin)
		{
			_context.TbUserLogins.Add(objTbUserLogin);
			try
			{
				await _context.SaveChangesAsync();
				return StatusCode(200, objTbUserLogin);
			}
			catch (Exception ex)
			{
				return StatusCode(500, "API response failed.");
			}
		}
		
		#endregion

		#region TbUserLoginDelete
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteTbUserLogin(int id)
		{
			var objTbUserLogin = await _context.TbUserLogins.FindAsync(id);
			if (objTbUserLogin == null)
			{
				return StatusCode(404, "Data not found");
			}
		
			_context.TbUserLogins.Remove(objTbUserLogin);
			await _context.SaveChangesAsync();
		
			return StatusCode(200, true);
		}
		
		#endregion
		
	} 
}
