//using DataLayer.Models.EntityModels;
//using DataLayer.Models.GlobalModels;
//using DataLayer.Models.SPModels;
//using DataLayer.Models.ViewModels;
//using Microsoft.AspNetCore.Hosting;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using Microsoft.IdentityModel.Tokens;
//using NINETRAX.Globals;
//using NPOI.SS.UserModel;
//using NPOI.XSSF.UserModel;
//using RepositoryLayer;
//using System;
//using System.Collections.Generic;
//using System.IdentityModel.Tokens.Jwt;
//using System.Linq;
//using System.Security.Claims;
//using System.Text;
//using System.Threading.Tasks;

//namespace NINETRAX.Controllers.DbManagement
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class AuthController : Controller
//    {

//        #region Variables
//        private readonly IWebHostEnvironment _heSrv;
//        private readonly EntityContext _context;
//        private readonly IRawQueryRepo<ATbNasinspection> _ATbNasinspectionContext;
//        private readonly IRawQueryRepo<TotalRecordCountGLB> _getTotalRecordCountGLB;
//        private readonly IRawQueryRepo<Object> _getAllByLike;
//        private readonly IRawQueryRepo<GetDailyInspectionReport> _getDailyInspectionReport;

//        #endregion

//        #region Constructor
//        public AuthController(
//            IWebHostEnvironment heSrv,
//            EntityContext context,
//            IRawQueryRepo<ATbNasinspection> ATbNasinspectionContext,
//            IRawQueryRepo<TotalRecordCountGLB> getTotalRecordCountGLB,
//            IRawQueryRepo<Object> getAllByLike,
//                   IRawQueryRepo<GetDailyInspectionReport> getDailyInspectionReport
//        )
//        {
//            _ATbNasinspectionContext = ATbNasinspectionContext;
//            _heSrv = heSrv;
//            _context = context;
//            _getTotalRecordCountGLB = getTotalRecordCountGLB;
//            _getAllByLike = getAllByLike;
//            _getDailyInspectionReport = getDailyInspectionReport;
//        }
//        #endregion

//        #region MyRegion
//                [AllowAnonymous]
//        [HttpGet]
//        public IActionResult Login(string email, string password)
//        {
//            var user = new User { Email = email, Password = password };
//            var getUser = AuthenticateUser(user);

//            if (getUser != null)
//            {
//                var tokenString = GenerateWebToken(getUser);
//                return Ok(new {Id = getUser.Id, UserTpe = getUser.UserTpe, Email=user.Email, Token = tokenString });
//            }

//            return BadRequest("Email or Password doesn't matched!");
//        }

//        private string GenerateWebToken(TbUser user)
//        {
//            try
//            {
//                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_settings.Value.Key));
//                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

//                //add claims
//                var claims = new List<Claim>();
//                claims.Add(new Claim(JwtRegisteredClaimNames.NameId, user.Id.ToString()));
//                claims.Add(new Claim(JwtRegisteredClaimNames.GivenName, String.Concat(user.FirstName, " ", user.LastName).ToString()));
//                claims.Add(new Claim(JwtRegisteredClaimNames.Email, user.Email));
//                claims.Add(new Claim(ClaimTypes.Role, user.UserTpe.ToString()));

//                var token = new JwtSecurityToken(_settings.Value.Issuer,
//                  _settings.Value.Audience,
//                  claims,
//                  expires: DateTime.Now.AddHours(24),
//                  signingCredentials: credentials);
//                  return new JwtSecurityTokenHandler().WriteToken(token);
//            }
//            catch (Exception ex)
//            {
//                return "Failed to generate token";
//            }

//        }

//        private User AuthenticateUser(User login)
//        {
//            var getUser = _context.Users.Where(u => u.Email == login.Email && u.Password == login.Password).SingleOrDefault();
//            return getUser;
//        }
//        #endregion
//    }
//}
