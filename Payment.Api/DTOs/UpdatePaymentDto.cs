namespace Payments.Api.DTOs
{
    public class UpdatePaymentDto
    {
        public decimal Amount { get; set; }
        public string Currency { get; set; } = string.Empty;
    }
}
