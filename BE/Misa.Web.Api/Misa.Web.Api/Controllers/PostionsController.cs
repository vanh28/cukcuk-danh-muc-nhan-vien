using Microsoft.AspNetCore.Mvc;
using Dapper;
using MySqlConnector;
using Misa.Web.Api.Models;
namespace Misa.Web.Api.Controllers
{
    [Route("/api/[controller]")]
    [ApiController]
    public class PostionsController : Controller
    {
        private readonly string _connectionString = "Host=8.222.228.150; Port=3306; Database=UET_21020162_HoangVietAnh; User Id=manhnv; Password=12345678";

        /// <summary>
        /// Lấy danh sách toàn vị trí từ cơ sở dữ liệu.
        /// </summary>
        /// <returns>
        /// 200 lấy danh sách vị trí thành công.
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
                    var sqlCommand = "SELECT * from Position";
                    var positions = _sqlConnection.Query<Position>(sql: sqlCommand);
                    if (positions.Any())
                    {
                        return Ok(positions);
                    }
                    else
                    {
                        return NoContent();
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
    }
}
