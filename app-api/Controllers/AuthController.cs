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
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
       

        private readonly IUserService _userService;

        public AuthController(
            IUserService userService)
        {
            _userService = userService;

        }


        [HttpPost("login")]
       
        public async Task<IActionResult> Login([FromBody] AuthContract contract)
        {
            if (string.IsNullOrEmpty(contract.Username) || string.IsNullOrEmpty(contract.Password))
                return BadRequest("กรุณากรอกข้อมูลให้ครบถ้วน");

            var isMatched = await _userService.VerifyPassword(contract.Password, contract.Username);
            if (isMatched)
            {
                var user = await _userService.GetUserByUsername(contract.Username);
                return Ok(user);
            }
            else
            {
                return Unauthorized("รหัสผ่านไม่ถูกต้อง");
            }
            
        }


    }


}
