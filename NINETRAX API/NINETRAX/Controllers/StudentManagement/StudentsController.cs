//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using NINETRAX.Globals.Models;


//namespace NINETRAX.Controllers.StudentManagement
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class StudentsController : ControllerBase
//    {
//        private readonly QualityDB_DevContext _context;
//        public List<Student> Students { get; set; }

        

//public StudentsController(QualityDB_DevContext context)
//        {
//            _context = context;
//            this.Students = new List<Student> {
//                new Student { Id = 1, Name = "Trina", Address = "Uttaraa", Class = "Six", Rollno = "01" },
//                new Student { Id = 2, Name = "Rina", Address = "Gulshan", Class = "Nine", Rollno = "02" },
//                new Student { Id = 3, Name = "Jesika", Address = "Mirpur", Class = "Four", Rollno = "11" },
//                new Student { Id = 4, Name = "Tonni", Address = "Mirpur", Class = "Four", Rollno = "18" },
//                new Student { Id = 5, Name = "Zerin", Address = "Badda", Class = "One", Rollno = "10" },
//                new Student { Id = 6, Name = "Tabassum", Address = "Badda", Class = "Four", Rollno = "32" },
//                new Student { Id = 7, Name = "Tahmina", Address = "Uttaraa", Class = "One", Rollno = "32" },
//                new Student { Id = 8, Name = "Shayla", Address = "Badda", Class = "Nine", Rollno = "10" },
//                new Student { Id = 9, Name = "Popy", Address = "Mirpur", Class = "Four", Rollno = "10" },
//                new Student { Id = 10, Name = "Liza", Address = "Badda", Class = "One", Rollno = "10" },
//                new Student { Id = 11, Name = "Tanha", Address = "Gulshan", Class = "Nine", Rollno = "10" },
//                new Student { Id = 12, Name = "Rosy", Address = "Badda", Class = "One", Rollno = "10" },
//                new Student { Id = 13, Name = "Afruza", Address = "Uttaraa", Class = "Four", Rollno = "32" },
//                new Student { Id = 14, Name = "Shahida", Address = "Uttaraa", Class = "One", Rollno = "10" },
//                new Student { Id = 15, Name = "Salsabil", Address = "Badda", Class = "Four", Rollno = "17" },
//                new Student { Id = 16, Name = "Jerin", Address = "Uttaraa", Class = "One", Rollno = "17" },
//            };
//        }

//        // GET: api/Students
//        [HttpGet]
//        public async Task<ActionResult<IEnumerable<Student>>> GetStudent()
//        {
//            return this.Students;
//        }

//        #region Fetch DataGrid
//        [HttpPost("FetchStudentGrid")]
//        public async Task<ActionResult<DataTableResponseVW>> StudentGrid([FromBody] DataTableVW dataTableVW)
//        {
//            DataTableResponseVW response = new DataTableResponseVW();
//            try
//            {
//                string searchText = "";
//                if (dataTableVW.search != null)
//                {
//                    searchText = dataTableVW.search.value;
//                }

//                #region single sort code
//                string sortInformAtion = "";

//                if (dataTableVW.order != null && dataTableVW.order.Count > 0)
//                {
//                    if (dataTableVW.columns != null && dataTableVW.columns.Count > 0)
//                    {
//                        sortInformAtion = dataTableVW.columns[dataTableVW.order[0].column].data + " " + dataTableVW.order[0].dir;
//                    }
//                }
//                if (string.IsNullOrEmpty(sortInformAtion))
//                {
//                    sortInformAtion = "Id desc";
//                }
//                #endregion single sort code

//                string error = "";

//                string whereConditionStatement = default(string);
//                foreach (var a in dataTableVW.searches)
//                {
//                    if (a.search_by == "Id" && !string.IsNullOrEmpty(a.value))
//                    {
//                        whereConditionStatement += a.search_by + " = '" + a.value + "' and ";
//                        break;
//                    }
                    
//                    else if (!string.IsNullOrEmpty(a.value))
//                        whereConditionStatement += a.search_by + " = '" + a.value + "' and ";

//                }

//                if (!string.IsNullOrEmpty(whereConditionStatement))
//                {
//                    whereConditionStatement = whereConditionStatement.Substring(0, whereConditionStatement.Length - 4);
//                }


//                //DataTable dataTable = await _RideService.GetAllByWhere("getAllRideView2", whereConditionStatement, sortInformAtion, dataTableVW.start, dataTableVW.length);
//                //DataTable summableData = await _RideService.SumAllByWhere("getAllRideView2", whereConditionStatement, sortInformAtion);

