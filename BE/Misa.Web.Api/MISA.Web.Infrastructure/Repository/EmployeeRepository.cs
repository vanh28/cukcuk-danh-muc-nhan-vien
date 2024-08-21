using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using MISA.Web02.Core.Entities;
using MISA.Web02.Core.Interfaces.Infrastructure;
using MySqlConnector;

namespace MISA.Web02.Infrastructure.Repository
{
    public class EmployeeRepository : BaseRepository<Employee>, IEmployeeRepository
    {

        /// <summary>
        /// Kiểm tra xem mã nhân viên có tồn tại trong cơ sở dữ liệu hay không
        /// </summary>
        /// <param name="employeeCode">Mã nhân viên cần kiểm tra</param>
        /// <returns>Trả về true nếu mã nhân viên tồn tại, ngược lại trả về false</returns>
        /// <created by>Hoàng Việt Anh</created>
        public bool CheckEmployeeCode(string employeeCode)
        {
            using (_mySqlConnection = new MySqlConnection(_connectionString))
            {
                try
                {
                    // Kiểm tra xem trùng mã nhân viên không
                    const string sqlCommand = "SELECT EmployeeCode FROM Employee WHERE EmployeeCode = @EmployeeCode";
                    var parameters = new DynamicParameters();
                    parameters.Add("@EmployeeCode", employeeCode);
                    var result = _mySqlConnection.QueryFirstOrDefault<string>(sqlCommand, parameters);
                    return result != null;
                }
                catch (Exception ex)
                {
                    throw new Exception("Lỗi khi truy vấn", ex);
                }
            }
        }

        /// <summary>
        /// Xóa một nhân viên khỏi cơ sở dữ liệu dựa trên ID của họ.
        /// </summary>
        /// <param name="employeeId">ID của nhân viên cần xóa</param>
        /// <returns>Số lượng bản ghi bị ảnh hưởng</returns>
        /// <created by>Hoàng Việt Anh</created>
        public int Delete(Guid employeeId)
        {
            return base.Delete(employeeId);
        }

        /// <summary>
        /// Lấy tất cả các nhân viên từ cơ sở dữ liệu.
        /// </summary>
        /// <returns>Một danh sách các đối tượng Employee</returns>
        /// <created by>Hoàng Việt Anh</created>
        public IEnumerable<Employee> GetAll()
        {
            return GetAll<Employee>();
        }

        /// <summary>
        /// Thêm một nhân viên mới vào cơ sở dữ liệu.
        /// </summary>
        /// <param name="employee">Đối tượng Employee chứa thông tin nhân viên cần thêm</param>
        /// <returns>Số lượng bản ghi bị ảnh hưởng</returns>
        /// <created by>Hoàng Việt Anh</created>
        public int Insert(Employee employee)
        {
            return base.Insert(employee);
        }

        /// <summary>
        /// Cập nhật thông tin của một nhân viên trong cơ sở dữ liệu.
        /// </summary>
        /// <param name="employee">Đối tượng Employee chứa thông tin nhân viên cần cập nhật</param>
        /// <param name="employeeId">ID của nhân viên cần cập nhật</param>
        /// <returns>Số lượng bản ghi bị ảnh hưởng</returns>
        /// <created by>Hoàng Việt Anh</created>
        public int Update(Employee employee, Guid employeeId)
        {
            return base.Update(employee, employeeId);
        }

    }
}
