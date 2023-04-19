using Microsoft.AspNetCore.Mvc;
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

    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {

        private readonly IUserService _userService;

        public UserController(
            IUserService userService
        )
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RequestRegister user)
        {
            if (user == null)
            {
                return BadRequest();
            }
  
            ResponseUser newUser = await _userService.CreateUser(user);
            return Ok(newUser);
        }

        [HttpGet("current-user")]
        public async Task<IActionResult> GetCurrentUser(Guid userId)
        {
            if (userId == null)
            {
                return BadRequest();
            }
           
            ResponseUser currentUser = await _userService.GetUser(userId);
            if (currentUser == null)
            {
                return Unauthorized("ไม่พบผู้ใช้งาน");
            }
            return Ok(currentUser);


        }

        [HttpGet("check")]
        [AllowAnonymous]
        public async Task<IActionResult> CheckDuplicateUsername(String username)
        {
            var isAvailable = await _userService.IsUsernameAvailable(username);
            return Ok(!isAvailable);

        }

        [HttpPost("update-profile")]
        public async Task<IActionResult> UpdateProfile([FromBody] RequestUpdateProfile request)
        {
            if (request == null)
            {
                return BadRequest();
            }

            ResponseUser user = await _userService.UpdateUser(request);
            if (request == null)
            {
                return Unauthorized("ไม่พบผู้ใช้งาน");
            }
            return Ok(user);

        }
        [HttpPut("change-password/{userId}")]
        public async Task<IActionResult> UpdatePassword([FromRoute] Guid userId, [FromBody] RequestUpdatePassword request)
        {
            var user = await _userService.GetUser(userId);
            var isMatched = await _userService.VerifyPassword(request.CurrentPassword, user.Username);
            
            if (isMatched)
            {
                var hashedNewPassword = await _userService.VerifyNewPassword(request.NewPassword, userId);
                
                if (hashedNewPassword == null)
                {
                    return BadRequest("รหัสผ่านใหม่ซ้ำกับรหัสผ่าน 5 ครั้งล่าสุด");
                }
                await _userService.UpdatePassword(hashedNewPassword, userId);
                return Ok();
            }
            else
            {
                return Unauthorized("รหัสผ่านปัจจุบันไม่ถูกต้อง");
            }

        }
    }
}
