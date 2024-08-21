using MISA.Web02.Core.Entities;
using MISA.Web02.Core.Interfaces.Infrastructure;
using MISA.Web02.Core.Interfaces.Services;

namespace MISA.Web02.Core.Services
{
    public class DepartmentService:BaseService<Department>, IDepartmentService
    {
        IDepartmentRepository _departmentRepository;
        public DepartmentService(IDepartmentRepository departmentRepository) : base(departmentRepository)
        {
            _departmentRepository = departmentRepository;
        }
    }
}
