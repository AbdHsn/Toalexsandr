using DataLayer.Models.GlobalModels;
using Microsoft.EntityFrameworkCore;

namespace RepositoryLayer
{
    public class RawQueryRepo<T> : IRawQueryRepo<T> where T : class
    {
        #region "Variables"
        private readonly EntityContext _context;
        #endregion "Variables"

        #region "Constructors"
        public RawQueryRepo(EntityContext context)
        {
            this._context = context;
        }

        #endregion "Constructors"

        #region "Get Methods Implementation"
        public async Task<List<T>> GetAllByWhere(GetAllByWhereGLB getAllByWhereGLB)
        {
            string sql = default(string);
            if (string.IsNullOrEmpty(getAllByWhereGLB.WhereConditions))
            {
                //sql = "SELECT * FROM " + tableOrViewName + " ORDER BY " + sortColumn + " OFFSET " + limitStart + " ROWS FETCH NEXT " + 10 + " ROWS ONLY";
                sql = string.Format("SELECT * FROM {0} ORDER BY {1} OFFSET {2} ROWS FETCH NEXT {3} ROWS ONLY",
                    getAllByWhereGLB.TableOrViewName, getAllByWhereGLB.SortColumn, getAllByWhereGLB.LimitStart, getAllByWhereGLB.LimitEnd);
            }
            else
            {
                //sql = "SELECT * FROM " + tableOrViewName + " WHERE " + whereCondition + " ORDER BY " + sortColumn + " OFFSET " + limitStart + " ROWS FETCH NEXT " + 10 + " ROWS ONLY";
                sql = string.Format("SELECT * FROM {0} WHERE {1} ORDER BY {2} OFFSET {3} ROWS FETCH NEXT {4} ROWS ONLY",
                      getAllByWhereGLB.TableOrViewName, getAllByWhereGLB.WhereConditions, getAllByWhereGLB.SortColumn, getAllByWhereGLB.LimitStart, getAllByWhereGLB.LimitEnd);
            }

            var returnData = await _context.Set<T>().FromSqlRaw(sql).AsNoTracking().ToListAsync();
            return returnData;
        }
        
        public async Task<List<T>> ExportAllByWhere(ExportAllByWhereGLB exportAllByWhereGLB)
        {
            string sql = default(string);
            if (string.IsNullOrEmpty(exportAllByWhereGLB.WhereConditions))
            {
                sql = string.Format("SELECT * FROM {0} ORDER BY {1}",
                    exportAllByWhereGLB.TableOrViewName, exportAllByWhereGLB.SortColumn);
            }
            else
            {
                sql = string.Format("SELECT * FROM {0} WHERE {1} ORDER BY {2}",
                      exportAllByWhereGLB.TableOrViewName, exportAllByWhereGLB.WhereConditions, exportAllByWhereGLB.SortColumn);
            }

            return await _context.Set<T>().FromSqlRaw(sql).AsNoTracking().ToListAsync();
        }

        public async Task<T> CountAllByWhere(CountAllByWhereGLB countAllByWhereGLB )
        {
            string sql = default(string);
            if (string.IsNullOrWhiteSpace(countAllByWhereGLB.WhereConditions))
            {
                sql =  string.Format("SELECT Count(*) AS TotalRecord FROM {0}", countAllByWhereGLB.TableOrViewName);
            }
            else
            {
                sql = string.Format("SELECT Count(*) AS TotalRecord FROM {0} WHERE {1}", countAllByWhereGLB.TableOrViewName, countAllByWhereGLB.WhereConditions);
            }
            return await _context.Set<T>().FromSqlRaw(sql).AsNoTracking().FirstOrDefaultAsync();
        }

        public async Task<Object> GetAllByLike(GetAllByLikeGLB getAllByLikeGLB)
        {
            string sql = default(string);
            if (string.IsNullOrEmpty(getAllByLikeGLB.WhereConditions))
            {
                sql = string.Format("SELECT DISTINCT TOP ({0}) {1} FROM {2} WHERE {3} LIKE('%{4}%') ORDER BY {5} {6}",
                    getAllByLikeGLB.NumberOfReturnRow, getAllByLikeGLB.ColumnName, getAllByLikeGLB.TableOrViewName, getAllByLikeGLB.ColumnName, getAllByLikeGLB.ColumnValue, getAllByLikeGLB.ColumnName, getAllByLikeGLB.OrderBy);
            }
            else
            {
                sql = string.Format("SELECT DISTINCT TOP ({0}) {1} FROM {2} WHERE {3} LIKE('%{4}%') AND ({5}) ORDER BY {6} {7}",
                    getAllByLikeGLB.NumberOfReturnRow, getAllByLikeGLB.ColumnName, getAllByLikeGLB.TableOrViewName, getAllByLikeGLB.ColumnName, getAllByLikeGLB.ColumnValue, getAllByLikeGLB.WhereConditions, getAllByLikeGLB.ColumnName, getAllByLikeGLB.OrderBy);
            }

            List<Object> list = new List<Object>();
            using (var command = _context.Database.GetDbConnection().CreateCommand())
            {
                command.CommandText = sql;
                _context.Database.OpenConnection();
                using (var result = command.ExecuteReader())
                {
                    if (result.HasRows)
                    {
                        while (result.Read())
                        {
                            list.Add(result[getAllByLikeGLB.ColumnName]);
                        }
                    }
                }
            }

            return list;
        }
        #endregion "Get Methods Implementation"

    }
}