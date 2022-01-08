 

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
    public class ATbImagesController: Controller
    {

        #region Variables
		private readonly IWebHostEnvironment _heSrv;
		private readonly EntityContext _context;
		private readonly IRawQueryRepo<ATbImage> _ATbImageContext;
		private readonly IRawQueryRepo<ATbImagesView> _getATbImagesView;
		private readonly IRawQueryRepo<TotalRecordCountGLB> _getTotalRecordCountGLB;
		private readonly IRawQueryRepo<Object> _getAllByLike;
		#endregion

		#region Constructor
		public ATbImagesController(
			IWebHostEnvironment heSrv,
			EntityContext context,
			IRawQueryRepo<ATbImage> ATbImageContext,
			IRawQueryRepo<ATbImagesView> getATbImagesView,
			IRawQueryRepo<TotalRecordCountGLB> getTotalRecordCountGLB,
			IRawQueryRepo<Object> getAllByLike
		)
		{
			_ATbImageContext = ATbImageContext;
			_heSrv = heSrv;
			_context = context;
			_getATbImagesView = getATbImagesView;
			_getTotalRecordCountGLB = getTotalRecordCountGLB;
			_getAllByLike = getAllByLike;
		}
		#endregion

		#region GetATbImageView
		[HttpPost("GetATbImagesView")]
		public async Task<ActionResult<DatatableResponseGLB>> GetATbImagesView(DatatableGLB datatableGLB)
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
				var dataGrid = await _getATbImagesView.GetAllByWhere(new GetAllByWhereGLB()
				{
					TableOrViewName = "ATbImagesView",
					SortColumn = sortInformation,
					WhereConditions = whereConditionStatement,
					LimitStart = datatableGLB.start,
					LimitEnd = rowSize
				});
		
				var dataGridCount = await _getTotalRecordCountGLB.CountAllByWhere(new CountAllByWhereGLB()
				{
					TableOrViewName = "ATbImagesView",
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

		#region GetATbImageAutoCompletion
		[HttpGet("GetATbImageAutoCompletion")]
		public async Task<ActionResult<IEnumerable<object>>> GetATbImageAutoCompleteSuggestion(string column, string value)
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
					TableOrViewName = "ATbImagesView"
				});
		
				#endregion database query code
				return Ok(autoSuggestions);
			}
			#endregion Call Repository Function
			return Ok();
		}
		#endregion

		#region GetATbImages
		[HttpGet]
		public async Task<ActionResult<IEnumerable<ATbImage>>> GetATbImages()
		{
			try
			{
				return await _context.ATbImages.ToListAsync();
			}
			catch (Exception ex)
			{
				return StatusCode(500, "API response failed.");
			}
		}
		#endregion

		#region ATbImageById
		[HttpGet("{id}")]
		public async Task<ActionResult<ATbImage>> GetATbImage(int id)
		{
			var objATbImage = new ATbImage();
			try
			{
				objATbImage = await _context.ATbImages.Where(d => d.Id == id).FirstOrDefaultAsync();
		
				if (objATbImage == null)
				{
					return StatusCode(404, "Data not found.");
				}
		
				return objATbImage;
			}
			catch (Exception ex)
			{
				return StatusCode(500, "API response failed.");
			}
		}
		#endregion

		#region ATbImageUpdate 
		[HttpPut("{id}")]
		public async Task<IActionResult> PutATbImage(int id, ATbImage objATbImage)
		{
		
			if (id != objATbImage.Id)
			{
				return StatusCode(404, "Data not found.");
			}
		
			_context.Entry(objATbImage).State = EntityState.Modified;
		
			try
			{
				await _context.SaveChangesAsync();
		
			}
			catch (Exception ex)
			{
				return StatusCode(500, "API response failed.");
			}
			return StatusCode(200, objATbImage);
		}
		
		#endregion

		#region ATbImageCreate
		[HttpPost]
		public async Task<ActionResult<ATbImage>> CreateATbImage (ATbImage objATbImage)
		{
			_context.ATbImages.Add(objATbImage);
			try
			{
				await _context.SaveChangesAsync();
				return StatusCode(200, objATbImage);
			}
			catch (Exception ex)
			{
				return StatusCode(500, "API response failed.");
			}
		}
		
		#endregion

		#region ATbImageDelete
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteATbImage(int id)
		{
			var objATbImage = await _context.ATbImages.FindAsync(id);
			if (objATbImage == null)
			{
				return StatusCode(404, "Data not found");
			}
		
			_context.ATbImages.Remove(objATbImage);
			await _context.SaveChangesAsync();
		
			return StatusCode(200, true);
		}
		
		#endregion
		
	} 
}
