using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MISA.Web02.Core.Entities;
using MISA.Web02.Core.Entities;

namespace MISA.Web02.Core.Interfaces.Services
{
    public interface IEmployeeService
    {
        /// <summary>
        /// Them moi du lieu
        /// </summary>
        /// <param name="employee"></param>
        /// <returns></returns>
        /// CreatedBy: Hoang Viet Anh
        int InsertServices(Employee employee);

        /// <summary>
        /// Sua
        /// </summary>
        /// <param name="employee"></param>
        /// <returns></returns>
        /// CreatedBy: Hoang Viet Anh
        int UpdateServices(Employee employee, Guid employeeId);
    }
}
