using Microsoft.EntityFrameworkCore;
using System.Windows;
using FreightsManagementWPF.Models;

namespace FreightsManagementWPF
{
    /// <summary>
    /// Console application entry point for demonstration
    /// In actual WPF deployment, this would be App.xaml.cs
    /// </summary>
    public class Program
    {
        public static async Task Main(string[] args)
        {
            Console.WriteLine("=== Freights Management System ===");
            Console.WriteLine("This is a console demonstration of the WPF application structure.");
            Console.WriteLine("In a Windows environment, this would run as a WPF application.");
            
            // Initialize database
            using (var context = new DatabaseContext())
            {
                await context.Database.EnsureCreatedAsync();
                await SeedDatabase(context);
            }

            Console.WriteLine("\nDatabase initialized successfully!");
            Console.WriteLine("Sample admin user created: admin / admin123");
            
            // Demonstrate services
            await DemonstrateServices();
        }

        private static async Task SeedDatabase(DatabaseContext context)
        {
            // Check if admin user exists
            if (!await context.Users.AnyAsync(u => u.Username == "admin"))
            {
                var adminUser = new User
                {
                    Username = "admin",
                    Email = "admin@freights.com",
                    Password = BCrypt.Net.BCrypt.HashPassword("admin123"),
                    FirstName = "System",
                    LastName = "Administrator",
                    Role = "Admin",
                    CreatedDate = DateTime.Now,
                    IsActive = true
                };

                context.Users.Add(adminUser);
                await context.SaveChangesAsync();
            }
        }

        private static async Task DemonstrateServices()
        {
            var authService = new Services.AuthenticationService();
            var userService = new Services.UserService();
            var parcelService = new Services.ParcelService();

            Console.WriteLine("\n=== Testing Authentication Service ===");
            var user = await authService.AuthenticateAsync("admin", "admin123");
            Console.WriteLine($"Authentication test: {(user != null ? "SUCCESS" : "FAILED")}");
            
            if (user != null)
            {
                Console.WriteLine($"Logged in as: {user.FullName} ({user.Role})");
                
                Console.WriteLine("\n=== Testing Parcel Service ===");
                // Create a test parcel
                var testParcel = new Models.Parcel
                {
                    SenderName = "John Doe",
                    SenderAddress = "123 Main St, City",
                    SenderPhone = "555-0123",
                    ReceiverName = "Jane Smith",
                    ReceiverAddress = "456 Oak Ave, Town",
                    ReceiverPhone = "555-0456",
                    Weight = 2.5m,
                    Dimensions = "10x8x6 inches",
                    UserId = user.Id
                };

                var created = await parcelService.CreateParcelAsync(testParcel);
                Console.WriteLine($"Test parcel created: {(created ? "SUCCESS" : "FAILED")}");

                if (created)
                {
                    var parcels = await parcelService.GetAllParcelsAsync();
                    Console.WriteLine($"Total parcels in system: {parcels.Count}");
                    
                    foreach (var parcel in parcels)
                    {
                        Console.WriteLine($"- {parcel.TrackingNumber}: {parcel.SenderName} → {parcel.ReceiverName} ({parcel.Status})");
                    }
                }
            }

            Console.WriteLine("\n=== Application Structure Complete ===");
            Console.WriteLine("The following files would be created for the full WPF application:");
            Console.WriteLine("- Views/LoginWindow.xaml & .cs");
            Console.WriteLine("- Views/RegistrationWindow.xaml & .cs");
            Console.WriteLine("- Views/MainWindow.xaml & .cs");
            Console.WriteLine("- Views/UsersView.xaml & .cs");
            Console.WriteLine("- Views/ParcelsView.xaml & .cs");
            Console.WriteLine("- ViewModels for each view");
            Console.WriteLine("- Material Design styling");
        }
    }
}