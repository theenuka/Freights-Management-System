using FreightsManagementWPF.Models;
using Microsoft.EntityFrameworkCore;

namespace FreightsManagementWPF.Services
{
    /// <summary>
    /// Service for managing users
    /// </summary>
    public class UserService
    {
        /// <summary>
        /// Gets all users
        /// </summary>
        /// <returns>List of users</returns>
        public async Task<List<User>> GetAllUsersAsync()
        {
            using var context = new DatabaseContext();
            return await context.Users
                .OrderBy(u => u.Username)
                .ToListAsync();
        }

        /// <summary>
        /// Gets a user by ID
        /// </summary>
        /// <param name="id">User ID</param>
        /// <returns>User or null if not found</returns>
        public async Task<User?> GetUserByIdAsync(int id)
        {
            using var context = new DatabaseContext();
            return await context.Users.FindAsync(id);
        }

        /// <summary>
        /// Creates a new user
        /// </summary>
        /// <param name="user">User to create</param>
        /// <param name="password">Plain text password</param>
        /// <returns>True if successful</returns>
        public async Task<bool> CreateUserAsync(User user, string password)
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
        /// Updates an existing user
        /// </summary>
        /// <param name="user">User to update</param>
        /// <returns>True if successful</returns>
        public async Task<bool> UpdateUserAsync(User user)
        {
            try
            {
                using var context = new DatabaseContext();

                // Check if username or email already exists for other users
                var existingUser = await context.Users
                    .AnyAsync(u => u.Id != user.Id && (u.Username == user.Username || u.Email == user.Email));

                if (existingUser)
                    return false;

                context.Users.Update(user);
                await context.SaveChangesAsync();

                return true;
            }
            catch
            {
                return false;
            }
        }

        /// <summary>
        /// Deletes a user
        /// </summary>
        /// <param name="id">User ID</param>
        /// <returns>True if successful</returns>
        public async Task<bool> DeleteUserAsync(int id)
        {
            try
            {
                using var context = new DatabaseContext();

                var user = await context.Users.FindAsync(id);
                if (user == null)
                    return false;

                context.Users.Remove(user);
                await context.SaveChangesAsync();

                return true;
            }
            catch
            {
                return false;
            }
        }

        /// <summary>
        /// Updates user password
        /// </summary>
        /// <param name="userId">User ID</param>
        /// <param name="newPassword">New password</param>
        /// <returns>True if successful</returns>
        public async Task<bool> UpdatePasswordAsync(int userId, string newPassword)
        {
            try
            {
                using var context = new DatabaseContext();

                var user = await context.Users.FindAsync(userId);
                if (user == null)
                    return false;

                user.Password = BCrypt.Net.BCrypt.HashPassword(newPassword);
                await context.SaveChangesAsync();

                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}