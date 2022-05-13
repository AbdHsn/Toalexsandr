

using DataLayer.Models.EntityModels;
using DataLayer.Models.GlobalModels;
using DataLayer.Models.ViewModels;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RepositoryLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NINETRAX.Controllers.DbManagement
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommonController : Controller
    {

        #region Variables
        private readonly IWebHostEnvironment _heSrv;
        private readonly EntityContext _context;
        #endregion

        #region Constructor
        public CommonController(
            IWebHostEnvironment heSrv,
            EntityContext context
        )
        {
            _heSrv = heSrv;
            _context = context;
        }
        #endregion

        #region GetIDIQ Wotypes DDL

        [HttpGet("GetDropDownMenuDDL")]
        public async Task<ActionResult<IEnumerable<object>>> GetDropDownMenuDDL(string ddlIndicator)
        {
            #region DropDownList Fetching Codes
            if (!string.IsNullOrEmpty(ddlIndicator))
            {
               var getDropDownMenu = await _context.TbDropDownMenus.ToListAsync();

                var returnLst = new object();

                switch (ddlIndicator.ToUpper())
                {
                    case "SITE":
                        returnLst = new List<object>()
                        {  
                           new { value= "NASJAX", label= "NASJAX" },
                           new { value= "BUMED", label= "BUMED" }
                        };
                        break;
                    case "ISTASKCOMPLETED":
                        returnLst = new List<object>()
                        {  
                           new { value= "YES", label= "YES" },
                           new { value= "NO", label= "NO" }
                        };
                        break;
                    case "ISTASKCOMPLETEDONTIME":
                        returnLst = new List<object>()
                        {
                            new { value = "ON TIME", label = "ON TIME" },
                            new { value = "LATE", label = "LATE" },
                        };
                        break;

                    case "SUBCONTRACTORINHOUSE":
                        returnLst = new List<object>()
                        {  
                           new { value= "In house", label= "In house" },
                           new { value= "Subcontractor", label= "Subcontractor" }
                        };
                        break;
                    case "WOSTATUS":
                        returnLst = new List<object>()
                        {
                            new { value = "OPEN", label = "OPEN" },
                            new { value = "CLOSED", label = "CLOSED" },
                            new { value = "WAITING", label = "WAITING" },
                            new { value = "COMPLETION", label = "COMPLETION" },
                        };
                        break;
                    case "VALIDNONVALID":
                        returnLst = new List<object>()
                        {
                           new { value= "VALID", label= "VALID" },
                           new { value= "NON-VALID", label= "NON-VALID" }
                        };
                        break;
                    case "NCRASSESSMENTTYPE":
                        returnLst = new List<object>()
                        {
                           new { value= "INSPECTION", label= "INSPECTION" },
                           new { value= "SURVEILLANCE", label= "SURVEILLANCE" },
                           new { value= "ASSESSMENT", label= "ASSESSMENT" },
                           new { value= "OTHER", label= "OTHER" }
                        };
                        break;
                    case "NONCONFORMANCETYPE":
                        returnLst = new List<object>()
                        {
                           new { value= "SERVICE/PROCESS", label= "SERVICE/PROCESS" },
                           new { value= "ITEM", label= "ITEM" }
                        };
                        break;
                    case "NCRSTATUS":
                        returnLst = new List<object>()
                        {
                           new { value= "OPEN", label= "OPEN" },
                           new { value= "CLOSED", label= "CLOSED" },
                           new { value= "RESCINDED", label= "RESCINDED" }
                        };
                        break;
                    case "ESTIMATORS":
                        returnLst = getDropDownMenu.Where(w => w.Estimators != null).Select(s => new { label = s.Estimators, value = s.Estimators });
                        break;
                    case "JAXPAR":
                        returnLst = getDropDownMenu.Where(w => w.JaxPar != null).Select(s => new { label = s.JaxPar, value = s.JaxPar });
                        break;
                    case "CCRSTATUSMENU":
                        returnLst = getDropDownMenu.Where(w => w.CcrstatusMenu != null).Select(s => new { label = s.CcrstatusMenu, value = s.CcrstatusMenu });
                        break;
                    case "VALIDITY":
                        returnLst = getDropDownMenu.Where(w => w.Validity != null).Select(s => new { label = s.Validity, value = s.Validity });
                        break;     
                    case "CAUSECODE":
                        returnLst = getDropDownMenu.Where(w => w.CauseCode != null).Select(s => new { label = s.CauseCode, value = s.CauseCode });
                        break;     
                    case "ROOTCAUSE":
                        returnLst = getDropDownMenu.Where(w => w.RootCause != null).Select(s => new { label = s.RootCause, value = s.RootCause });
                        break;     
                    case "CORRECTIVEACTION":
                        returnLst = getDropDownMenu.Where(w => w.CorrectiveAction != null).Select(s => new { label = s.CorrectiveAction, value = s.CorrectiveAction });
                        break;     
                    case "QCSTATUS":
                        returnLst = getDropDownMenu.Where(w => w.Qcstatus != null).Select(s => new { label = s.Qcstatus, value = s.Qcstatus });
                        break;     
                    case "PDRSTATUSMENU":
                        returnLst = getDropDownMenu.Where(w => w.PdrstatusMenu != null).Select(s => new { label = s.PdrstatusMenu, value = s.PdrstatusMenu });
                        break;     
                    case "PAWSTATUSMENU":
                        returnLst = getDropDownMenu.Where(w => w.PawstatusMenu != null).Select(s => new { label = s.PawstatusMenu, value = s.PawstatusMenu });
                        break;     
                    case "PAWRATING":
                        returnLst = getDropDownMenu.Where(w => w.Pawrating != null).Select(s => new { label = s.Pawrating, value = s.Pawrating });
                        break;     
                    case "PAWASSESSMENT":
                        returnLst = getDropDownMenu.Where(w => w.PawAssessment != null).Select(s => new { label = s.PawAssessment, value = s.PawAssessment });
                        break;     
                    case "QCTECHS":
                        returnLst = getDropDownMenu.Where(w => w.Qctechs != null).Select(s => new { label = s.Qctechs, value = s.Qctechs });
                        break;     
                    case "MPTPAR":
                        returnLst = getDropDownMenu.Where(w => w.MptPar != null).Select(s => new { label = s.MptPar, value = s.MptPar });
                        break;    
                    case "MPTASGNCODE":
                        returnLst = getDropDownMenu.Where(w => w.MptAsgnCode != null).Select(s => new { label = s.MptAsgnCode, value = s.MptAsgnCode });
                        break;     
                    case "PAWUNSAT":
                        returnLst = getDropDownMenu.Where(w => w.Pawunsat != null).Select(s => new { label = s.Pawunsat, value = s.Pawunsat });
                        break;     
                    case "PAWROOTCAUSE":
                        returnLst = getDropDownMenu.Where(w => w.PawrootCause != null).Select(s => new { label = s.PawrootCause, value = s.PawrootCause });
                        break;     
                    case "FMBLDGMANAGER":
                        returnLst = getDropDownMenu.Where(w => w.FmBldgManager != null).Select(s => new { label = s.FmBldgManager, value = s.FmBldgManager });
                        break;
                    case "WOTYPE":
                        returnLst = await _context.TbMenuIdiqWotypes.Where(w => w.Active == "Yes").Select(s => new
                        {
                            label = s.WoType,
                            value = s.WoType,
                        }).ToListAsync();
                        break;
                    case "USERS":
                        returnLst = await _context.TbUsers.Select(s => new
                        {
                            label = s.FullName,
                            value = s.FullName,
                        }).ToListAsync();
                        break;
                    case "CAUSECODE-TBL":
                        returnLst = await _context.TbMenuInspectionCauseCodes.OrderBy(o => o.Seq).Select(s => new
                        {
                            label = s.Status,
                            value = s.Status,
                        }).ToListAsync();
                        break;
                    case "ROOTCAUSE-TBL":
                        returnLst = await _context.TbMenuInspectionCauseRoots.Select(s => new
                        {
                            label = s.Status,
                            value = s.Status,
                        }).ToListAsync();
                        break;
                    case "INSPECTIONTYPES":
                        returnLst = await _context.TbMenuInspectionTypes.Select(s => new
                        {
                            label = s.Status,
                            value = s.Status,
                        }).ToListAsync();
                        break;
                    case "INSPECTIONSURVRESULTS":
                        returnLst = await _context.TbMenuInspectionSurvResults.Select(s => new
                        {
                            label = s.Status,
                            value = s.Status,
                        }).ToListAsync();
                        break;
                    case "INSPECTIONPDRSTATUS":
                        returnLst = await _context.TbMenuInspectionPdrstatuses.Select(s => new
                        {
                            label = s.Status,
                            value = s.Status,
                        }).ToListAsync();
                        break;
                    case "DIRECTORYNAMES":
                        returnLst = await _context.TbDirectoryNames.Select(s => new
                        {
                            label = s.PersonName,
                            value = s.PersonName,
                        }).ToListAsync();
                        break;
                    case "DIRECTORYNAMETITLES":
                        returnLst = await _context.TbDirectoryNames.Select(s => new
                        {
                            label = s.PersonTitle,
                            value = s.PersonTitle,
                        }).ToListAsync();
                        break;
                    case "ANNEX":
                        returnLst = await _context.ATbNasbmdannexTables.Select(s => new
                        {
                            label = s.Annex,
                            value = s.Annex,
                        }).ToListAsync();
                        break;
                    case "SPECITEM":
                        returnLst = await _context.ATbNasbmdannexTables.Select(s => new
                        {
                            label = s.SpecItem,
                            value = s.SpecItem,
                        }).ToListAsync();
                        break;
                    case "TITLE":
                        returnLst = await _context.ATbNasbmdannexTables.Select(s => new
                        {
                            label = s.Title,
                            value = s.Title,
                        }).ToListAsync();
                        break;
                    case "PAWASSESSMENT-TBL":
                        returnLst = await _context.TbMenuCustomerPawassessments.Select(s => new
                        {
                            label = s.Status,
                            value = s.Status,
                        }).ToListAsync();
                        break;
                    case "PAWSTATUS":
                        returnLst = await _context.TbMenuCustomerPawstatuses.Select(s => new
                        {
                            label = s.Status,
                            value = s.Status,
                        }).ToListAsync();
                        break;
                    case "PAWLEVEL":
                        returnLst = await _context.TbMenuCustomerPawlevels.Select(s => new
                        {
                            label = s.Status,
                            value = s.Status,
                        }).ToListAsync();
                        break;
                    case "CUSTOMERCCRSTATUS":
                        returnLst = await _context.TbMenuCustomerCcrstatuses.Select(s => new
                        {
                            label = s.Status,
                            value = s.Status,
                        }).ToListAsync();
                        break;
                    case "CUSTOMERFMBLDGMANAGERS":
                        returnLst = await _context.TbMenuCustomerFmbldgManagers.Select(s => new
                        {
                            label = s.FullName,
                            value = s.FullName,
                        }).ToListAsync();
                        break;
                    case "CCRSTATUS":
                        returnLst = await _context.TbMenuCustomerCcrstatuses.Select(s => new
                        {
                            label = s.Status,
                            value = s.Status,
                        }).ToListAsync();
                        break;
                    case "USERLEVELACCESS":
                        returnLst = await _context.TbUserLevelAccesses.Select(s => new
                        {
                            label = s.AccessLevel,
                            value = s.AccessLevel,
                        }).ToListAsync();
                        break;
                    case "AREAOFRESPONSIBILITIES":
                        returnLst = new List<object>()
                        {
                           new { value= "NASJAX", label= "NASJAX" },
                           new { value= "BUMED", label= "BUMED" },
                           new { value= "Misc", label= "Misc" },
                        };
                        break;
                    case "SECURITYQUESTIONS":
                        returnLst = await _context.TbLoginSecurityQs.Select(s => new
                        {
                            label = s.SecurityQuestions,
                            value = s.SecurityQuestions,
                        }).ToListAsync();
                        break;

                    default:
                        break;
                }
                return StatusCode(200, returnLst);
            }
            #endregion DropDownList Fetching Codes
            return StatusCode(400, null);
        }

        #endregion



    }
}
