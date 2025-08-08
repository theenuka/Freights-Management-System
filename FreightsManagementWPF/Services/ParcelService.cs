using FreightsManagementWPF.Models;
using Microsoft.EntityFrameworkCore;

namespace FreightsManagementWPF.Services
{
    /// <summary>
    /// Service for managing parcels
    /// </summary>
    public class ParcelService
    {
        /// <summary>
        /// Gets all parcels
        /// </summary>
        /// <returns>List of parcels with user information</returns>
        public async Task<List<Parcel>> GetAllParcelsAsync()
        {
            using var context = new DatabaseContext();
            return await context.Parcels
                .Include(p => p.User)
                .OrderByDescending(p => p.CreatedDate)
                .ToListAsync();
        }

        /// <summary>
        /// Gets parcels for a specific user
        /// </summary>
        /// <param name="userId">User ID</param>
        /// <returns>List of parcels for the user</returns>
        public async Task<List<Parcel>> GetParcelsByUserIdAsync(int userId)
        {
            using var context = new DatabaseContext();
            return await context.Parcels
                .Include(p => p.User)
                .Where(p => p.UserId == userId)
                .OrderByDescending(p => p.CreatedDate)
                .ToListAsync();
        }

        /// <summary>
        /// Gets a parcel by ID
        /// </summary>
        /// <param name="id">Parcel ID</param>
        /// <returns>Parcel or null if not found</returns>
        public async Task<Parcel?> GetParcelByIdAsync(int id)
        {
            using var context = new DatabaseContext();
            return await context.Parcels
                .Include(p => p.User)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        /// <summary>
        /// Gets a parcel by tracking number
        /// </summary>
        /// <param name="trackingNumber">Tracking number</param>
        /// <returns>Parcel or null if not found</returns>
        public async Task<Parcel?> GetParcelByTrackingNumberAsync(string trackingNumber)
        {
            using var context = new DatabaseContext();
            return await context.Parcels
                .Include(p => p.User)
                .FirstOrDefaultAsync(p => p.TrackingNumber == trackingNumber);
        }

        /// <summary>
        /// Creates a new parcel
        /// </summary>
        /// <param name="parcel">Parcel to create</param>
        /// <returns>True if successful</returns>
        public async Task<bool> CreateParcelAsync(Parcel parcel)
        {
            try
            {
                using var context = new DatabaseContext();

                // Generate unique tracking number if not provided
                if (string.IsNullOrEmpty(parcel.TrackingNumber))
                {
                    parcel.TrackingNumber = await GenerateTrackingNumberAsync();
                }

                // Check if tracking number already exists
                var existingParcel = await context.Parcels
                    .AnyAsync(p => p.TrackingNumber == parcel.TrackingNumber);

                if (existingParcel)
                    return false;

                parcel.CreatedDate = DateTime.Now;
                parcel.Status = "Pending";

                context.Parcels.Add(parcel);
                await context.SaveChangesAsync();

                return true;
            }
            catch
            {
                return false;
            }
        }

        /// <summary>
        /// Updates an existing parcel
        /// </summary>
        /// <param name="parcel">Parcel to update</param>
        /// <returns>True if successful</returns>
        public async Task<bool> UpdateParcelAsync(Parcel parcel)
        {
            try
            {
                using var context = new DatabaseContext();

                // Check if tracking number already exists for other parcels
                var existingParcel = await context.Parcels
                    .AnyAsync(p => p.Id != parcel.Id && p.TrackingNumber == parcel.TrackingNumber);

                if (existingParcel)
                    return false;

                context.Parcels.Update(parcel);
                await context.SaveChangesAsync();

                return true;
            }
            catch
            {
                return false;
            }
        }

        /// <summary>
        /// Deletes a parcel
        /// </summary>
        /// <param name="id">Parcel ID</param>
        /// <returns>True if successful</returns>
        public async Task<bool> DeleteParcelAsync(int id)
        {
            try
            {
                using var context = new DatabaseContext();

                var parcel = await context.Parcels.FindAsync(id);
                if (parcel == null)
                    return false;

                context.Parcels.Remove(parcel);
                await context.SaveChangesAsync();

                return true;
            }
            catch
            {
                return false;
            }
        }

        /// <summary>
        /// Updates parcel status
        /// </summary>
        /// <param name="id">Parcel ID</param>
        /// <param name="status">New status</param>
        /// <returns>True if successful</returns>
        public async Task<bool> UpdateParcelStatusAsync(int id, string status)
        {
            try
            {
                using var context = new DatabaseContext();

                var parcel = await context.Parcels.FindAsync(id);
                if (parcel == null)
                    return false;

                parcel.Status = status;
                
                // Set delivery date if status is delivered
                if (status == "Delivered")
                {
                    parcel.DeliveryDate = DateTime.Now;
                }

                await context.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        /// <summary>
        /// Generates a unique tracking number
        /// </summary>
        /// <returns>Tracking number</returns>
        private async Task<string> GenerateTrackingNumberAsync()
        {
            using var context = new DatabaseContext();
            string trackingNumber;
            bool exists;

            do
            {
                trackingNumber = $"TN{DateTime.Now:yyyyMMdd}{Random.Shared.Next(1000, 9999)}";
                exists = await context.Parcels.AnyAsync(p => p.TrackingNumber == trackingNumber);
            }
            while (exists);

            return trackingNumber;
        }

        /// <summary>
        /// Gets parcel statistics
        /// </summary>
        /// <returns>Dictionary with status counts</returns>
        public async Task<Dictionary<string, int>> GetParcelStatisticsAsync()
        {
            using var context = new DatabaseContext();
            
            var stats = await context.Parcels
                .GroupBy(p => p.Status)
                .Select(g => new { Status = g.Key, Count = g.Count() })
                .ToListAsync();

            return stats.ToDictionary(s => s.Status, s => s.Count);
        }
    }
}