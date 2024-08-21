using System.Text.Unicode;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.JsonPatch;
using Misa.Web.Api.Models;
using MySqlConnector;
using System.Collections.Specialized;
namespace Misa.Web.Api.Controllers
{
    [Route("/api/[controller]")]
    [ApiController]
    public class EmployeesController : Controller
    {
        private readonly string _connectionString = "Host=8.222.228.150; Port=3306; Database=UET_21020162_HoangVietAnh; User Id=manhnv; Password=12345678";

        /// <summary>
        /// Lấy danh sách toàn bộ nhân viên từ cơ sở dữ liệu.
        /// </summary>
        /// <returns>
        /// 200 lấy danh sách nhân viên thành công.
        /// 204 nếu không có dữ liệu nào được tìm thấy.
        /// 500 lỗi máy chủ
        /// </returns>
        /// created by Hoang Viet Anh
        [HttpGet]
        public IActionResult Get()
        {
            using (var _sqlConnection = new MySqlConnection(_connectionString))
            {
                try
                {
                    var sqlCommand = "SELECT * from Employee";
                    var employees = _sqlConnection.Query<Employee>(sql: sqlCommand);
                    if (employees.Any())
                    {
                        return Ok(employees);
                    }
                    else
                    {
                        return NoContent(); 
                    }
                } catch (Exception ex)
                {
                    var err = new Error();
                    err.devMsg = ex.Message;
                    err.userMsg = "có lỗi xảy ra vui lòng liên hệ MISA để được trợ giúp";
                    return StatusCode(500, err);
                }
            }
        }

        /// <summary>
        /// Cập nhật thông tin của một nhân viên dựa trên ID.
        /// </summary>
        /// <param name="id">ID của nhân viên cần cập nhật.</param>
        /// <param name="employee">Đối tượng nhân viên chứa thông tin cập nhật.</param>
        /// <returns>Trả về trạng thái HTTP tương ứng với kết quả của việc cập nhật.</returns>
        /// created by Hoang Viet Anh
        [HttpPut("{id}")]
        public IActionResult UpdateEmployee(Guid id, [FromBody] Employee employee)
        {
            if (employee == null || id != employee.EmployeeId)
            {
                return BadRequest("Nhân viên không hợp lệ");
            }

            using (var _sqlConnection = new MySqlConnection(_connectionString))
            {
                var sqlCommand = "SELECT * FROM Employee WHERE EmployeeID = @EmployeeID";
                var existingEmployee = _sqlConnection.QuerySingleOrDefault<Employee>(sqlCommand, new { EmployeeId = id });

                if (existingEmployee == null)
                {
                    return NotFound("Không thể tìm kiếm nhân viên yêu cầu");
                }

                var sqlUpdateCommand = @"
                    UPDATE Employee
                    SET 
                        EmployeeCode = @EmployeeCode,
                        FullName = @FullName,
                        DateOfBirth = @DateOfBirth,
                        Gender = @Gender,
                        PositionId = @PositionId,
                        NationalityId = @NationalityId,
                        NationalityIdDate = @NationalityIdDate,
                        DepartmentId = @DepartmentId,
                        NationalityIdPlace = @NationalityIdPlace,
                        Address = @Address,
                        MobilePhoneNumber = @MobilePhoneNumber,
                        TelephonePhoneNumber = @TelephonePhoneNumber,
                        Email = @Email,
                        BankAccount = @BankAccount,
                        BankName = @BankName,
                        BankBranch = @BankBranch
                    WHERE EmployeeID = @EmployeeID";

                try
                {
                    var result = _sqlConnection.Execute(sqlUpdateCommand, employee);

                    if (result > 0)
                    {
                        return NoContent();
                    }
                    else
                    {
                        return NotFound("Không thể tìm kiếm nhân viên yêu cầu");
                    }
                }
                catch (Exception ex)
                {
                    var err = new Error();
                    err.devMsg = ex.Message;
                    err.userMsg = "có lỗi xảy ra vui lòng liên hệ MISA để được trợ giúp";
                    return StatusCode(500, err);
                }
            }
        }

