using Microsoft.AspNetCore.Mvc;
using MISA.Web02.Core.Interfaces.Infrastructure;
using MISA.Web02.Core.Interfaces.Services;
using MISA.Web02.Infrastructure.Repository;
using MISA.Web02.Core.Entities;
namespace Misa.Web02.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : MisaBaseController<Employee>
    {

        IEmployeeRepository _employeeRepository;
        IEmployeeService _employeeService;

        public EmployeesController(IEmployeeRepository employeeRepository, IEmployeeService employeeService) : base(employeeRepository, employeeService)
        {
            _employeeRepository = employeeRepository;
            _employeeService = employeeService;
        }

    }
}
