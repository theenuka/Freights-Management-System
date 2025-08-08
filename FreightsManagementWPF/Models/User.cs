using System.ComponentModel.DataAnnotations;

namespace FreightsManagementWPF.Models
{
    /// <summary>
    /// User model representing users in the system
    /// </summary>
    public class User
    {
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Username { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        [StringLength(100)]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string FirstName { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string LastName { get; set; } = string.Empty;

        [StringLength(20)]
        public string Role { get; set; } = "User";

        public DateTime CreatedDate { get; set; } = DateTime.Now;

        public bool IsActive { get; set; } = true;

        // Navigation property
        public virtual ICollection<Parcel> Parcels { get; set; } = new List<Parcel>();

        // Display properties
        public string FullName => $"{FirstName} {LastName}";
    }
}