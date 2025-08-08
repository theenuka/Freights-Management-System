using FreightsManagementWPF.Models;
using FreightsManagementWPF.Services;

namespace FreightsManagementWPF.Helpers
{
    /// <summary>
    /// Utility class to seed the database with sample data for testing
    /// </summary>
    public static class DatabaseSeeder
    {
        public static async Task SeedSampleDataAsync()
        {
            var userService = new UserService();
            var parcelService = new ParcelService();

            Console.WriteLine("Seeding sample data...");

            // Create sample users
            var sampleUsers = new List<(User user, string password)>
            {
                (new User
                {
                    Username = "john_doe",
                    Email = "john.doe@email.com",
                    FirstName = "John",
                    LastName = "Doe",
                    Role = "User",
                    IsActive = true
                }, "password123"),

                (new User
                {
                    Username = "jane_smith",
                    Email = "jane.smith@email.com",
                    FirstName = "Jane",
                    LastName = "Smith",
                    Role = "Manager",
                    IsActive = true
                }, "password123"),

                (new User
                {
                    Username = "mike_wilson",
                    Email = "mike.wilson@email.com",
                    FirstName = "Mike",
                    LastName = "Wilson",
                    Role = "User",
                    IsActive = true
                }, "password123")
            };

            // Create users
            var createdUsers = new List<User>();
            foreach (var (user, password) in sampleUsers)
            {
                var created = await userService.CreateUserAsync(user, password);
                if (created)
                {
                    var createdUser = (await userService.GetAllUsersAsync()).FirstOrDefault(u => u.Username == user.Username);
                    if (createdUser != null)
                    {
                        createdUsers.Add(createdUser);
                        Console.WriteLine($"Created user: {user.Username}");
                    }
                }
                else
                {
                    Console.WriteLine($"User {user.Username} already exists or failed to create");
                }
            }

            // Create sample parcels
            var sampleParcels = new List<Parcel>
            {
                new Parcel
                {
                    SenderName = "Alice Johnson",
                    SenderAddress = "123 Main Street, New York, NY 10001",
                    SenderPhone = "555-0101",
                    ReceiverName = "Bob Brown",
                    ReceiverAddress = "456 Oak Avenue, Los Angeles, CA 90210",
                    ReceiverPhone = "555-0202",
                    Weight = 2.5m,
                    Dimensions = "12x8x6 inches",
                    Status = "Pending",
                    UserId = createdUsers.Count > 0 ? createdUsers[0].Id : 1
                },

                new Parcel
                {
                    SenderName = "Carol Davis",
                    SenderAddress = "789 Pine Road, Chicago, IL 60601",
                    SenderPhone = "555-0303",
                    ReceiverName = "David Miller",
                    ReceiverAddress = "321 Elm Street, Houston, TX 77001",
                    ReceiverPhone = "555-0404",
                    Weight = 5.0m,
                    Dimensions = "18x12x10 inches",
                    Status = "InTransit",
                    UserId = createdUsers.Count > 1 ? createdUsers[1].Id : 1
                },

                new Parcel
                {
                    SenderName = "Eva Garcia",
                    SenderAddress = "654 Maple Drive, Phoenix, AZ 85001",
                    SenderPhone = "555-0505",
                    ReceiverName = "Frank Taylor",
                    ReceiverAddress = "987 Cedar Lane, Philadelphia, PA 19101",
                    ReceiverPhone = "555-0606",
                    Weight = 1.2m,
                    Dimensions = "8x6x4 inches",
                    Status = "Delivered",
                    UserId = createdUsers.Count > 2 ? createdUsers[2].Id : 1
                },

                new Parcel
                {
                    SenderName = "Grace Lee",
                    SenderAddress = "147 Birch Boulevard, San Antonio, TX 78201",
                    SenderPhone = "555-0707",
                    ReceiverName = "Henry Adams",
                    ReceiverAddress = "258 Willow Way, San Diego, CA 92101",
                    ReceiverPhone = "555-0808",
                    Weight = 3.8m,
                    Dimensions = "15x10x8 inches",
                    Status = "Pending",
                    UserId = createdUsers.Count > 0 ? createdUsers[0].Id : 1
                },

                new Parcel
                {
                    SenderName = "Ivan Martinez",
                    SenderAddress = "369 Spruce Street, Dallas, TX 75201",
                    SenderPhone = "555-0909",
                    ReceiverName = "Julia White",
                    ReceiverAddress = "741 Ash Avenue, San Jose, CA 95101",
                    ReceiverPhone = "555-1010",
                    Weight = 7.5m,
                    Dimensions = "24x18x12 inches",
                    Status = "InTransit",
                    UserId = createdUsers.Count > 1 ? createdUsers[1].Id : 1
                }
            };

            // Create parcels
            foreach (var parcel in sampleParcels)
            {
                var created = await parcelService.CreateParcelAsync(parcel);
                if (created)
                {
                    Console.WriteLine($"Created parcel: {parcel.TrackingNumber} ({parcel.SenderName} → {parcel.ReceiverName})");
                }
                else
                {
                    Console.WriteLine($"Failed to create parcel for {parcel.SenderName}");
                }
            }

            Console.WriteLine("Sample data seeding completed!");
        }

        public static async Task DisplayDatabaseStatsAsync()
        {
            var userService = new UserService();
            var parcelService = new ParcelService();

            var users = await userService.GetAllUsersAsync();
            var parcels = await parcelService.GetAllParcelsAsync();
            var stats = await parcelService.GetParcelStatisticsAsync();

            Console.WriteLine("\n=== Database Statistics ===");
            Console.WriteLine($"Total Users: {users.Count}");
            Console.WriteLine($"Total Parcels: {parcels.Count}");
            
            foreach (var stat in stats)
            {
                Console.WriteLine($"Parcels {stat.Key}: {stat.Value}");
            }

            Console.WriteLine("\n=== Recent Parcels ===");
            foreach (var parcel in parcels.Take(5))
            {
                Console.WriteLine($"📦 {parcel.TrackingNumber}: {parcel.SenderName} → {parcel.ReceiverName} ({parcel.Status})");
            }
        }
    }
}