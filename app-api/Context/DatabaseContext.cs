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
        
    }
}
