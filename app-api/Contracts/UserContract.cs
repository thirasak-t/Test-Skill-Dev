using System.ComponentModel.DataAnnotations;

namespace app_api.Contracts
{
    public class RequestRegister
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string Firstname { get; set; }
        public string? Lastname { get; set; }
        [Required]
        public string ProfileImage { get; set; }

    }

    public class RequestUpdateProfile
    {
        [Required]
        public Guid UserId { get; set; }
     
        [Required]
        public string Firstname { get; set; }
        public string? Lastname { get; set; }
        [Required]
        public string ProfileImage { get; set; }

    }

    public class RequestUpdatePassword
    {
       
        [Required]
        public string CurrentPassword { get; set; }
        [Required]
        public string NewPassword { get; set; }

    }

    public class ResponseUser
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public Guid UserId { get; set; }
        [Required]
        public string Firstname { get; set; }
        public string? Lastname { get; set; }
        [Required]
        public string ProfileImage { get; set; }

    }


}
