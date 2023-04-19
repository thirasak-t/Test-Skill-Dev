using app_api.Models;
using app_api.Contracts;

namespace app_api.Services.Interface
{
    public interface IUserService
    {
        public Task<ResponseUser> CreateUser(RequestRegister user);
        public Task<ResponseUser> UpdateUser(RequestUpdateProfile user);
        public Task UpdatePassword(string newPassword, Guid userId);
        public Task<string> VerifyNewPassword(string hashedNewPassword, Guid userId);
        public Task<ResponseUser> GetUser(Guid userId);
        public Task<ResponseUser> GetUserByUsername(string username);
        public Task<bool> VerifyPassword(string password, string username);
        public Task<bool> IsUsernameAvailable(string username);


    }
}