        /// <summary>
        /// Thêm một nhân viên mới vào cơ sở dữ liệu.
        /// </summary>
        /// <param name="employee">Đối tượng nhân viên chứa thông tin cần thêm mới.</param>
        /// <returns>Trả về trạng thái HTTP tương ứng với kết quả của việc thêm mới.</returns>
        /// created by Hoang Viet Anh
        [HttpPost]
        public IActionResult InsertEmployee([FromBody] Employee employee)
        {
            if (employee == null)
            {
                return BadRequest("Nhân viên không hợp lệ"); 
            }

            using (var _sqlConnection = new MySqlConnection(_connectionString))
            {
                var sqlCheckCommand = "SELECT * FROM Employee WHERE EmployeeID = @EmployeeID";
                var existingEmployee = _sqlConnection.QuerySingleOrDefault<Employee>(sqlCheckCommand, new { EmployeeId = employee.EmployeeId });

                if (existingEmployee != null)
                {
                    return NotFound("Nhân viên đã tồn tại");
                }

                var sqlInsertCommand = @"
                INSERT INTO Employee (
                    EmployeeID,
                    EmployeeCode,
                    FullName,
                    DateOfBirth,
                    Gender,
                    PositionId,
                    NationalityId,
                    NationalityIdDate,
                    DepartmentId,
                    NationalityIdPlace,
                    Address,
                    MobilePhoneNumber,
                    TelephonePhoneNumber,
                    Email,
                    BankAccount,
                    BankName,
                    BankBranch
                ) VALUES (
                    @EmployeeID,
                    @EmployeeCode,
                    @FullName,
                    @DateOfBirth,
                    @Gender,
                    @PositionId,
                    @NationalityId,
                    @NationalityIdDate,
                    @DepartmentId,
                    @NationalityIdPlace,
                    @Address,
                    @MobilePhoneNumber,
                    @TelephonePhoneNumber,
                    @Email,
                    @BankAccount,
                    @BankName,
                    @BankBranch
                )";

                try
                {
                    var result = _sqlConnection.Execute(sqlInsertCommand, employee);

                    if (result > 0)
                    {
                        return Ok(employee); 
                    }
                    else
                    {
                        return StatusCode(500, "Lỗi không xác định xảy ra trong quá trình thêm mới nhân viên.");
                    }
                }
                catch (Exception ex)
                {
                    var err = new Error();
                    err.devMsg = ex.Message; 
                    err.userMsg = "Có lỗi xảy ra, vui lòng liên hệ MISA để được trợ giúp"; 
                    return StatusCode(500, err);
                }
            }
        }


        /// <summary>
        /// Xóa một nhân viên dựa trên ID từ cơ sở dữ liệu.
        /// </summary>
        /// <param name="id">ID của nhân viên cần xóa.</param>
        /// <returns>
        /// 200 nếu xóa thành công.
        /// 404 nếu không tìm thấy nhân viên với ID đã cho.
        /// 500 lỗi máy chủ.
        /// </returns>
        /// created by Hoang Viet Anh
        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            using (var _sqlConnection = new MySqlConnection(_connectionString))
            {
                try
                {
                    var sqlCommand = "DELETE FROM Employee WHERE EmployeeID = @EmployeeID";
                    var rowsAffected = _sqlConnection.Execute(sql: sqlCommand, param: new { EmployeeId = id });

                    if (rowsAffected > 0)
                    {
                        return Ok(new { Message = "Xóa nhân viên thành công." });
                    }
                    else
                    {
                        return NotFound(new { Message = "Không tìm thấy nhân viên với ID đã cho." });
                    }
                }
                catch (Exception ex)
                {
                    var err = new Error();
                    err.devMsg = ex.Message;
                    err.userMsg = "Có lỗi xảy ra, vui lòng liên hệ MISA để được trợ giúp.";
                    return StatusCode(500, err);
                }
            }
        }

    }
}
