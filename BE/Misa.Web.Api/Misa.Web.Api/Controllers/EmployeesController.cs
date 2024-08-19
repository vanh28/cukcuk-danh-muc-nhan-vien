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
        private readonly string connectionString = "Host=8.222.228.150; Port=3306; Database=UET_21020162_HoangVietAnh; User Id=manhnv; Password=12345678";

        [HttpGet]
        public IActionResult Get()
        {
            using (var sqlConnection = new MySqlConnection(connectionString))
            {
                var sqlCommand = "SELECT * from Employee";
                var employees = sqlConnection.Query<Employee>(sql: sqlCommand);
                return Ok(employees);
            }
        }

        [HttpPut("{id}")]
        public IActionResult UpdateEmployee(Guid id, [FromBody] Employee employee)
        {
            
            if (employee == null || id != employee.EmployeeId)
            {
                return BadRequest("Invalid employee data");
            }

            using (var sqlConnection = new MySqlConnection(connectionString))
            {
                var sqlCommand = "SELECT * FROM Employee WHERE EmployeeID = @EmployeeID";
                var existingEmployee = sqlConnection.QuerySingleOrDefault<Employee>(sqlCommand, new { EmployeeId= id });

                if (existingEmployee == null)
                {
                    return NotFound();
                }

                var updateCommand = @"
                UPDATE Employee
                SET 
                    EmployeeId = @EmployeeId,
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

                var result = sqlConnection.Execute(updateCommand, employee);

                if (result > 0)
                {
                    return NoContent();
                }
                else
                {
                    return NotFound();
                }
            }
        }



    }
}
