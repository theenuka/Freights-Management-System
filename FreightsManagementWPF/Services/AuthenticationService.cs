using FreightsManagementWPF.Models;
using Microsoft.EntityFrameworkCore;

namespace FreightsManagementWPF.Services
{
    /// <summary>
    /// Service for handling user authentication
    /// </summary>
    public class AuthenticationService
    {
        /// <summary>
        /// Authenticates a user with username and password
        /// </summary>
        /// <param name="username">Username</param>
        /// <param name="password">Password</param>
        /// <returns>User if authentication successful, null otherwise</returns>
        public async Task<User?> AuthenticateAsync(string username, string password)
        {
            using var context = new DatabaseContext();
            
            var user = await context.Users
                .FirstOrDefaultAsync(u => u.Username == username && u.IsActive);

            if (user != null && BCrypt.Net.BCrypt.Verify(password, user.Password))
            {
                return user;
            }

            return null;
        }

        /// <summary>
        /// Registers a new user
        /// </summary>
        /// <param name="user">User to register</param>
        /// <param name="password">Plain text password</param>
        /// <returns>True if registration successful</returns>
        public async Task<bool> RegisterAsync(User user, string password)
        {
            try
            {
                using var context = new DatabaseContext();

                // Check if username or email already exists
                var existingUser = await context.Users
                    .AnyAsync(u => u.Username == user.Username || u.Email == user.Email);

                if (existingUser)
                    return false;

                // Hash password
                user.Password = BCrypt.Net.BCrypt.HashPassword(password);
                user.CreatedDate = DateTime.Now;
                user.IsActive = true;

                context.Users.Add(user);
                await context.SaveChangesAsync();

                return true;
            }
            catch
            {
                return false;
            }
        }

        /// <summary>
        /// Validates if username is available
        /// </summary>
        /// <param name="username">Username to check</param>
        /// <returns>True if username is available</returns>
        public async Task<bool> IsUsernameAvailableAsync(string username)
        {
            using var context = new DatabaseContext();
            return !await context.Users.AnyAsync(u => u.Username == username);
        }

        /// <summary>
        /// Validates if email is available
        /// </summary>
        /// <param name="email">Email to check</param>
        /// <returns>True if email is available</returns>
        public async Task<bool> IsEmailAvailableAsync(string email)
        {
            using var context = new DatabaseContext();
            return !await context.Users.AnyAsync(u => u.Email == email);
        }
    }
}