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



        /// <summary>
        /// 首頁
        /// </summary> 
        [HttpGet]
        public IActionResult Index()
        {
            Tmhtc_HIS3bContext _tmh3bContext = new Tmhtc_HIS3bContext();
            var patList = _tmh3bContext.TestPatinfo.ToList();

            return View(patList);
        }

        /// <summary>
        /// 新增
        /// </summary>  
        [HttpPost]
        public IActionResult CreatePat(TestPatinfo _patinfo)
        {
            Tmhtc_HIS3bContext _tmh3bContext = new Tmhtc_HIS3bContext();
            _tmh3bContext.TestPatinfo.Add(_patinfo);
            _tmh3bContext.SaveChanges();


            return RedirectToAction(nameof(Index));
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