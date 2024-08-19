using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MISA.Web02.Core.Entities;
using MISA.Web02.Core.Interfaces.Infrastructure;

namespace MISA.Web02.Infrastructure.Repository
{
    internal class EmployeeRepository : IEmployeeRepository
    {
        public int Delete(Guid employeeId)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Employee> GetAll()
        {
            throw new NotImplementedException();
        }

        public Employee GetById(int id)
        {
            throw new NotImplementedException();
        }

        public int Insert(Employee employee)
        {
            throw new NotImplementedException();
        }

        public int Update(Employee employee, Guid employeeId)
        {
            throw new NotImplementedException();
        }
    }
}
