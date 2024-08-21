using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MISA.Web02.Core.MisaAttribute;

namespace MISA.Web02.Core.Entities
{
    public class Employee
    {
        #region Constructor
        public Employee() { 

        }
        #endregion

        [PrimaryKey]
        public Guid EmployeeId { get; set; }
        [NotEmpty]
        [PropName("Mã nhân viên")]
        public string EmployeeCode { get; set; }
        public Guid? DepartmentId { get; set; }
        public Guid? PositionId { get; set; }
        [NotEmpty]
        [PropName("Họ tên nhân viên")]
        public string FullName { get; set; }
        public DateTime? DateOfBirth { get; set; }

        // Căn cước công dân
        [NotEmpty]
        [PropName("Số cccd")]
        public string NationalityId { get; set; }
        public DateTime? NationalityIdDate { get; set; }
        public string NationalityIdPlace { get; set; }

        public byte? Gender { get; set; }
        public string Address { get; set; }
        public string MobilePhoneNumber { get; set; }
        [NotEmpty]
        [PropName("Số điện thoại")]
        public string TelephonePhoneNumber { get; set; }
        [NotEmpty]
        public string Email { get; set; }

        //ngân hàng
        public string BankAccount { get; set; }
        public string BankName { get; set; }
        public string BankBranch { get; set; }
    }
}
