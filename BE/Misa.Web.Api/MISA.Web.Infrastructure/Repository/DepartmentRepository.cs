using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MISA.Web02.Core.Entities;
using MISA.Web02.Core.Interfaces.Infrastructure;

namespace MISA.Web02.Infrastructure.Repository
{
    public class DepartmentRepository:BaseRepository<Department>, IDepartmentRepository
    {
        /// <summary>
        /// Lấy tất cả các phòng ban từ cơ sở dữ liệu.
        /// </summary>
        /// <returns>Một danh sách các phòng ban</returns>
        /// <created by>Hoàng Việt Anh</created>
        public IEnumerable<Department> GetAll()
        {
            return GetAll<Department>();
        }
    }
}
