using app_api.Services.Interface;
using app_api.Context;
using app_api.Models;

namespace app_api.Services
{
    public class AuthService : IAuthService
    {
        private readonly DatabaseContext _dbContext;
        private readonly ILogger<AuthService> _logger;
        public AuthService(DatabaseContext dbContext,
             ILogger<AuthService> logger)
        {
            _dbContext = dbContext;
            _logger = logger;
        }

        public async Task Logout(DateTime now)
        {
            Console.WriteLine("Logout");
        }

    }

    
}
