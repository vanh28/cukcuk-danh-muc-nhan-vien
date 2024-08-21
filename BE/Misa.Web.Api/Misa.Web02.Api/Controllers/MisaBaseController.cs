using Microsoft.AspNetCore.Mvc;
using MISA.Web02.Core.Exceptions;
using MISA.Web02.Core.Interfaces.Infrastructure;
using MISA.Web02.Core.Interfaces.Services;

namespace Misa.Web02.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MisaBaseController<MISAEntity> : ControllerBase
    {
        #region Fields
        IBaseRepository<MISAEntity> _baseRepository;
        IBaseService<MISAEntity> _baseService;
        #endregion

        #region Constructor
        public MisaBaseController(IBaseRepository<MISAEntity> baseRepository,
        IBaseService<MISAEntity> baseService)
        {
            _baseRepository = baseRepository;
            _baseService = baseService;
        }
        #endregion

        #region Methods

        /// <summary>
        /// Lấy danh sách toàn bộ đối tượng từ cơ sở dữ liệu.
        /// </summary>
        /// <returns>
        /// 200 - lấy dữ liệu thành công và có dữ liệu.
        /// 204 - Không có dữ liệu.
        /// 500 - Lỗi Server.
        /// </returns>
        /// <createdby>Hoàng Việt Anh</created>
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var data = _baseRepository.GetAll();
                if (data.Any())
                {
                    return Ok(data);
                }
                else
                {
                    return NoContent();
                }
            }
            catch (MisaValidateException ex)
            {
                var response = new
                {
                    DevMsg = ex.Message,
                    userMsg = MISA.Web02.Core.Resources.ResourceVN.ValidateException,
                    data = ex.Data,
                };
                return BadRequest(response);
            }
            catch (Exception ex)
            {
                var response = new
                {
                    DevMsg = ex.Message,
                    userMsg = MISA.Web02.Core.Resources.ResourceVN.ErrorException,
                    data = ex.InnerException,
                };
                return StatusCode(500, response);
            }
        }

        /// <summary>
        /// Thêm một đối tượng mới vào cơ sở dữ liệu.
        /// </summary>
        /// <param name="entity">Đối tượng cần thêm vào cơ sở dữ liệu.</param>
        /// <returns>
        /// 200 - Thêm dữ liệu thành công.
        /// 400 - Dữ liệu không hợp lệ.
        /// 500 - Lỗi Server.
        /// </returns>
        /// <createdby>Hoàng Việt Anh</created>
        [HttpPost]
        public IActionResult Post([FromBody] MISAEntity entity)
        {
            try
            {
                var result = _baseService.InsertService(entity);
                return Ok(result);

            }
            catch (MisaValidateException ex)
            {
                var response = new
                {
                    DevMsg = ex.Message,
                    userMsg = MISA.Web02.Core.Resources.ResourceVN.ValidateException,
                    data = ex.Data,
                };
                return BadRequest(response);
            }
            catch (Exception ex)
            {
                var response = new
                {
                    DevMsg = ex.Message,
                    userMsg = MISA.Web02.Core.Resources.ResourceVN.ErrorException,
                    data = ex.InnerException,
                };
                return StatusCode(500, response);
            }
        }

        /// <summary>
        /// Cập nhật thông tin của đối tượng trong cơ sở dữ liệu.
        /// </summary>
        /// <param name="id">ID của đối tượng cần cập nhật.</param>
        /// <param name="entity">Đối tượng chứa thông tin cập nhật.</param>
        /// <returns>
        /// 200 - Cập nhật thành công.
        /// 400 - Dữ liệu không hợp lệ.
        /// 404 - Không tìm thấy đối tượng với ID đã cho.
        /// 500 - Lỗi Server.
        /// </returns>
        /// <createdby>Hoàng Việt Anh</created>
        [HttpPut("{id}")]
        public IActionResult Put(Guid id, MISAEntity entity)
        {
            try
            {
                var result = _baseService.UpdateService(entity, id);
                return Ok(result);
            }
            catch (MisaValidateException ex)
            {
                var response = new
                {
                    DevMsg = ex.Message,
                    userMsg = MISA.Web02.Core.Resources.ResourceVN.ValidateException,
                    data = ex.Data,
                };
                return BadRequest(response);
            }
            catch (Exception ex)
            {
                var response = new
                {
                    DevMsg = ex.Message,
                    userMsg = MISA.Web02.Core.Resources.ResourceVN.ErrorException,
                    data = ex.InnerException,
                };
                return StatusCode(500, response);
            }
        }


        /// <summary>
        /// Xóa đối tượng khỏi cơ sở dữ liệu theo ID.
        /// </summary>
        /// <param name="id">ID của đối tượng cần xóa.</param>
        /// <returns>
        /// 200 Xóa thành công.
        /// 404 Không tìm thấy đối tượng với ID đã cho.
        /// 500 - Lỗi Server.
        /// </returns>
        /// <createdby>Hoàng Việt Anh</created>
        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            try
            {
                //validate du lieu
                var result = _baseRepository.Delete(id);
                return Ok(result);

            }
            catch (MisaValidateException ex)
            {
                var response = new
                {
                    DevMsg = ex.Message,
                    userMsg = MISA.Web02.Core.Resources.ResourceVN.ValidateException,
                    data = ex.Data,
                };
                return BadRequest(response);
            }
            catch (Exception ex)
            {
                var response = new
                {
                    DevMsg = ex.Message,
                    userMsg = MISA.Web02.Core.Resources.ResourceVN.ErrorException,
                    data = ex.InnerException,
                };
                return StatusCode(500, response);
            }
        }
        #endregion
    }
}
