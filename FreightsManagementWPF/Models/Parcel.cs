using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FreightsManagementWPF.Models
{
    /// <summary>
    /// Parcel model representing parcels in the system
    /// </summary>
    public class Parcel
    {
        public int Id { get; set; }

        [Required]
        [StringLength(20)]
        public string TrackingNumber { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string SenderName { get; set; } = string.Empty;

        [Required]
        [StringLength(200)]
        public string SenderAddress { get; set; } = string.Empty;

        [StringLength(20)]
        public string SenderPhone { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        public string ReceiverName { get; set; } = string.Empty;

        [Required]
        [StringLength(200)]
        public string ReceiverAddress { get; set; } = string.Empty;

        [StringLength(20)]
        public string ReceiverPhone { get; set; } = string.Empty;

        [Range(0.1, 1000)]
        public decimal Weight { get; set; }

        [StringLength(50)]
        public string Dimensions { get; set; } = string.Empty;

        [StringLength(20)]
        public string Status { get; set; } = "Pending";

        public DateTime CreatedDate { get; set; } = DateTime.Now;

        public DateTime? DeliveryDate { get; set; }

        // Foreign key
        public int UserId { get; set; }

        // Navigation property
        [ForeignKey("UserId")]
        public virtual User User { get; set; } = null!;

        // Display properties
        public string StatusDisplay => Status switch
        {
            "Pending" => "📦 Pending",
            "InTransit" => "🚛 In Transit",
            "Delivered" => "✅ Delivered",
            "Cancelled" => "❌ Cancelled",
            _ => Status
        };
    }
}