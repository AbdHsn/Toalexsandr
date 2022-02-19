using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;

namespace NINETRAX.Globals
{
    public static class CommonServices
    {

        public static void WriteExcelToResponse(this IWorkbook book, HttpContext httpContext, string templateName)
        {
            var response = httpContext.Response;
            response.ContentType = "application/vnd.ms-excel";
            if (!string.IsNullOrEmpty(templateName))
            {
                var contentDisposition = new Microsoft.Net.Http.Headers.ContentDispositionHeaderValue("attachment");
                contentDisposition.SetHttpFileName(templateName);
                response.Headers[HeaderNames.ContentDisposition] = contentDisposition.ToString();
            }
            book.Write(response.Body);
        }

        public static MemoryStream ExportToExcelFile(IWebHostEnvironment _heSrv, HttpRequest httpRequest, IWorkbook workbook) 
        {

            try
            {
                if (string.IsNullOrWhiteSpace(_heSrv.WebRootPath))
                {
                    _heSrv.WebRootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
                }

                string tempGeneratedFileName = Guid.NewGuid().ToString() + @".xlsx";
                string URL = string.Format("{0}://{1}/{2}", httpRequest.Scheme, httpRequest.Host, tempGeneratedFileName);
                FileInfo file = new FileInfo(Path.Combine(_heSrv.WebRootPath, tempGeneratedFileName));

                var memoryStream = new MemoryStream();
                using (var fs = new FileStream(Path.Combine(_heSrv.WebRootPath, tempGeneratedFileName), FileMode.Create, FileAccess.Write))
                {
                    workbook.Write(fs);
                }

                using (var stream = new FileStream(Path.Combine(_heSrv.WebRootPath, tempGeneratedFileName), FileMode.Open))
                {
                    stream.CopyTo(memoryStream);
                }
                memoryStream.Position = 0;
                file.Delete();

                return memoryStream;
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}
