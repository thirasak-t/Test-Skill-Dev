using System;
using System.Security.Cryptography;
using System.Text;

using app_api.Services.Interface;
using app_api.Context;
using app_api.Models;
using app_api.Contracts;
using Microsoft.EntityFrameworkCore;

namespace app_api.Services
{
    public class UserService: IUserService
    {
        private readonly DatabaseContext _dbContext;
        public UserService(DatabaseContext dbContext)
        {
            _dbContext = dbContext;       
        }
        public async Task<bool> IsUsernameAvailable(string username)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Username == username);
            return user == default;
        }
        public async Task<ResponseUser> GetUser(Guid userId)
        {
            var user =  await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == userId);
            if (user == null)
            {
                // User not found
                return null; 
            }
            return new ResponseUser
            {
                Firstname = user.Firstname,
                Lastname = user.Lastname,
                ProfileImage = user.ProfileImage,
                UserId = user.Id,
                Username = user.Username,

            };
        }

        public async Task<ResponseUser> GetUserByUsername(string username)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Username == username);
            if (user == null)
            {
                // User not found
                return null;
            }
            return new ResponseUser
            {
                Firstname = user.Firstname,
                Lastname = user.Lastname,
                ProfileImage = user.ProfileImage,
                UserId = user.Id,
                Username = user.Username,

            };
        }
        public async Task<ResponseUser> CreateUser(RequestRegister user)
        {
            // เข้ารหัสรหัสผ่าน
            string hashedPassword = await HashPassword(user.Password);

            // สร้าง User จาก Model
            var newUser = new User
            {
                Username = user.Username,
                Firstname = user.Firstname,
                Lastname = user.Lastname,
                ProfileImage = user.ProfileImage,
                PasswordHash = hashedPassword,
                CreatedOn = DateTime.Now,
                LastModifiedOn = DateTime.Now,
                IsActive = true
            };

            var passwordHistory = new PasswordHistory
            {
                UserId = newUser.Id,
                PasswordHash = hashedPassword,
                CreatedAt = DateTime.Now
            };

            try
            {
                _dbContext.Users.Add(newUser);
                _dbContext.PasswordHistories.Add(passwordHistory);
                await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            

            return new ResponseUser
            {
                UserId = newUser.Id,
                Username = newUser.Username,
                Firstname = newUser.Firstname,
                Lastname = newUser.Lastname,
                ProfileImage = newUser.ProfileImage,
               
            };
        }
        public async Task<ResponseUser> UpdateUser(RequestUpdateProfile request)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == request.UserId);
            if (user == default)
            {
                return null;
            }
            user.Firstname = request.Firstname;
            user.Lastname = request.Lastname;
            user.ProfileImage = request.ProfileImage;
            user.LastModifiedOn = DateTime.Now;
            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return new ResponseUser
            {
                Firstname = user.Firstname,
                Lastname = user.Lastname,
                ProfileImage = user.ProfileImage,
                UserId = user.Id,
                Username = user.Username,

            };
        }

        public async Task<string> VerifyNewPassword(string newPassword, Guid userId)
        {
            
            var passwords = await _dbContext.PasswordHistories.Where(ph => ph.UserId == userId)
                .OrderByDescending(ph => ph.CreatedAt)
                .Take(5)
                .ToListAsync();
            string hashedNewPassword = await HashPassword(newPassword);

            foreach (var password in passwords)
            {
                
                if (hashedNewPassword.Equals(password.PasswordHash))
                {
                    return null;
                }
            }
            return hashedNewPassword;
        }
        public async Task UpdatePassword(string hashedNewPassword, Guid userId)
        {

            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == userId);
            user.PasswordHash = hashedNewPassword;
            user.LastModifiedOn = DateTime.Now;


            var passwordHistory = new PasswordHistory
            {
                UserId = userId,
                PasswordHash = hashedNewPassword,
                CreatedAt = DateTime.Now
            };
            try
            {
                await _dbContext.PasswordHistories.AddAsync(passwordHistory);
                await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        // Method to hash a password using SHA-256 hash algorithm
        private async Task<string> HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            var hash = BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
            
            return hash;

        }

        // Method to verify a password with a hashed password
        public async Task<bool> VerifyPassword(string password, string username)
        {

            var hash = await _dbContext.Users.Where(u => u.Username == username).Select(x => x.PasswordHash).FirstOrDefaultAsync();
           
            var passwordHash = await HashPassword(password);

            return hash.Equals(passwordHash);
        }
    }
}
