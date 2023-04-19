using app_api.Models;
using Microsoft.EntityFrameworkCore;

namespace app_api.Context
{
    public class DatabaseContext:DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {
            
        }

        public DbSet<User> Users { get; set; }
        public DbSet<PasswordHistory> PasswordHistories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PasswordHistory>()
                .HasOne(p => p.User)
                .WithMany(u => u.PasswordHistories)
                .HasForeignKey(p => p.UserId);
        }
    }
}
