using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace app_api.Models
{
    public class User
    {
        public User()
        {
            CreatedOn = DateTime.Now;
        }

        [Required, Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Username { get; set; }
        public string? Password { get; set; }
        public string Firstname { get; set; }
        public string? Lastname { get; set; }
        public string PasswordHash { get; set; }
        public string ProfileImage { get; set; }
        public DateTimeOffset CreatedOn { get; set; }
        public DateTimeOffset LastModifiedOn { get; set; }
        public bool IsActive { get; set; }
        public ICollection<PasswordHistory> PasswordHistories
        {
            get; set;
        }
    }
}
