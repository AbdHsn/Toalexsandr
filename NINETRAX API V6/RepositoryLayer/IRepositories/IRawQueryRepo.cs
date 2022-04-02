using DataLayer.Models.GlobalModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace RepositoryLayer
{
    public interface IRawQueryRepo<T> where T : class
    {
        #region "Get Methods Definition"
        Task<List<T>> GetAllByWhere(GetAllByWhereGLB getAllByWhereGLB);

        Task<List<T>> ExportAllByWhere(ExportAllByWhereGLB exportAllByWhereGLB);

        Task<T> CountAllByWhere(CountAllByWhereGLB countAllByWhereGLB);

        Task<Object> GetAllByLike(GetAllByLikeGLB getAllByLikeGLB);

        #endregion "Get Methods Definition"

        #region "DB Operation Methods Definition"
        Task<List<T>> ExecuteStoreProcedure(string storeProcedure);
        #endregion "DB Operation Methods Definition"


    }
}
