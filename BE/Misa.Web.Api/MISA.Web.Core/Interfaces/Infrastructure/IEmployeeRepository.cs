using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MISA.Web02.Core.Entities;

namespace MISA.Web02.Core.Interfaces.Infrastructure
{
    public interface IEmployeeRepository : IBaseRepository<Employee>
    {
        bool CheckEmployeeCode(string employeeCode);
    }
}
