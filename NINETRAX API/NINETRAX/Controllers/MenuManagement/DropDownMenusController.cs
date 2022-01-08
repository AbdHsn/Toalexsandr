//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using NINETRAX.Models.EntityModels;

//namespace NINETRAX.Controllers.MenuManagement
//{
//    [Route("api/menumanagement/[controller]")]
//    [ApiController]
//    public class DropDownMenusController : ControllerBase
//    {
//        private readonly QualityDB_DevContext _context;

//        public DropDownMenusController(QualityDB_DevContext context)
//        {
//            _context = context;
//        }

//        // GET: api/DropDownMenus
//        [HttpGet]
//        public async Task<ActionResult<IEnumerable<TbDropDownMenu>>> GetTbDropDownMenus()
//        {
//            return await _context.TbDropDownMenus.ToListAsync();
//        }

//        // GET: api/DropDownMenus/5
//        [HttpGet("{id}")]
//        public async Task<ActionResult<TbDropDownMenu>> GetTbDropDownMenu(int id)
//        {
//            var tbDropDownMenu = await _context.TbDropDownMenus.FindAsync(id);

//            if (tbDropDownMenu == null)
//            {
//                return NotFound();
//            }

//            return tbDropDownMenu;
//        }

//        // PUT: api/DropDownMenus/5
//        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
//        [HttpPut("{id}")]
//        public async Task<IActionResult> PutTbDropDownMenu(int id, TbDropDownMenu tbDropDownMenu)
//        {
//            if (id != tbDropDownMenu.Id)
//            {
//                return BadRequest();
//            }

//            _context.Entry(tbDropDownMenu).State = EntityState.Modified;

//            try
//            {
//                await _context.SaveChangesAsync();
//            }
//            catch (DbUpdateConcurrencyException)
//            {
//                if (!TbDropDownMenuExists(id))
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

//        // POST: api/DropDownMenus
//        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
//        [HttpPost]
//        public async Task<ActionResult<TbDropDownMenu>> PostTbDropDownMenu(TbDropDownMenu tbDropDownMenu)
//        {
//            _context.TbDropDownMenus.Add(tbDropDownMenu);
//            try
//            {
//                await _context.SaveChangesAsync();
//            }
//            catch (DbUpdateException)
//            {
//                if (TbDropDownMenuExists(tbDropDownMenu.Id))
//                {
//                    return Conflict();
//                }
//                else
//                {
//                    throw;
//                }
//            }

//            return CreatedAtAction("GetTbDropDownMenu", new { id = tbDropDownMenu.Id }, tbDropDownMenu);
//        }

//        // DELETE: api/DropDownMenus/5
//        [HttpDelete("{id}")]
//        public async Task<IActionResult> DeleteTbDropDownMenu(int id)
//        {
//            var tbDropDownMenu = await _context.TbDropDownMenus.FindAsync(id);
//            if (tbDropDownMenu == null)
//            {
//                return NotFound();
//            }

//            _context.TbDropDownMenus.Remove(tbDropDownMenu);
//            await _context.SaveChangesAsync();

//            return NoContent();
//        }

//        private bool TbDropDownMenuExists(int id)
//        {
//            return _context.TbDropDownMenus.Any(e => e.Id == id);
//        }
//    }
//}
