using Microsoft.AspNetCore.Mvc;

namespace Misa.Web02.Api.Controllers
{
    public class EmployeesController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
