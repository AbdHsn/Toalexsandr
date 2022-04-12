using DataLayer.Models.EntityModels;
using DataLayer.Models.GlobalModels;
using DataLayer.Models.SPModels;
using DataLayer.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using NINETRAX.Globals;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;
using RepositoryLayer;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace NINETRAX.Controllers.DbManagement
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {

        #region Variables
        private readonly IWebHostEnvironment _heSrv;
        private readonly EntityContext _context;
        private readonly IRawQueryRepo<ATbNasinspection> _ATbNasinspectionContext;
        private readonly IRawQueryRepo<TotalRecordCountGLB> _getTotalRecordCountGLB;
        private readonly IRawQueryRepo<Object> _getAllByLike;
        private readonly IRawQueryRepo<GetDailyInspectionReport> _getDailyInspectionReport;
        private readonly IConfiguration _configuration;
        #endregion

        #region Constructor
        public AuthController(
            IWebHostEnvironment heSrv,
            EntityContext context,
            IRawQueryRepo<ATbNasinspection> ATbNasinspectionContext,
            IRawQueryRepo<TotalRecordCountGLB> getTotalRecordCountGLB,
            IRawQueryRepo<Object> getAllByLike,
            IConfiguration configuration,
                   IRawQueryRepo<GetDailyInspectionReport> getDailyInspectionReport
        )
        {
            _ATbNasinspectionContext = ATbNasinspectionContext;
            _heSrv = heSrv;
            _context = context;
            _getTotalRecordCountGLB = getTotalRecordCountGLB;
            _getAllByLike = getAllByLike;
            _getDailyInspectionReport = getDailyInspectionReport;
            _configuration = configuration;
        }
        #endregion

        #region MyRegion
        [AllowAnonymous]
        [HttpPost]
        public ActionResult LoginRequest(TbUser user)
        {
            var getUser = AuthenticateUser(user);

            if (getUser != null)
            {
                var newToken = GenerateWebToken(getUser);
                return StatusCode(200, new { Id = getUser.Id, UserTpe = getUser.AccessType, Email = user.Email, Token = newToken });
                //return Ok();
            }
            return StatusCode(403, "Credential does not matched!");
        }

        private string GenerateWebToken(TbUser user)
        {
            try
            {
                //add claims
                var newClaims = new List<Claim>();
                newClaims.Add(new Claim(JwtRegisteredClaimNames.NameId, user.Id.ToString()));
                newClaims.Add(new Claim(JwtRegisteredClaimNames.GivenName, String.Concat(user.FirstName, " ", user.LastName).ToString()));
                newClaims.Add(new Claim(JwtRegisteredClaimNames.Email, user.Email));
                //claims.Add(new Claim(ClaimTypes.Role, user.UserTpe.ToString()));

                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("Jwt:Key").Value));
                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha512Signature);

                var token = new JwtSecurityToken(
                  claims: newClaims,
                  expires: DateTime.Now.AddHours(1),
                  signingCredentials: credentials);

                return new JwtSecurityTokenHandler().WriteToken(token);
            }
            catch (Exception ex)
            {
                return "Failed to generate token";
            }

        }

        private TbUser AuthenticateUser(TbUser user)
        {
            var getUser = _context.TbUsers.Where(u => u.LoginId == user.LoginId && u.Password == user.Password).SingleOrDefault();
            return getUser;
        }
        #endregion
    }
}