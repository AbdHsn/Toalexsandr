 

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
    public class TbMenuInspectionTypesController: Controller
    {

        #region Variables
		private readonly IWebHostEnvironment _heSrv;
		private readonly EntityContext _context;
		private readonly IRawQueryRepo<TbMenuInspectionType> _TbMenuInspectionTypeContext;
		private readonly IRawQueryRepo<TbMenuInspectionTypesView> _getTbMenuInspectionTypesView;
		private readonly IRawQueryRepo<TotalRecordCountGLB> _getTotalRecordCountGLB;
		private readonly IRawQueryRepo<Object> _getAllByLike;
		#endregion

		#region Constructor
		public TbMenuInspectionTypesController(
			IWebHostEnvironment heSrv,
			EntityContext context,
			IRawQueryRepo<TbMenuInspectionType> TbMenuInspectionTypeContext,
			IRawQueryRepo<TbMenuInspectionTypesView> getTbMenuInspectionTypesView,
			IRawQueryRepo<TotalRecordCountGLB> getTotalRecordCountGLB,
			IRawQueryRepo<Object> getAllByLike
		)
		{
			_TbMenuInspectionTypeContext = TbMenuInspectionTypeContext;
			_heSrv = heSrv;
			_context = context;
			_getTbMenuInspectionTypesView = getTbMenuInspectionTypesView;
			_getTotalRecordCountGLB = getTotalRecordCountGLB;
			_getAllByLike = getAllByLike;
		}
		#endregion

		#region GetTbMenuInspectionTypeView
		[HttpPost("GetTbMenuInspectionTypesView")]
		public async Task<ActionResult<DatatableResponseGLB>> GetTbMenuInspectionTypesView(DatatableGLB datatableGLB)
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
				var dataGrid = await _getTbMenuInspectionTypesView.GetAllByWhere(new GetAllByWhereGLB()
				{
					TableOrViewName = "TbMenuInspectionTypesView",
					SortColumn = sortInformation,
					WhereConditions = whereConditionStatement,
					LimitStart = datatableGLB.start,
					LimitEnd = rowSize
				});
		
				var dataGridCount = await _getTotalRecordCountGLB.CountAllByWhere(new CountAllByWhereGLB()
				{
					TableOrViewName = "TbMenuInspectionTypesView",
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

		#region GetTbMenuInspectionTypeAutoCompletion
		[HttpGet("GetTbMenuInspectionTypeAutoCompletion")]
		public async Task<ActionResult<IEnumerable<object>>> GetTbMenuInspectionTypeAutoCompleteSuggestion(string column, string value)
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
					TableOrViewName = "TbMenuInspectionTypesView"
				});
		
				#endregion database query code
				return Ok(autoSuggestions);
			}
			#endregion Call Repository Function
			return Ok();
		}
		#endregion

		#region GetTbMenuInspectionTypes
		[HttpGet]
		public async Task<ActionResult<IEnumerable<TbMenuInspectionType>>> GetTbMenuInspectionTypes()
		{
			try
			{
				return await _context.TbMenuInspectionTypes.ToListAsync();
			}
			catch (Exception ex)
			{
				return StatusCode(500, "API response failed.");
			}
		}
		#endregion

		#region TbMenuInspectionTypeById
		[HttpGet("{id}")]
		public async Task<ActionResult<TbMenuInspectionType>> GetTbMenuInspectionType(int id)
		{
			var objTbMenuInspectionType = new TbMenuInspectionType();
			try
			{
				objTbMenuInspectionType = await _context.TbMenuInspectionTypes.Where(d => d.Id == id).FirstOrDefaultAsync();
		
				if (objTbMenuInspectionType == null)
				{
					return StatusCode(404, "Data not found.");
				}
		
				return objTbMenuInspectionType;
			}
			catch (Exception ex)
			{
				return StatusCode(500, "API response failed.");
			}
		}
		#endregion

		#region TbMenuInspectionTypeUpdate 
		[HttpPut("{id}")]
		public async Task<IActionResult> PutTbMenuInspectionType(int id, TbMenuInspectionType objTbMenuInspectionType)
		{
		
			if (id != objTbMenuInspectionType.Id)
			{
				return StatusCode(404, "Data not found.");
			}
		
			_context.Entry(objTbMenuInspectionType).State = EntityState.Modified;
		
			try
			{
				await _context.SaveChangesAsync();
		
			}
			catch (Exception ex)
			{
				return StatusCode(500, "API response failed.");
			}
			return StatusCode(200, objTbMenuInspectionType);
		}
		
		#endregion

		#region TbMenuInspectionTypeCreate
		[HttpPost]
		public async Task<ActionResult<TbMenuInspectionType>> CreateTbMenuInspectionType (TbMenuInspectionType objTbMenuInspectionType)
		{
			_context.TbMenuInspectionTypes.Add(objTbMenuInspectionType);
			try
			{
				await _context.SaveChangesAsync();
				return StatusCode(200, objTbMenuInspectionType);
			}
			catch (Exception ex)
			{
				return StatusCode(500, "API response failed.");
			}
		}
		
		#endregion

		#region TbMenuInspectionTypeDelete
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteTbMenuInspectionType(int id)
		{
			var objTbMenuInspectionType = await _context.TbMenuInspectionTypes.FindAsync(id);
			if (objTbMenuInspectionType == null)
			{
				return StatusCode(404, "Data not found");
			}
		
			_context.TbMenuInspectionTypes.Remove(objTbMenuInspectionType);
			await _context.SaveChangesAsync();
		
			return StatusCode(200, true);
		}
		
		#endregion
		
	} 
}
