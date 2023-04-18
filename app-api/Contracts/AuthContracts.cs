using System;
using System.ComponentModel.DataAnnotations;

namespace app_api.Contracts
{
    public class AuthContract
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
    }

    public class AuthRespone
    {
        public string Token { get; set; }
    }
}
