using Microsoft.AspNetCore.Mvc;
using MISA.Web02.Core.Entities;
using MISA.Web02.Core.Interfaces.Infrastructure;
using MISA.Web02.Core.Interfaces.Services;

namespace Misa.Web02.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentsController : MisaBaseController<Department>
    {
        IDepartmentRepository _departmentRepository;
        IDepartmentService _departmentService;
        public DepartmentsController(IDepartmentRepository departmentRepository, IDepartmentService departmentService) : base(departmentRepository, departmentService) 
        {
            _departmentRepository = departmentRepository;
            _departmentService = departmentService;
        }
    }
}
