using Microsoft.EntityFrameworkCore;

namespace FreightsManagementWPF.Models
{
    /// <summary>
    /// Database context for the Freights Management System
    /// </summary>
    public class DatabaseContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Parcel> Parcels { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=freights.db");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure User entity
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => e.Username).IsUnique();
                entity.HasIndex(e => e.Email).IsUnique();
                entity.Property(e => e.CreatedDate).HasDefaultValueSql("CURRENT_TIMESTAMP");
            });

            // Configure Parcel entity
            modelBuilder.Entity<Parcel>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => e.TrackingNumber).IsUnique();
                entity.Property(e => e.Weight).HasColumnType("decimal(18,2)");
                entity.Property(e => e.CreatedDate).HasDefaultValueSql("CURRENT_TIMESTAMP");

                // Configure relationship
                entity.HasOne(p => p.User)
                      .WithMany(u => u.Parcels)
                      .HasForeignKey(p => p.UserId)
                      .OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}