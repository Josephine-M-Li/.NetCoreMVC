using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using TestPatInfo.Models;

namespace TestPatInfo.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        
        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

       

        public IActionResult Index()
        {
            Tmhtc_HIS3bContext _tmh3bContext = new Tmhtc_HIS3bContext();
            var patList = _tmh3bContext.TestPatinfo.ToList();

            return View(patList);
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}