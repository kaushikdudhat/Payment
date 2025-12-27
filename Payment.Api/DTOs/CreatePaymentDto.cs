namespace Payments.Api.DTOs
{
    public class CreatePaymentDto
    {
        public Guid ClientRequestId { get; set; }
        public decimal Amount { get; set; }
        public string Currency { get; set; } = string.Empty;
    }
}
