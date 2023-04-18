using app_api.Services.Interface;
using app_api.Services;
using app_api.Models;
using app_api.Contracts;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;

namespace app_api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
       
        private readonly IAuthService _authService;
        private readonly ILogger<AuthController> _logger;

        public AuthController(
            ILogger<AuthController> logger,
            IAuthService authService)
        {
            _logger = logger;
            _authService = authService;

        }


        [AllowAnonymous]
        [HttpPost("login")]
        [Produces("application/json")]
        public async Task<IActionResult> Login([FromBody] AuthContract contract)
        {
            if (string.IsNullOrEmpty(contract.Username) || string.IsNullOrEmpty(contract.Password))
                return new BadRequestObjectResult("กรุณากรอกข้อมูลให้ครบถ้วย");

           

            return Ok(new AuthRespone()
            {
                Token= "User = "+contract.Username
            });
        }

        [HttpPost("logout")]
        public async Task Logout()
        {
            await _authService.Logout(DateTime.Now);
        }
    }


}
