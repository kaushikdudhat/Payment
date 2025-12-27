using System.ComponentModel.DataAnnotations;

namespace Payments.Api.Entities
{
    public class Payment
    {
        public int Id { get; set; }

        [Required]
        public Guid ClientRequestId { get; set; }

        [Required]
        public string Reference { get; set; } = string.Empty;

        public decimal Amount { get; set; }

        [Required]
        public string Currency { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; }
    }
}

