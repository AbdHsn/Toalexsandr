 

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
    public class TblPdrtemplatesController: Controller
    {

        #region Variables
		private readonly IWebHostEnvironment _heSrv;
		private readonly EntityContext _context;
		private readonly IRawQueryRepo<TblPdrtemplate> _TblPdrtemplateContext;
		private readonly IRawQueryRepo<TblPdrtemplatesView> _getTblPdrtemplatesView;
		private readonly IRawQueryRepo<TotalRecordCountGLB> _getTotalRecordCountGLB;
		private readonly IRawQueryRepo<Object> _getAllByLike;
		#endregion

		#region Constructor
		public TblPdrtemplatesController(
			IWebHostEnvironment heSrv,
			EntityContext context,
			IRawQueryRepo<TblPdrtemplate> TblPdrtemplateContext,
			IRawQueryRepo<TblPdrtemplatesView> getTblPdrtemplatesView,
			IRawQueryRepo<TotalRecordCountGLB> getTotalRecordCountGLB,
			IRawQueryRepo<Object> getAllByLike
		)
		{
			_TblPdrtemplateContext = TblPdrtemplateContext;
			_heSrv = heSrv;
			_context = context;
			_getTblPdrtemplatesView = getTblPdrtemplatesView;
			_getTotalRecordCountGLB = getTotalRecordCountGLB;
			_getAllByLike = getAllByLike;
		}
		#endregion

		#region GetTblPdrtemplateView
		[HttpPost("GetTblPdrtemplatesView")]
		public async Task<ActionResult<DatatableResponseGLB>> GetTblPdrtemplatesView(DatatableGLB datatableGLB)
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
				var dataGrid = await _getTblPdrtemplatesView.GetAllByWhere(new GetAllByWhereGLB()
				{
					TableOrViewName = "TblPdrtemplatesView",
					SortColumn = sortInformation,
					WhereConditions = whereConditionStatement,
					LimitStart = datatableGLB.start,
					LimitEnd = rowSize
				});
		
				var dataGridCount = await _getTotalRecordCountGLB.CountAllByWhere(new CountAllByWhereGLB()
				{
					TableOrViewName = "TblPdrtemplatesView",
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

		#region GetTblPdrtemplateAutoCompletion
		[HttpGet("GetTblPdrtemplateAutoCompletion")]
		public async Task<ActionResult<IEnumerable<object>>> GetTblPdrtemplateAutoCompleteSuggestion(string column, string value)
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
					TableOrViewName = "TblPdrtemplatesView"
				});
		
				#endregion database query code
				return Ok(autoSuggestions);
			}
			#endregion Call Repository Function
			return Ok();
		}
		#endregion

		#region GetTblPdrtemplates
		[HttpGet]
		public async Task<ActionResult<IEnumerable<TblPdrtemplate>>> GetTblPdrtemplates()
		{
			try
			{
				return await _context.TblPdrtemplates.ToListAsync();
			}
			catch (Exception ex)
			{
				return StatusCode(500, "API response failed.");
			}
		}
		#endregion

		#region TblPdrtemplateById
		[HttpGet("{id}")]
		public async Task<ActionResult<TblPdrtemplate>> GetTblPdrtemplate(int id)
		{
			var objTblPdrtemplate = new TblPdrtemplate();
			try
			{
				objTblPdrtemplate = await _context.TblPdrtemplates.Where(d => d.Id == id).FirstOrDefaultAsync();
		
				if (objTblPdrtemplate == null)
				{
					return StatusCode(404, "Data not found.");
				}
		
				return objTblPdrtemplate;
			}
			catch (Exception ex)
			{
				return StatusCode(500, "API response failed.");
			}
		}
		#endregion

		#region TblPdrtemplateUpdate 
		[HttpPut("{id}")]
		public async Task<IActionResult> PutTblPdrtemplate(int id, TblPdrtemplate objTblPdrtemplate)
		{
		
			if (id != objTblPdrtemplate.Id)
			{
				return StatusCode(404, "Data not found.");
			}
		
			_context.Entry(objTblPdrtemplate).State = EntityState.Modified;
		
			try
			{
				await _context.SaveChangesAsync();
		
			}
			catch (Exception ex)
			{
				return StatusCode(500, "API response failed.");
			}
			return StatusCode(200, objTblPdrtemplate);
		}
		
		#endregion

		#region TblPdrtemplateCreate
		[HttpPost]
		public async Task<ActionResult<TblPdrtemplate>> CreateTblPdrtemplate (TblPdrtemplate objTblPdrtemplate)
		{
			_context.TblPdrtemplates.Add(objTblPdrtemplate);
			try
			{
				await _context.SaveChangesAsync();
				return StatusCode(200, objTblPdrtemplate);
			}
			catch (Exception ex)
			{
				return StatusCode(500, "API response failed.");
			}
		}
		
		#endregion

		#region TblPdrtemplateDelete
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteTblPdrtemplate(int id)
		{
			var objTblPdrtemplate = await _context.TblPdrtemplates.FindAsync(id);
			if (objTblPdrtemplate == null)
			{
				return StatusCode(404, "Data not found");
			}
		
			_context.TblPdrtemplates.Remove(objTblPdrtemplate);
			await _context.SaveChangesAsync();
		
			return StatusCode(200, true);
		}
		
		#endregion
		
	} 
}