//                //var lstOfData = DataTableToListHelper.DataTableToList<GetAllRideSpEntity>(dataTable);
//                //var lstOfSummedData = DataTableToListHelper.DataTableToList<GetAllRideSpEntity>(summableData);
//                var singlePageData = new List<Student>();
//                if (dataTableVW.length != "All")
//                {
//                    singlePageData = Students.Skip(dataTableVW.start).Take((int)dataTableVW.length).ToList();
//                }

//                singlePageData = Students;


//                response.data = singlePageData;
//                response.draw = dataTableVW.draw;
//                response.error = error;
//                if (Students != null && Students.Count() > 0)
//                {
//                    //r.sumdata = new SumAllRidesView()
//                    //{
//                    //    SumOfAmount = lstOfSummedData.Sum(s => s.Amount),
//                    //    SumOfTotalAmount = lstOfSummedData.Sum(s => s.TotalAmount),
//                    //    SumOfPromocodeAmount = lstOfSummedData.Sum(s => s.PromocodeAmount),
//                    //    SumOfDriverEarning = lstOfSummedData.Sum(s => s.DriverEarning),
//                    //    SumOfFleetOwnerEarning = lstOfSummedData.Sum(s => s.FleetOwnerEarning),
//                    //    SumOfOwnerEarning = lstOfSummedData.Sum(s => s.OwnerEarning),
//                    //};
//                    response.recordsTotal = Students != null ? Students.Count() : 0;
//                    response.recordsFiltered = response.recordsTotal;
//                }
//            }
//            catch (Exception ex)
//            {
//                throw new Exception(ex.Message + ex.StackTrace);
//            }
//            return response;
//        }
//        #endregion

//        #region AutoCompletion Suggestion
//        [HttpGet("GetAutoCompleteStudentGrid")]
//        public async Task<ActionResult<IEnumerable<object>>> GetAutoCompleteSuggestion(string column, string value)
//        {
//            #region CallServiceFunction
//            if (!string.IsNullOrEmpty(column) && !string.IsNullOrEmpty(value))
//            {
//                //var returnObject = await _authorizedRoleSrv.GetAutoCompleteSuggestions(new GetAllByLikeGLB()
//                //{
//                //    ColumnName = column,
//                //    ColumnValue = value
//                //});
//                //return Ok(returnObject);

//                if (column == "Id")
//                    return Ok(this.Students.Where(w => w.Id.ToString().Contains(value)).Select(s => s.Id));

//                if (column == "Name")
//                    return Ok(this.Students.Where(w => w.Name.Contains(value)).Select(s => s.Name));
                
//                if (column == "Address")
//                    return Ok(this.Students.Where(w => w.Address.Contains(value)).Select(s => s.Address));
//            }
//            #endregion CallServiceFunction
//            return Ok();
//        }
//        #endregion AutoCompletion Suggestion

//        // GET: api/Students/5
//        [HttpGet("{id}")]
//        public async Task<ActionResult<Student>> GetStudent(long id)
//        {
//            var student = await _context.Student.FindAsync(id);

//            if (student == null)
//            {
//                return NotFound();
//            }

//            return student;
//        }

//        // PUT: api/Students/5
//        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
//        [HttpPut("{id}")]
//        public async Task<IActionResult> PutStudent(long id, Student student)
//        {
//            if (id != student.Id)
//            {
//                return BadRequest();
//            }

//            _context.Entry(student).State = EntityState.Modified;

//            try
//            {
//                await _context.SaveChangesAsync();
//            }
//            catch (DbUpdateConcurrencyException)
//            {
//                if (!StudentExists(id))
//                {
//                    return NotFound();
//                }
//                else
//                {
//                    throw;
//                }
//            }

//            return NoContent();
//        }

//        // POST: api/Students
//        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
//        [HttpPost]
//        public async Task<ActionResult<Student>> PostStudent(Student student)
//        {
//            _context.Student.Add(student);
//            await _context.SaveChangesAsync();

//            return CreatedAtAction("GetStudent", new { id = student.Id }, student);
//        }

//        // DELETE: api/Students/5
//        [HttpDelete("{id}")]
//        public async Task<IActionResult> DeleteStudent(long id)
//        {
//            var student = await _context.Student.FindAsync(id);
//            if (student == null)
//            {
//                return NotFound();
//            }

//            _context.Student.Remove(student);
//            await _context.SaveChangesAsync();

//            return NoContent();
//        }

//        private bool StudentExists(long id)
//        {
//            return _context.Student.Any(e => e.Id == id);
//        }
//    }
//}
