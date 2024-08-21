using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MySqlConnector;
using Dapper;
using MISA.Web02.Core.MisaAttribute;

namespace MISA.Web02.Infrastructure.Repository
{
    public class BaseRepository<MISAEntity>
    {
        protected readonly string _connectionString = "Host=8.222.228.150; Port=3306; Database=UET_21020162_HoangVietAnh; User Id=manhnv; Password=12345678";
        protected MySqlConnection _mySqlConnection;

        /// <summary>
        /// Lấy toàn bộ đối tượng theo kiểu <typeparamref name="MISAEntity"/>.
        /// </summary>
        /// <typeparam name="MISAEntity">Kiểu đối tượng của bản ghi.</typeparam>
        /// <returns>Danh sách các đối tượng./>.</returns>
        /// <exception cref="Exception">Ném ra lỗi nếu có sự cố trong quá trình truy vấn cơ sở dữ liệu.</exception>
        /// <created by>Hoàng Việt Anh</created>
        public IEnumerable<MISAEntity> GetAll<MISAEntity>()
        {
            using (_mySqlConnection = new MySqlConnection(_connectionString))
            {
                try
                {
                    var className = typeof(MISAEntity).Name;
                    // Lấy dữ liệu từ DB
                    var sqlCommand = $"SELECT * FROM {className}";
                    var entities = _mySqlConnection.Query<MISAEntity>(sql: sqlCommand);
                    // Trả về kết quả
                    return entities;
                }
                catch (Exception ex)
                {
                    throw new Exception("Lỗi khi truy vấn", ex);
                }
            }
        }

        /// <summary>
        /// Thực hiện việc thêm một bản ghi.
        /// </summary>
        /// <param name="entity">Đối tượng cần thêm.</param>
        /// <typeparam name="MISAEntity">Kiểu đối tượng của bản ghi.</typeparam>
        /// <returns>Số lượng bản ghi.</returns>
        /// <exception cref="Exception">Ném ra lỗi nếu có sự cố trong quá trình truy vấn cơ sở dữ liệu.</exception>
        /// <created by>Hoàng Việt Anh</created>
        public virtual int Insert(MISAEntity entity)
        {
            var className = typeof(MISAEntity).Name;
            var sqlColumsName = new StringBuilder();
            var sqlColumsValue = new StringBuilder();
            DynamicParameters parameters = new DynamicParameters();

            var props = typeof(MISAEntity).GetProperties();
            string delimiter = "";

            foreach (var prop in props)
            {
                var propName = prop.Name;
                var propValue = prop.GetValue(entity);

                var primaryKey = Attribute.IsDefined(prop, typeof(PrimaryKey));
                if (primaryKey == true || propName == $"{className}Id")
                {
                    if (prop.PropertyType == typeof(Guid))
                    {
                        propValue = Guid.NewGuid();
                    }
                }

                var paramName = $"@{propName}";
                sqlColumsName.Append($"{delimiter}{propName}");
                sqlColumsValue.Append($"{delimiter}{paramName}");
                delimiter = ",";
                parameters.Add(paramName, propValue);

            }

            var sqlCommand = $"INSERT INTO {className}({sqlColumsName.ToString()}) VALUE ({sqlColumsValue.ToString()})";

            using (_mySqlConnection = new MySqlConnection(_connectionString))
            {
                try
                {
                    var result = _mySqlConnection.Execute(sqlCommand, param: parameters);
                    return result;
                }
                catch (Exception ex)
                {
                    throw new Exception("Lỗi khi truy vấn", ex);
                }
            }
        }
        /// <summary>
        /// Xóa bản ghi khỏi cơ sở dữ liệu dựa trên ID.
        /// </summary>
        /// <param name="entityId">ID của bản ghi.</param>
        /// <returns>Số lượng bản ghiL.</returns>
        /// <exception cref="Exception">Ném ra lỗi nếu có sự cố trong quá trình truy vấn cơ sở dữ liệu.</exception>
        /// <created by>Hoàng Việt Anh</created>
        public int Delete(Guid entityId)
        {
            var className = typeof(MISAEntity).Name;
            using (_mySqlConnection = new MySqlConnection(_connectionString))
            {
                try
                {
                    var sqlCommand = $"DELETE FROM {className} WHERE {className}Id = @Id";
                    var result = _mySqlConnection.Execute(sqlCommand, new { Id = entityId });
                    return result;
                }
                catch (Exception ex)
                {
                    throw new Exception("Lỗi khi truy vấn", ex);
                }
            }

        }

        /// <summary>
        /// Cập nhật thông tin bản ghi trong cơ sở dữ liệu dựa trên ID.
        /// </summary>
        /// <param name="entity">Đối tượng chứa dữ liệu.</param>
        /// <param name="entityId">ID của bản ghi.</param>
        /// <typeparam name="MISAEntity">Kiểu đối tượng của bản ghi.</typeparam>
        /// <returns>Số lượng bản ghi.</returns>
        /// <exception cref="Exception">Ném ra lỗi nếu có sự cố trong quá trình truy vấn cơ sở dữ liệu.</exception>
        /// <created by>Hoàng Việt Anh</created>
        public virtual int Update(MISAEntity entity, Guid entityId)
        {
            var className = typeof(MISAEntity).Name;
            var sqlClause = new StringBuilder();
            DynamicParameters parameters = new DynamicParameters();

            var props = typeof(MISAEntity).GetProperties();
            string delimiter = "";

            foreach (var prop in props)
            {
                var propName = prop.Name;
                var propValue = prop.GetValue(entity);

                var primaryKey = Attribute.IsDefined(prop, typeof(PrimaryKey));
                if (primaryKey || propName == $"{className}Id")
                {
                    parameters.Add($"@{propName}", entityId);
                    continue;
                }
                sqlClause.Append($"{delimiter}{propName} = @{propName}");
                delimiter = ",";
                parameters.Add($"@{propName}", propValue);
            }

            var sqlCommand = $"UPDATE {className} SET {sqlClause.ToString()} WHERE {className}Id = @{className}Id";

            using (_mySqlConnection = new MySqlConnection(_connectionString))
            {
                try
                {
                    var result = _mySqlConnection.Execute(sqlCommand, param: parameters);
                    return result;
                }
                catch (Exception ex)
                {
                    throw new Exception("Lỗi khi truy vấn", ex);
                }
            }
        }
    }
}
