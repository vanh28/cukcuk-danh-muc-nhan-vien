using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MISA.Web02.Core.Entities;

namespace MISA.Web02.Core.Interfaces.Infrastructure
{
    public interface IEmployeeRepository
    {
        IEnumerable<Employee> GetAll();

        Employee GetById(int id);
        int Insert(Employee employee);
        int Update(Employee employee, Guid employeeId);
        int Delete(Guid employeeId);
    }
}
