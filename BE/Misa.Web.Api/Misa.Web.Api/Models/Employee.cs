namespace Misa.Web.Api.Models
{
    public class Employee
    {
        public Guid EmployeeId { get; set; }
        public string EmployeeCode { get; set; }
        public Guid? DepartmentId { get; set; }
        public Guid? PositionId { get; set; }
        public string FullName { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string NationalityId { get; set; }
        public DateTime? NationalityIdDate { get; set; }
        public string NationalityIdPlace { get; set; }
        public byte? Gender { get; set; }
        public string Address { get; set; }
        public string MobilePhoneNumber { get; set; }
        public string TelephonePhoneNumber { get; set; }
        public string Email { get; set; }
        public string BankAccount { get; set; }
        public string BankName { get; set; }
        public string BankBranch { get; set; }
    }
}
