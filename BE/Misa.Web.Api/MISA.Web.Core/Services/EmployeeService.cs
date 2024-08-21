using MISA.Web02.Core.Entities;
using MISA.Web02.Core.Interfaces.Infrastructure;
using MISA.Web02.Core.Interfaces.Services;
using MISA.Web02.Core.Exceptions;

namespace MISA.Web02.Core.Services
{
    public class EmployeeService : BaseService<Employee>, IEmployeeService
    {

        IEmployeeRepository _employeeRepository;
        public EmployeeService(IEmployeeRepository employeeRepository) : base(employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }


        // Kiểm tra email có đúng định dạng
        bool IsValidEmail(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
            {
                return false;
            }

            var trimmedEmail = email.Trim();

            // Nếu email kết thúc bằng dấu chấm, trả về false.
            if (trimmedEmail.EndsWith("."))
            {
                return false;
            }

            try
            {
                // Tạo đối tượng MailAddress và kiểm tra xem địa chỉ email có khớp với giá trị trimmedEmail không.
                var addr = new System.Net.Mail.MailAddress(trimmedEmail);
                return addr.Address == trimmedEmail;
            }
            catch
            {
                return false;
            }
        }

        // Kiểm tra xem ngày có lớn hơn ngày hiện tại không
        private bool IsDateValid(DateTime date)
        {
            return date <= DateTime.Now;
        }

        //Kiểm tra thông tin của nhân viên
        protected override void ValidateEmployeeData(Employee employee)
        {

            // Kiểm tra trùng mã nhân viên
            var isDuplidateEmployeeCode = _employeeRepository.CheckEmployeeCode(employee.EmployeeCode);
            if (isDuplidateEmployeeCode)
            {
                throw new MisaValidateException(Core.Resources.ResourceVN.EmployeeCodeNotDuplicate);
            }
            // Kiểm tra định dạng email
            if (!IsValidEmail(employee.Email))
            {
                throw new MisaValidateException(Core.Resources.ResourceVN.EmailNotFormat);
            }

            // Kiểm tra ngày sinh
            if (employee.DateOfBirth.HasValue && !IsDateValid(employee.DateOfBirth.Value))
            {
                throw new MisaValidateException(Core.Resources.ResourceVN.DateOfBirthNotValid);
            }

            // Kiểm tra ngày cấp
            if (employee.NationalityIdDate.HasValue && !IsDateValid(employee.NationalityIdDate.Value))
            {
                throw new MisaValidateException(Core.Resources.ResourceVN.DateOfIssueNotValid);
            }
        }
    }
}
