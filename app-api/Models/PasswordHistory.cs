using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace app_api.Models
{
    public class PasswordHistory
    {
        [Required, Key]
        public Guid Id { get; set; }
        [Required]
        [ForeignKey(nameof(User))]
        public Guid UserId { get; set; }
        public string PasswordHash { get; set; }
        public DateTime CreatedAt { get; set; }
        public User User { get; set; }
    }
}
