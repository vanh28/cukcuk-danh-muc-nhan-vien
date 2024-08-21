using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MISA.Web02.Core.MisaAttribute;

namespace MISA.Web02.Core.Entities
{
    public class Department
    {
        [PrimaryKey]
        public Guid DepartmentId { get; set; }
        [NotEmpty]
        [PropName("Tên phòng ban")]
        public string DepartmentName { get; set; }
    }
}
